/*
*
* Server related tasks
*
*/
const http =  require('http');
const url = require('url');
const StringDecoder = require('string_decoder').StringDecoder;
const helpers = require('./helpers');
const handlers = require('./handlers');
const config = require('./config');

const server = {};

server.http = http.createServer((req, res) => {
  server.unifiedServer(req, res);
});

server.init = () => {
  server.http.listen(config.port, () => {
    console.log('Server started at port ' + config.port);
  })
}

server.unifiedServer = (req, res) => {
  const payload = {};
  const parsedUrl = url.parse(req.url, true);
  const queryStringObject = parsedUrl.query;
  let path = parsedUrl.pathname;
  path = path.replace(/^\/+|\/$/g, '');
  const method = req.method;
  const headers = req.headers;

  // Get Payload if any
  let buffer = '';
  const decoder = new StringDecoder('utf-8');
  req.on('data', (data) => {
    buffer += decoder.write(data);
  });
  req.on('end', ()=>{
    buffer += decoder.end();

    // Construct Data
    const data = {
      'path': path,
      'queryStringObject': queryStringObject,
      'method': method,
      'headers': headers,
      'payload': helpers.parseJsonToObject(buffer)
    }

    const chosenHandler = typeof (server.router[path]) !== 'undefined' ? server.router[path] : handlers.notFound;
    
    chosenHandler(data, (statusCode, payload) => {
      statusCode = typeof(statusCode) == 'number' ? statusCode : 200;
      payload = typeof(payload) == 'object' ? payload : {};

      const payloadString = JSON.stringify(payload);
      res.writeHead(statusCode, {
        'Content-Type': 'application/json'
      });
      res.end(payloadString);
      console.log('Returning the response: ', statusCode, payload, method, queryStringObject);
    });
  });
}

server.router = {
  'test' : handlers.test,
  'users' : handlers.users,
  'tokens' : handlers.tokens,
  'checks' : handlers.checks
}

module.exports = server;
