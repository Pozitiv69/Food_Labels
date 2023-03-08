'use string';

import querystring from 'node:querystring';
import crypto from 'node:crypto';
import https from 'node:https';
import { consumerSecret, consumerKey } from './OAuth.js';

const API_BASE = 'https://platform.fatsecret.com/rest/server.api';

const params = {
  oauth_nonce: crypto.randomBytes(10).toString('HEX'),
  oauth_version: '1.0',
  oauth_timestamp: Math.floor(new Date().getTime() / 1000),
  oauth_consumer_key: consumerKey,
  food_id: '14102545',
  format: 'json',
  method: 'food.get',
  oauth_signature_method: 'HMAC-SHA1',
};

let qs = '';
let secret = consumerSecret + '&';

Object.keys(params)
  .sort()
  .forEach(
    (param) => (qs += '&' + param + '=' + encodeURIComponent(params[param]))
  );
// console.log(qs);
qs = qs.substr(1);
let mac = crypto.createHmac('sha1', secret);
mac.update(
  'GET&' + encodeURIComponent(API_BASE) + '&' + encodeURIComponent(qs)
);
qs =
  API_BASE +
  '?' +
  qs +
  '&oauth_signature=' +
  encodeURIComponent(mac.digest('base64'));

https.get(qs, (response) => {
  let res = '';
  response.on('data', (chunk) => {
    res += chunk;
  });
  response.on('end', () => {
    console.dir(JSON.parse(res));
  });
});

class FatSecret {
  constructor(consumerKey, consumerSecret) {
    this.key = consumerKey;
    this.secret = consumerSecret;
  }
}
