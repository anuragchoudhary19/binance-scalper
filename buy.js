// const crypto = require('crypto');
// var XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;

// exports.buyOrder = () => {
//   let burl = 'https://api.binance.com';
//   let endpoint = '/sapi/v1/margin/order';
//   let dataQueryString =
//     'symbol=DOGEBTC&isIsolated=TRUE&side=BUY&type=LIMIT&timeInForce=IOC&quantity=20&price=0.00000900&recvWindow=10000&timestamp=' +
//     Date.now();

//   let signature = crypto.createHmac('sha256', process.env.SECRET_KEY).update(dataQueryString).digest('hex');
//   let url = burl + endpoint + '?' + dataQueryString + '&signature=' + signature;
//   let ourRequest = new XMLHttpRequest();
//   ourRequest.open('POST', url, true);
//   ourRequest.setRequestHeader('X-MBX-APIKEY', process.env.API_KEY);
//   ourRequest.onload = function () {
//     console.log(ourRequest.responseText);
//   };
//   ourRequest.send();
// };
