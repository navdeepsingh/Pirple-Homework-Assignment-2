/*
*
* Server related tasks
*
*/
const http =  require('http');
const url = require('url');
const StringDecoder = require('string_decoder').StringDecoder;
const helpers = reuire('./helpers');
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
      'trimmedPath': trimmedPath,
      'queryStringObject': queryStringObject,
      'method': method,
      'headers': headers,
      'payload': helpers.parseJsonToObject(buffer);
    }
  });
}

server.router = {
  'test' : handlers.test,
  'users' : handlers.users,
  'tokens' : handlers.tokens,
  'checks' : handlers.checks
}

module.exports = server;
