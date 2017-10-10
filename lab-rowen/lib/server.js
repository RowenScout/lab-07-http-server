'use strict';

//this is all just scaffolding. I'm really close to having it done.
//I want to remove a lot of these if's and repetitive code
// in favor of functions but... this will have to do since I'm out of time.

const http = require('http');
const url = require('url');

const body = require('body-parser')
const content = {'Content-Type': 'text/plain'};

//creating http server and adding url and query as properties.
const server = http.createServer((request, response) => {
  request.url = body.json(request.url);
  request.url.query = body.json(request.url.query);

//put this in an IFFE so it runs right away and adds extra parameters.
  (function(request, (error, body){
    if(error) {
      response.writeHead(500);
      response.write('unknown error')
      response.end();

    }

//testing the JSON
    try {
      request.body = JSON.parse(body);

//gives err on bad jason
    } catch (error) {
      response.writeHead(400);
      response.write('bad json')
      response.end();

    }

//just spits the request back at the user on post. Will fix later.
    if(request.method === 'POST') {
        response.writeHead(200, content);
        response.write(request.body);
        response.end();

//error feedback
      } else {
        response.writeHead(400, content);
        response.write('bad request');
        response.end();

      }
    }

// if get and query text responds with query.
    if(request.method === 'GET') {
        if(request.url.query.text){
          let message = request.url.query.text;
          response.writeHead(200, content);
          response.write(message);
          response.end();

// error feedback on query.text
        }else{
          response.writeHead(400);
          response.write('bad request');
          response.end();

        }

//error feedback on method
      }else {
        response.writeHead(400, content);
        response.write('bad request');
        response.end();

      }
    }

    response.writeHead(444);
    response.end();

  });
});

//server is ups
server.listen(3000, () => {
  console.log('server alive on port 3000');
});
