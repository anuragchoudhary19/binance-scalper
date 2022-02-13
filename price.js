// const Binance = require('node-binance-api');
// // const { TextToSpeech } = require('text-to-speech-js');
// const binance = new Binance().options({
//   APIKEY: process.env.API_KEY,
//   APISECRET: process.env.SECRET_KEY,
// });

// exports.getFuturesPrices = async (req, res) => {
//   // console.log(req.body);
//   const price = await binance.futuresMarkPriceStream('MANAUSDT');
//   const account = console.info(await binance.futuresAccount());
//   console.log(account);
//   // TextToSpeech.talk(price.markPrice.toString());
//   // console.info(await binance.futuresPrices());
//   // console.info(await binance.futuresQuote('VETUSDT'));
//   // console.info(await binance.futuresBookTickerStream('VETUSDT'));
//   binance.websockets.chart('MANAUSDT', '1m', (symbol, interval, chart) => {
//     let tick = binance.last(chart);
//     const last = chart[tick].close;
//     // console.info(chart);
//     // Optionally convert 'chart' object to array:
//     // let ohlc = binance.ohlc(chart);
//     // console.info(symbol, ohlc);
//     // console.info(symbol + ' last price: ' + last);
//   });
// };
