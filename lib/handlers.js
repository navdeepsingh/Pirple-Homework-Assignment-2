/*
*
* Handlers File
*
*/
// Dependancies
const helpers = require('./helpers');
const _data = require('./data');

const handlers = {};

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
// Requred data: name, email, address
// Optional data: none
handlers._users.post = (data, callback) => {
  const name = typeof(data.payload.name) == 'string' && data.payload.name.trim().length > 0 ? data.payload.name.trim() : false;
  const email = typeof(data.payload.email) == 'string' && helpers.validateEmail(data.payload.email.trim()) ? data.payload.email.trim() : false;
  const password = typeof (data.payload.password) == 'string' && data.payload.password.trim().length > 0 ? data.payload.password.trim() : false;
  const address = typeof(data.payload.address) == 'string' && data.payload.address.trim().length > 0 && data.payload.address.trim().length <= 200 ? data.payload.address.trim() : false;  
  const tosAgreement = typeof(data.payload.tosAgreement) == 'boolean' && data.payload.tosAgreement == true ? true : false;


  if (name && email && password && address && tosAgreement) {
    _data.read('users', email, (err, data) => {

      if (err) { // File Not exists or User Not Exists
        const hashedPassword = helpers.hash(password);

        if (hashedPassword) {
          const dataObject = {
            'name' : name,
            'email' : email,
            'password': hashedPassword,            
            'address' : address,
            'tosAgreement' : tosAgreement
          }

          _data.create('users', email, dataObject, (err) => {
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
        callback(400, {'Error' : 'A file with that email number already exists'});
      }
    })
  } else {
    callback(400, {'Error': 'Missing required fields'});
  }
}


// get
// Required data: email
// Optional data: none
handlers._users.get = (data, callback) => {
  const email = typeof (data.queryStringObject.email) == 'string' && helpers.validateEmail(data.queryStringObject.email.trim()) ? data.queryStringObject.email.trim() : false;

  if (email) {

    // Get the token from the Headers
    const token = typeof (data.headers.token) == 'string' ? data.headers.token : false;
    handlers._tokens.verifyToken(token, email, (tokenIsValid) => {
      if (tokenIsValid) {
        _data.read('users', email, (err, data) => {
          if (!err && data) {
            delete data.password;
            callback(200, data);
          } else {
            callback(500, { 'Error': 'Some error while reading file ' + email + '.json' });
          }
        });
      } else {
        callback(403, { 'Error': 'Missing required token in header, or token is invalid' })
      }
    });


  } else {
    callback(400, { 'Error': 'Missing required fields' });
  }
}


// put
// Required data: email
// Optional data: name, address, password (atleast one)
handlers._users.put = (data, callback) => {
  const name = typeof (data.payload.name) == 'string' && data.payload.name.trim().length > 0 ? data.payload.name.trim() : false;
  const email = typeof (data.payload.email) == 'string' && helpers.validateEmail(data.payload.email.trim()) ? data.payload.email.trim() : false;
  const password = typeof (data.payload.password) == 'string' && data.payload.password.trim().length > 0 ? data.payload.password.trim() : false;
  const address = typeof (data.payload.address) == 'string' && data.payload.address.trim().length > 0 && data.payload.address.trim().length <= 200 ? data.payload.address.trim() : false;  

  if ((name || address || password) && email) {

    // Get the token from the Headers
    const token = typeof (data.headers.token) == 'string' ? data.headers.token : false;
    handlers._tokens.verifyToken(token, email, (tokenIsValid) => {
      if (tokenIsValid) {

        const hashedPassword = helpers.hash(password);

        if (hashedPassword) {

          _data.read('users', email, (err, userData) => {
            if (!err) {
              if (name) {
                userData.name = name;
              }
              if (address) {
                userData.address = address;
              }
              if (password) {
                userData.password = hashedPassword;
              }

              _data.update('users', email, userData, (err) => {
                if (!err) {
                  callback(false);
                } else {
                  callback(500, { 'Error': 'Could not update the user' });
                }
              });
            }
          })

        } else {
          callback(500, { 'Error': 'Password not hashed' });
        }

      } else {
        callback(403, { 'Error': 'Missing required token in header, or token is invalid' });
      }
    });
  } else {
    callback(400, { 'Error': 'Missing required fields' });
  }

}


// delete
// Required data: email
// Optional data: none
handlers._users.delete = (data, callback) => {
  const email = typeof (data.queryStringObject.email) == 'string' && helpers.validateEmail(data.queryStringObject.email.trim()) ? data.queryStringObject.email.trim() : false;

  if (email) {

    // Get the token from the Headers
    const token = typeof (data.headers.token) == 'string' ? data.headers.token : false;
    handlers._tokens.verifyToken(token, emaail, (tokenIsValid) => {
      if (tokenIsValid) {

        _data.read('users', email, (err, data) => {
          if (!err && data) {
            _data.delete('users', email, (err) => {
              if (!err) {
                callback(false);
              } else {
                callback(500, { 'Error': 'Some deleting file ' + email + '.json' });
              }
            })
          } else {
            callback(500, { 'Error': 'Some error while reading file ' + email + '.json' });
          }
        });

      } else {
        callback(403, { 'Error': 'Missing required token in header, or token is invalid' });
      }
    });
  } else {
    callback(400, { 'Error': 'Missing required fields' });
  }
}

handlers.login = (data, callback) => {
  const acceptableMethods = ['post'];
  const dataMethod = data.method;
  if (acceptableMethods.indexOf(dataMethod) > -1) {
    handlers._login[dataMethod](data, callback);
  } else {
    callback(405);
  }
}

handlers._login = {};

// Login - post
// Required data: email, Password
// Optional data: none
handlers._login.post = (data, callback) => {
  const email = typeof (data.payload.email) == 'string' && helpers.validateEmail(data.payload.email.trim()) ? data.payload.email.trim() : false;
  const password = typeof (data.payload.password) == 'string' && data.payload.password.trim().length > 0 ? data.payload.password.trim() : false;
  if (email && password) {
    // Lookup the users who matches the email and password
    _data.read('users', email, (err, userData) => {
      if (!err && userData) {
        // Check password is correct
        const hashedPassword = helpers.hash(password);
        if (hashedPassword === userData.password) { // if password matches
          // Create token
          const randomToken = helpers.generateToken();
          if (randomToken) { // If valid token
            const tokenData = {
              'email': email,
              'id': randomToken,
              'expires': Date.now() + 1000 * 60 * 60 * 24 // For 24 hours
            }
            _data.create('tokens', randomToken, tokenData, (err) => {
              if (!err) {
                callback(null, tokenData);
              } else {
                callback(500, { 'Error': 'Error in creating token file' });
              }
            });
          }
        } else {
          callback(400, { 'Error': 'Password Mis-matched' });
        }
      } else {
        callback(500, { 'Error': 'Error in reading file' });
      }
    })
  } else {
    callback(400, { "Error": "Missing required field(s)" });
  }
}


handlers.logout = (data, callback) => {
  const acceptableMethods = ['delete'];
  const dataMethod = data.method;
  if (acceptableMethods.indexOf(dataMethod) > -1) {
    handlers._logout[dataMethod](data, callback);
  } else {
    callback(405);
  }
}

handlers._logout = {};

// delete
// Required data: id
// Optional data: none
handlers._logout.delete = (data, callback) => {
  const id = typeof (data.queryStringObject.id) == 'string' && data.queryStringObject.id.trim().length > 0 ? data.queryStringObject.id.trim() : false;

  if (id) {
    _data.read('tokens', id, (err, tokenData) => {
      if (!err && tokenData) {
        _data.delete('tokens', id, (err) => {
          if (!err) {
            callback(false);
          } else {
            callback(500, { 'Error': 'Some deleting file ' + id + '.json' });
          }
        })
      } else {
        callback(500, { 'Error': 'Some error while reading file ' + id + '.json' });
      }
    });
  } else {
    callback(400, { 'Error': 'Missing required fields' });
  }
}

handlers._tokens = {};

handlers._tokens.verifyToken = (id, email, callback) => {
  // Look up the token
  _data.read('tokens', id, (err, tokenData) => {
    if (!err && tokenData) {
      // Check if token is of given user and is not expired
      if (tokenData.email == email && tokenData.expires > Date.now()) {
        callback(true);
      } else {
        callback(false);
      }
    } else {
      callback(false);
    }
  });
}

module.exports = handlers;
