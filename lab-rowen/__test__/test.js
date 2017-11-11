'use strict';

const cowsay = require('cowsay');
const expect = require('expect');
const request = require('superagent');

const server = require('../lib/server');

const PORT = 3000;
const host = 'localhost:' + PORT;


describe('vanilla http server', () => {
  before((done) =>  {
    server.listen(PORT, done);
  });

  after((done) => {
    server.close(done);
  });

  it('server runs!', (done) => {
    request
      .get(host + '/')
      .end((err,res) => {
        expect(err).toBe(null);
        expect(res.text).toBe(cowsay.say({text: 'Connected to server.'}));
        done();
      });
  });

  it('cowsay should return the query', (done) => {
    request
      .get(host + '/cowsay?text=blep')
      .end((err, res) => {
        expect(err).toBe(null);
        expect(res.text).toBe(cowsay.say({text: 'blep'}));
        done();
      });
  });

  it('returns an error on bad json send', (done) => {
    request
    .post(host + '/')
    .send('magic')
    .end((err) => {
      expect(err).not.toBe(null);
      done();
    });
  });

  it('we get cowsay on a correct request', (done) => {
    request
      .post(host + '/')
      .send({test: 'magic magic'})
      .end((err, res) => {
        expect(res.text).toBe(cowsay.say({text: '{"test":"magic magic"}'}));
        done();
      });
  });

});
