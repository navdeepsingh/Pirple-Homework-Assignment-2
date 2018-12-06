/*
*
* Configuration File
*
*/

const config = {};

config.default = {
  'envName' : 'localhost',
  'httpPort' : 3000,
  'httpsPort' : 3001
};

config.production = {
  'envName' : 'production',
  'httpPort' : 5000,
  'httpsPort' : 5001
};

const chosenConfig = process.env.NODE_ENV == 'production' ? config.production : config.default;

module.exports = chosenConfig;
