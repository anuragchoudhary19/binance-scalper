require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { setIntervalAsync } = require('set-interval-async/dynamic');
const { clearIntervalAsync } = require('set-interval-async');
const { getUnrealizedProfitCoins, futuresAccount } = require('./accountData');
const { placeShortFuturesOrder, placeLongFuturesOrder, adjustMarginMode, adjustLeverage } = require('./order');
const { getFuturesPrices, getFuturesPriceOfCoin } = require('./price');
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// setIntervalAsync(async () => {
//   await getUnrealizedProfitCoins();
// }, 250);
app.get('/api/accountData', futuresAccount);
app.get('/api/futuresPrices', getFuturesPrices);
app.get('/api/futuresPrice/:coin', getFuturesPriceOfCoin);
app.post('/api/futuresPositions', (req, res) => {
  placeLongFuturesOrder(req, res, req.params.coin);
});
app.post('/api/long/:coin', (req, res) => {
  placeLongFuturesOrder(req, res, req.params.coin);
});
app.post('/api/short/:coin', (req, res) => {
  placeShortFuturesOrder(req, res, req.params.coin);
});
app.post('/api/leverage/:leverage', (req, res) => {
  adjustLeverage(req, res, req.params.leverage);
});
app.post('/api/marginType/:mode', (req, res) => {
  adjustMarginMode(req, res, req.params.mode);
});
const port = process.env.PORT || 8001;
app.listen(port, () => {
  console.log('Connected to binance server');
});
