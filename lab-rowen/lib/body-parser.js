'use strict';

module.exports = (req) => {

  return new Promise( (resolve, reject) =>{
    let body = '';

    req.on('data', buffer => {
      body += buffer.toString();
    });

    req.on('end', () => {
      try {
        req.body = JSON.parse(body);
        resolve(req);
      }
      catch(err) {
        reject(err);
      }
    });
  });
};
