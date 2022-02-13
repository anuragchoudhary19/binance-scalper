// let XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;
// exports.getMarketData = () => {
//   let queryString = 'pair=DOGEUSDT&contractType=PERPETUAL&interval=1m';
//   let url = process.env.BASE_URL + '/fapi/v1/continuousKlines' + '?' + queryString;
//   let ourRequest = new XMLHttpRequest();
//   ourRequest.open('GET', url, true);
//   // ourRequest.setRequestHeader('X-MBX-APIKEY', keys['akey']);
//   ourRequest.onload = function () {
//     console.table(ourRequest.responseText);
//   };
//   ourRequest.send();
// };
