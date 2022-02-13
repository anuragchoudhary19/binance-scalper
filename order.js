const Binance = require('node-binance-api');
var binance = new Binance().options({
  APIKEY: process.env.API_KEY,
  APISECRET: process.env.SECRET_KEY,
  hedgeMode: true,
  useServerTime: true,
  recvWindow: 60000,
});

exports.bookProfit = async (coin) => {
  // console.log(coin);
  const { symbol, positionSide, positionAmt } = coin;
  // const coinPrice = await binance.futuresMarkPrice();
  if (positionSide === 'LONG') {
    console.log(await binance.futuresMarketSell(symbol, parseInt(positionAmt), { positionSide: 'LONG' }));
  }
  if (positionSide === 'SHORT') {
    console.log(await binance.futuresMarketBuy(symbol, parseInt(positionAmt), { positionSide: 'SHORT' }));
  }
};

exports.placeLongFuturesOrder = async (req, res, symbol) => {
  try {
    let account = await binance.futuresAccount();
    if (account) {
      let positions = account.positions;
      let coin = positions.filter((coin) => coin.symbol === `${symbol}USDT` && coin.positionSide === 'LONG');
      let tradeAlreadyExist = coin.positionAmt > 0 ? true : false;
      if (tradeAlreadyExist) return res.send('ok');
      let availableBalance = account.availableBalance;
      const coinPrice = await binance.futuresMarkPrice(`${symbol}USDT`);
      let quantity = Math.floor((availableBalance / coinPrice.markPrice) * 0.9 * 5);
      console.log(quantity);
      if (quantity === 0) return res.send('ok');
      console.info(await binance.futuresMarketBuy(`${symbol}USDT`, quantity, { positionSide: 'LONG' }));
      return res.send('ok');
    }
  } catch (e) {
    console.log(e);
    res.send('err');
  }
};
exports.placeShortFuturesOrder = async (req, res, symbol) => {
  try {
    let account = await binance.futuresAccount();
    if (account) {
      let positions = account.positions;
      let coin = positions.filter((coin) => coin.symbol === `${symbol}USDT` && coin.positionSide === 'SHORT');
      let tradeAlreadyExist = coin.positionAmt > 0 ? true : false;
      if (tradeAlreadyExist) return res.send('ok');
      let availableBalance = account.availableBalance;
      const coinPrice = await binance.futuresMarkPrice(`${symbol}USDT`);
      let quantity = Math.floor((availableBalance / coinPrice.markPrice) * 0.9 * 5);
      console.log(quantity);
      if (quantity === 0) return res.send('ok');
      console.info(await binance.futuresMarketSell(`${symbol}USDT`, quantity, { positionSide: 'SHORT' }));
      return res.send('ok');
    }
  } catch (e) {
    console.log(e);
    res.send('err');
  }
};
