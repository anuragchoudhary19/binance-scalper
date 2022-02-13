const Binance = require('node-binance-api');
var binance = new Binance().options({
  APIKEY: process.env.API_KEY,
  APISECRET: process.env.SECRET_KEY,
  useServerTime: true,
  recvWindow: 60000,
});

exports.bookProfit = async (coin) => {
  const { symbol, positionSide, positionAmt } = coin;
  if (positionSide === 'LONG') {
    // console.log('sold');
    // console.log(await binance.futuresMarketSell(symbol, positionAmt, { reduceOnly: true }));
  }
  if (positionSide === 'SHORT') {
    // console.log('brought');
    // console.log(await binance.futuresMarketBuy(symbol, positionAmt, { reduceOnly: true }));
  }
};

exports.futuresMarketBuy = async (symbol, quantity) => {
  console.info(await binance.futuresMarketBuy(`${symbol}USDT`, quantity));
};
exports.futuresMarketSell = async (symbol, quantity) => {
  console.info(await binance.futuresMarketSell(`${symbol}USDT`, quantity));
};
exports.placeLongFuturesOrder = async (req, res, symbol) => {
  try {
    let account = await binance.futuresAccount();
    if (account) {
      let availableBalance = account.availableBalance;
      const coinPrice = await binance.futuresMarkPrice(`${symbol}USDT`);
      let quantity = Math.floor((availableBalance / coinPrice.markPrice) * 0.5);
      console.log(quantity);
      if (quantity === 0) return res.send('ok');
      // futuresMarketBuy(symbol, quantity);
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
      let availableBalance = account.availableBalance;
      const coinPrice = await binance.futuresMarkPrice(`${symbol}USDT`);
      let quantity = Math.floor((availableBalance / coinPrice.markPrice) * 0.5);
      console.log(quantity);
      if (quantity === 0) return res.send('ok');
      // futuresMarketSell(symbol, quantity);
      return res.send('ok');
    }
  } catch (e) {
    console.log(e);
    res.send('err');
  }
};
