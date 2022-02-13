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

app.post('/api/long', (req, res) => {
  console.log(req.body.symbol);
  // placeLongFuturesOrder(req.body.symbol);
});
app.post('/api/short', (req, res) => {
  console.log(req.body.symbol);
  // placeShortFuturesOrder(req.body.symbol);
});
app.listen(8001, () => {
  console.log('Connected to server');
});
