const Binance = require('node-binance-api');
const { bookProfit } = require('./order');

var binance = new Binance().options({
  APIKEY: process.env.API_KEY,
  APISECRET: process.env.SECRET_KEY,
  hedgeMode: true,
  useServerTime: true,
  recvWindow: 60000,
});
exports.getUnrealizedProfitCoins = async () => {
  try {
    let positions = await binance.futuresPositionRisk();
    if (positions.length) {
      // let coin = positions.filter((coin) => coin.symbol === 'GALAUSDT');
      // console.log(coin);
      let coins = positions.filter((coin) => coin.unRealizedProfit < 0 || coin.unRealizedProfit > 0);
      if (coins.length === 0) return;
      for (let i = 0; i < coins.length; i++) {
        // console.log(coins);
        let percentageProfit = (coins[0].unrealizedProfit / coins[0].isolatedWallet) * 100;
        // console.log(Math.floor(percentageProfit));
        if (percentageProfit >= 5) {
          bookProfit(coins[0]);
        }
        // if (percentageProfit <= -2) {
        //   bookProfit(coins[0]);
        // }
      }
    }
  } catch (e) {
    console.log(e);
  }
};

exports.getFuturesBalances = async () => {
  console.info(await binance.futuresBalance());
};
