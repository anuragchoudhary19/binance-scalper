// const crypto = require('crypto');
// const WebSocket = require('ws');
// var XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;
// const axios = require('axios');

// exports.getListenKey = async () => {
//   return await axios.post(
//     `${process.env.BASE_URL}/fapi/v1/listenKey`,
//     {},
//     { headers: { 'X-MBX-APIKEY': process.env.API_KEY } }
//   );
// };

// exports.refreshListenKeys = () => {
//   let burl = process.env.BASE_URL;
//   let query = '/fapi/v1/listenKey';
//   let url = burl + query;
//   let ourRequest = new XMLHttpRequest();
//   ourRequest.open('PUT', url, false);
//   ourRequest.setRequestHeader('X-MBX-APIKEY', process.env.API_KEY);
//   ourRequest.onload = function () {
//     console.log('refreshed keys');
//   };
//   ourRequest.send();
// };
// exports.getUserDataStreams = (listenKey) => {
//   const ws = new WebSocket(`wss://fstream.binance.com/ws/${listenKey}`);
//   ws.on('open', function open() {
//     console.log('connected');
//   });
//   ws.on('message', function incoming(data) {
//     console.log(data);
//   });
// };
