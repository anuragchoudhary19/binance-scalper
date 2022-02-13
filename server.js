require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { setIntervalAsync } = require('set-interval-async/dynamic');
const { clearIntervalAsync } = require('set-interval-async');
const { getUnrealizedProfitCoins } = require('./accountData');
const { placeShortFuturesOrder, placeLongFuturesOrder } = require('./order');
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(cors());

setIntervalAsync(async () => {
  await getUnrealizedProfitCoins();
}, 250);

app.post('/api/long/:coin', (req, res) => {
  console.log('LONG', req.params.coin);
  placeLongFuturesOrder(req, res, req.params.coin);
});
app.post('/api/short/:coin', (req, res) => {
  console.log('SHORT', req.params.coin);
  placeShortFuturesOrder(req, res, req.params.coin);
});
const port = process.env.PORT || 8001;
app.listen(port, () => {
  console.log('Connected to server');
});
