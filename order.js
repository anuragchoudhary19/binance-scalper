const Binance = require('node-binance-api');
var binance = new Binance().options({
  APIKEY: process.env.API_KEY,
  APISECRET: process.env.SECRET_KEY,
  useServerTime: true,
  recvWindow: 60000,
});

exports.bookProfit = async (coin) => {
  const { symbol, positionSide, positionAmt } = coin;
  // const coinPrice = await binance.futuresMarkPrice();
  if (positionSide === 'LONG') {
    console.log(await binance.futuresMarketSell(symbol, parseInt(positionAmt), { positionSide: 'LONG' }));
  }
  if (positionSide === 'SHORT') {
    console.log(await binance.futuresMarketBuy(symbol, parseInt(positionAmt), { positionSide: 'SHORT' }));
  }
};

const closeShortPosition = async (symbol, amount) => {
  console.log(await binance.futuresMarketBuy(symbol, amount, { reduceOnly: true }));
};
const closeLongPosition = async (symbol, amount) => {
  console.log(await binance.futuresMarketSell(symbol, amount, { reduceOnly: true }));
};
const openShortPosition = async (res, symbol, leverage) => {
  let account = await binance.futuresAccount();
  let coinPrice = await binance.futuresMarkPrice(symbol);
  let amount = Math.ceil((account.availableBalance / coinPrice.markPrice) * 0.9 * parseInt(leverage));
  if (amount === 0) return res.send('Balance too low');
  console.log(await binance.futuresMarketSell(symbol, amount));
};
const openLongPosition = async (res, symbol, leverage) => {
  let account = await binance.futuresAccount();
  let coinPrice = await binance.futuresMarkPrice(symbol);
  let amount = Math.ceil(parseInt(account.availableBalance / coinPrice.markPrice) * 0.9 * parseInt(leverage));
  if (amount === 0) return res.send('Balance too low');
  console.log(await binance.futuresMarketBuy(symbol, amount));
};

exports.placeLongFuturesOrder = async (req, res, symbol) => {
  try {
    let account = await binance.futuresAccount();
    let position = account.positions.filter((coin) => coin.symbol === `${symbol}USDT`);
    if (parseInt(position[0].positionAmt) < 0) {
      closeShortPosition(position[0].symbol, Math.abs(parseInt(position[0].positionAmt)));
      openLongPosition(res, position[0].symbol, position[0].leverage);
      return res.send('Short closed and Long opened');
    }
    if (parseInt(position[0].positionAmt) > 0) {
      return res.send('Long already exists');
    }
    if (account.positions.filter((coin) => parseInt(coin.positionAmt) !== 0).length > 0) {
      return res.send('Open position already exists');
    }
    await openLongPosition(res, account.availableBalance, position[0].symbol, position[0].leverage);
    return res.send('Long order placed');
  } catch (e) {
    console.log(e);
    res.send('err');
  }
};
exports.placeShortFuturesOrder = async (req, res, symbol) => {
  try {
    let account = await binance.futuresAccount();
    let position = account.positions.filter((coin) => coin.symbol === `${symbol}USDT`);
    if (parseInt(position[0].positionAmt) > 0) {
      await closeLongPosition(position[0].symbol, Math.abs(parseInt(position[0].positionAmt)));
      await openShortPosition(res, position[0].symbol, position[0].leverage);
      return res.send('Short closed and Long opened');
    }
    if (parseInt(position[0].positionAmt) < 0) {
      return res.send('Short already exists');
    }
    if (account.positions.filter((coin) => parseInt(coin.positionAmt) !== 0).length > 0) {
      return res.send('Open position already exists');
    }
    await openShortPosition(res, `${symbol}USDT`, position[0].leverage);
    return res.send('Long order placed');
  } catch (e) {
    console.log(e);
    res.send('err');
  }
};

exports.adjustLeverage = async (req, res, leverage) => {
  let account = await binance.futuresAccount();
  let positions = account.positions;
  let allCoins = [];
  for (let i = 0; i < positions.length; i++) {
    if (positions[i].leverage !== leverage) {
      allCoins.push(binance.futuresLeverage(positions[i].symbol, leverage));
    }
  }
  await Promise.all(allCoins);
  return res.send('ok');
};
exports.adjustMarginMode = async (req, res, Mode) => {
  let account = await binance.futuresAccount();
  let positions = account.positions;
  let allCoins = [];
  for (let i = 0; i < positions.length; i++) {
    if (Mode === 'isolated' && !positions[i].isolated) {
      allCoins.push(binance.futuresMarginType(positions[i].symbol, 'ISOLATED'));
    }
    if (Mode === 'cross' && positions[i].isolated) {
      allCoins.push(binance.futuresMarginType(positions[i].symbol, 'CROSSED'));
    }
  }
  await Promise.all(allCoins);
  return res.send('ok');
};
