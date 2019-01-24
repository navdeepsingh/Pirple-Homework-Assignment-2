/*
*
* Configuration File
*
*/

const config = {};

config.default = {
  'envName' : 'localhost',
  'httpPort' : 3000,
  'httpsPort' : 3001,
  'hashingSecret' : 'secret_key',
  'menuItems': { 
    1: 'Margherita',
    2: 'Double Cheese Margherita',
    3: 'Farm House',
    4: 'Peppy Paneer',
    5: 'Mexican Green Wave',
    6: 'Deluxe Veggie',
    7: '5 Pepper',
    8: 'Veg Extravaganza',
    9: 'CHEESE N CORN',
   10: 'PANEER MAKHANI',
   11: 'VEGGIE PARADISE',
   12: 'FRESH VEGGIE'
  }
};

config.production = {
  'envName' : 'production',
  'httpPort' : 5000,
  'httpsPort' : 5001,
  'hashingSecret' : 'secret_key',
  'menuItems': {
    1: 'Margherita',
    2: 'Double Cheese Margherita',
    3: 'Farm House',
    4: 'Peppy Paneer',
    5: 'Mexican Green Wave',
    6: 'Deluxe Veggie',
    7: '5 Pepper',
    8: 'Veg Extravaganza',
    9: 'CHEESE N CORN',
    10: 'PANEER MAKHANI',
    11: 'VEGGIE PARADISE',
    12: 'FRESH VEGGIE'
  }
};

const chosenConfig = process.env.NODE_ENV == 'production' ? config.production : config.default;

module.exports = chosenConfig;
