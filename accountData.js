const Binance = require('node-binance-api');
const { bookProfit } = require('./order');

var binance = new Binance().options({
  APIKEY: process.env.API_KEY,
  APISECRET: process.env.SECRET_KEY,
  useServerTime: true,
  recvWindow: 60000,
});
exports.futuresAccount = async (req, res) => {
  try {
    let positions = await binance.futuresAccount();
    console.log(await binance.futuresPositionRisk());
    return res.json({ positions });
  } catch (e) {
    console.log(e);
  }
};
exports.getUnrealizedProfitCoins = async () => {
  try {
    let account = await binance.futuresAccount();
    let positions = account.positions.filter((coin) => parseInt(coin.positionAmt) !== 0);
    console.log(positions);
    // return;
    if (positions.length > 0) {
      let coins = positions.filter(
        (coin) =>
          parseInt((coin.unrealizedProfit / coin.initialMargin) * 100) >= 12 ||
          parseInt((coin.unrealizedProfit / coin.initialMargin) * 100) <= -4
      );
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
