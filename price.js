const Binance = require('node-binance-api');
const binance = new Binance().options({
  APIKEY: process.env.API_KEY,
  APISECRET: process.env.SECRET_KEY,
});

exports.getFuturesPrices = async (req, res) => {
  try {
    const futuresPrices = await binance.futuresDaily();
    return res.json({ price: futuresPrices });
  } catch (error) {
    return res.json('error');
  }
};
exports.getFuturesPriceOfCoin = async (req, res) => {
  try {
    let coin = req.params.coin;
    const price = await binance.futuresMarkPrice(`${coin}USDT`);
    return res.json({ price });
  } catch (error) {
    return res.json('error');
  }
};
