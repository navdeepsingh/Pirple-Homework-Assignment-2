/*
*
* Handlers File
*
*/
// Dependancies
const helpers = require('./helpers');
const _data = require('./data');

const handlers = {};

// Define Test Handler
handlers.test = (data, callback) => {
  callback(null, data.payload);
}

// Define not Found Handler
handlers.notFound = (data, callback) => {
  callback(404, {'Error' : 'Not Found'});
}

handlers.users = (data, callback) => {
  const dataMethod = data.method;
  const isMethodAllowed = ['post', 'get', 'put', 'delete'].indexOf(dataMethod);
  if (isMethodAllowed > -1) {
    handlers._users[dataMethod](data, callback);
  } else {
    callback(405);
  }
}

handlers._users = {};

// users - post
// Requred data: firstName, lastName, phone, password, tosAgreement
// Optional data: none
handlers._users.post = (data, callback) => {
  const name = typeof(data.payload.name) == 'string' && data.payload.name.trim().length > 0 ? data.payload.name.trim() : false;
  const email = typeof(data.payload.email) == 'string' && helpers.validateEmail(data.payload.email.trim()) ? data.payload.email.trim() : false;
  const phone = typeof(data.payload.phone) == 'string' && data.payload.phone.trim().length == 10 ? data.payload.phone.trim() : false;
  const address = typeof(data.payload.address) == 'string' && data.payload.address.trim().length > 0 && data.payload.address.trim().length <= 200 ? data.payload.address.trim() : false;
  const password = typeof(data.payload.password) == 'string' && data.payload.password.trim().length > 0 ? data.payload.password.trim() : false;
  const tosAgreement = typeof(data.payload.tosAgreement) == 'boolean' && data.payload.tosAgreement == true ? true : false;


  if (name && email && phone && address && password && tosAgreement) {
    _data.read('users', phone, (err, data) => {

      if (err) { // File Not exists or User Not Exists
        const hashedPassword = helpers.hash(password);

        if (hashedPassword) {
          const dataObject = {
            'name' : name,
            'email' : email,
            'phone' : phone,
            'address' : address,
            'password' : hashedPassword,
            'tosAgreement' : tosAgreement
          }

          _data.create('users', phone, dataObject, (err) => {
            if (!err) {
              callback(200);
            } else {
              callback(500, {'Error' : 'Could not create the new user'});
            }
          });
        } else {
          callback(500, {'Error' : 'Could not hash the user\'s password'});
        }

      } else {
        callback(400, {'Error' : 'A file with that phone number already exists'});
      }
    })
  } else {
    callback(400, {'Error': 'Missing required fields'});
  }
}

module.exports = handlers;
