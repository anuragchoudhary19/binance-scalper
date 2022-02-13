// var XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;

// exports.getCoinData = () => {
//   let burl = process.env.BASE_URL;
//   let endpoint = '/fapi/v1/continuousKlines';
//   let query = 'pair=DOGEUSDT&contractType=PERPETUAL&interval=5m';
//   let url = burl + endpoint + '?' + query;
//   let ourRequest = new XMLHttpRequest();
//   var key = '';
//   ourRequest.open('GET', url, true);
//   ourRequest.setRequestHeader('X-MBX-APIKEY', process.env.API_KEY);
//   ourRequest.onload = function () {
//     console.log(ourRequest.responseText);
//   };
//   ourRequest.send();
// };
// exports.getCoinCurrentPrice = () => {
//   let burl = process.env.BASE_URL;
//   let endpoint = '/fapi/v1/ticker/price';
//   let query = 'symbol=DOGEUSDT';
//   let url = burl + endpoint + '?' + query;
//   let ourRequest = new XMLHttpRequest();
//   var price = '';
//   ourRequest.open('GET', url, true);
//   ourRequest.setRequestHeader('X-MBX-APIKEY', process.env.API_KEY);
//   ourRequest.onload = function () {
//     let response = JSON.parse(ourRequest.responseText);
//     console.log(response);
//     price = response.price;
//   };
//   ourRequest.send();
//   return price;
// };
