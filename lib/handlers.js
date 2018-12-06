/*
*
* Handlers File
*
*/

const handlers = {};

// Define Test Handler
handlers.test = (data, callback) => {
  callback(null, data.payload);
}

// Define not Found Handler
handlers.notFound = (data, callback) => {
  callback(404, {'Error' : 'Not Found'});
}
module.exports = handlers;
