/*
*
* Helpers File
*
*/
// Dependencies
const crypto = require('crypto');
const config = require('./config');

const helpers = {};

helpers.parseJsonToObject = (str) => {
  try {
    const obj = JSON.parse(str);
    return obj;
  } catch (e) {
    return {};
  }
}

helpers.validateEmail = (email) => {
  var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

// Create a SHA256 hash
helpers.hash = (str) => {
  if (typeof(str) == 'string' && str.length > 0) {
    const hash = crypto.createHmac('sha256', config.hashingSecret).update(str).digest('hex');
    return hash;
  } else {
    return false;
  }
}

// Generate Random String
helpers.generateRandomString = (strLength = 20) => {
  strLength = typeof(strLength) == 'number' && strLength > 0 ? strLength : false;
  if (strLength) {
    possibleChars = 'abcdefghijklomnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ012346789';
    randomString = '';
    let i = 1;
    while (i <= strLength) {
      randomString += possibleChars.charAt(Math.floor(Math.random() * Math.floor(possibleChars.length)));
      i++;
    }
    return randomString;
  } else {
    return false;
  }
}

module.exports = helpers;
