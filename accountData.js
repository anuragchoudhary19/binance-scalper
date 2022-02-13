const Binance = require('node-binance-api');
const { bookProfit } = require('./order');

var binance = new Binance().options({
  APIKEY: process.env.API_KEY,
  APISECRET: process.env.SECRET_KEY,
  useServerTime: true,
  recvWindow: 60000,
});
exports.getUnrealizedProfitCoins = async () => {
  try {
    let account = await binance.futuresAccount();
    if (account) {
      let positions = account.positions;
      let coins = positions.filter((coin) => coin.unrealizedProfit < 0 || coin.unrealizedProfit > 0);
      if (coins.length === 0) return;
      for (let i = 0; i < coins.length; i++) {
        // console.log(coins);
        let percentageProfit = (coins[0].unrealizedProfit / coins[0].isolatedWallet) * 100;
        // console.log(Math.floor(percentageProfit));
        if (percentageProfit >= 0.01) {
          bookProfit(coins[0]);
        }
        if (percentageProfit <= -0.01) {
          bookProfit(coins[0]);
        }
      }
    }
  } catch (e) {
    console.log(e);
  }
};

exports.getFuturesBalances = async () => {
  console.info(await binance.futuresBalance());
};
