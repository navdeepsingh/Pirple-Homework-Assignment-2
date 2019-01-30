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
    1: {
      'name': 'Margherita',
      'price': 30,
    },
    2: {
      'name': 'Double Cheese Margherita',
      'price': 12
    },
    3: {
      'name': 'Farm House',
      'price': 20
    },
    4: {
      'name': 'Peppy Paneer',
      'price': 25
    },
    5: {
      'name': 'Mexican Green Wave',
      'price': 29.90
    },
    6: {
      'name': 'Deluxe Veggie',
      'price': 50
    },
    7: {
      'name': '5 Pepper',
      'price': 10,
    },
    8: {
      'name': 'Veg Extravaganza',
      'price': 20
    },
    9: {
      'name': 'CHEESE N CORN',
      'price': 25
    },
   10: {
     'name': 'PANEER MAKHANI',
     'price': 40
   },
   11: {
     'name': 'VEGGIE PARADISE',
     'price': 25
   },
   12: {
     'name': 'FRESH VEGGIE',
     'price': 12
    }
  }
};

config.production = {
  'envName' : 'production',
  'httpPort' : 5000,
  'httpsPort' : 5001,
  'hashingSecret' : 'secret_key',
  'menuItems': {
    1: {
      'name': 'Margherita',
      'price': 30,
    },
    2: {
      'name': 'Double Cheese Margherita',
      'price': 12
    },
    3: {
      'name': 'Farm House',
      'price': 20
    },
    4: {
      'name': 'Peppy Paneer',
      'price': 25
    },
    5: {
      'name': 'Mexican Green Wave',
      'price': 29.90
    },
    6: {
      'name': 'Deluxe Veggie',
      'price': 50
    },
    7: {
      'name': '5 Pepper',
      'price': 10,
    },
    8: {
      'name': 'Veg Extravaganza',
      'price': 20
    },
    9: {
      'name': 'CHEESE N CORN',
      'price': 25
    },
    10: {
      'name': 'PANEER MAKHANI',
      'price': 40
    },
    11: {
      'name': 'VEGGIE PARADISE',
      'price': 25
    },
    12: {
      'name': 'FRESH VEGGIE',
      'price': 12
    }
  }
};

const chosenConfig = process.env.NODE_ENV == 'production' ? config.production : config.default;

module.exports = chosenConfig;
