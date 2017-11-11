'use strict';

const http = require('http');
const url = require('url');
const cowsay = require('cowsay');
const querystring = require('querystring');
const bp = require('./lib/body-parser.js');

const server = module.exports = http.createServer((req, res) => {
  req.url = url.parse(req.url);

  if(req.method === 'GET'  && req.url.pathname === '/') {
    cowRespond(res, 200, 'Connected to server.');
  }

  else if(req.method === 'GET' && req.url.pathname === '/cowsay') {
    let message = querystring.parse(req.url.query).text;
    cowRespond(res, 200, message);
  }

  else if(req.method ==='POST' && req.url.pathname === '/') {
    bp(req)
      .then( req => {
        cowRespond(res, 200, JSON.stringify(req.body));
      })

      .catch( err => {
        res.writeHead(400, {'Content-Type': 'text/plain'});
        res.write('error: ' + err);
        res.end();
      });
  }
});

let cowRespond = (res, status, body) => {
  res.writeHead(status, {'Content-Type': 'text/plain'});
  res.write(cowsay.say({text: body}));
  res.end();
};
