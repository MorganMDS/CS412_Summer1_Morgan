var express = require('express');
var router = express.Router();
var fetch = require('node-fetch');
/**
 * configuration of redis:
 * reids_host: url of reids
 * redis_port: port of redis
 * expire_time: expire time of redis key
 */
var properties = require('../configuration');
var request = require('request');
var redis = require('redis');
var client = null;

router.get('/', (req, res) => {
  res.render('index', { title: 'Express' });
})

router.post('/b', (req, res) => {
  let body = req.body;
  let url = generateUrl(body);

  // generate redis key and get cached value from redis
  let redisKey = 'ps4:b' + generateRedisKey(body);
  client = getClient();
  client.get(redisKey, (err, reply) => {
    if (reply != null && err == null) {
      // if cached value is available, return this value, and marked as redis value
      let obj = {};
      obj.temperature = reply;
      obj.isRedisData = true;
      res.send(obj);
      return;
    }
    // if cached value is not available, call the thrid-party api and then cache the value
    fetch(url).then(res1 => res1.json()).then(res2 => {
      let data = res2.data;
      if (data == null) {
        // raise error if exception
        throw res2.message;
      } else {
        // got real-time temperature and response to caller
        let temp = data.timelines[0].intervals[0].values.temperature + '';
        // cache this value
        client.set(redisKey, temp, (err, reply) => {});
        client.expire(redisKey, properties.expire_time, (err, reply) => {});
        
        // return value regularly
        let obj = {};
        obj.temperature = temp;
        obj.isRedisData = false;
        res.send(obj);
      }
    }).catch(error => res.send(error)); // handle error if exists
  })
})

router.post('/c', (req, res) => {
  let body = req.body;

  // generate redis key and get cached value from redis
  let redisKey = 'ps4:b' + generateRedisKey(body);
  client = getClient();
  client.get(redisKey, (err, reply) => {
    if (reply != null && err == null) {
      // if cached value is available, return this value, and marked as redis value
      let obj = {};
      obj.temperature = reply;
      obj.isRedisData = true;
      res.send(obj);
      return;
    }
    // if cached value is not available, call the thrid-party api and then cache the value
    let url = generateUrl(body);
    let result = requestForUrl(url);
    result.then(res1 => res1.json()).then(res2 => {
      let data = res2.data;
      if (data == null) {
        // raise error if exception
        throw res2.message;
      } else {
        // got real-time temperature and response to caller
        let temp = data.timelines[0].intervals[0].values.temperature + '';
        // cache this value
        client.set(redisKey, temp, (err, reply) => {});
        client.expire(redisKey, properties.expire_time, (err, reply) => {});
        
        // return value regularly
        let obj = {};
        obj.temperature = temp;
        obj.isRedisData = false;
        res.send(obj);
      }
    }).catch(error => res.send(error));
  })
})

// async request function
async function requestForUrl(url) {
  return await fetch(url);
}

router.post('/d', (req, res) => {
  let body = req.body;

  // generate redis key and get cached value from redis
  let redisKey = 'ps4:b' + generateRedisKey(body);
  client = getClient();
  client.get(redisKey, (err, reply) => {
    if (reply != null && err == null) {
      // if cached value is available, return this value, and marked as redis value
      let obj = {};
      obj.temperature = reply;
      obj.isRedisData = true;
      res.send(obj);
      return;
    }
    // if cached value is not available, call the thrid-party api and then cache the value
    let url = generateUrl(body);
    request(url, function (error, response, body) {
      let content = JSON.parse(body);
      let data = content.data;
      if (data == null) {
        res.send(content.message);
      } else {
        // got real-time temperature and response to caller
        let temp = data.timelines[0].intervals[0].values.temperature + '';
        // cache this value
        client.set(redisKey, temp, (err, reply) => {});
        client.expire(redisKey, properties.expire_time, (err, reply) => {});
        
        // return value regularly
        let obj = {};
        obj.temperature = temp;
        obj.isRedisData = false;
        res.send(obj);
      }
    })
  })
})

// generate full url with params and address
function generateUrl(body) {
  return properties.tomorrowIoUrl + '?'
          + 'location=' + body.location 
          + '&fields=' + body.fields 
          + '&timesteps=' + body.timesteps 
          + '&units=' + body.units
          + '&apikey=' + properties.apiKey;
}

// Create Redis connection
function getClient() {
  if (client == null) client = redis.createClient(properties.redis_port, properties.redis_host);
  return client;
}

// generate redis key
function generateRedisKey(body) {
  let key = '';
  if (body.location != null) {
    key += ':' + body.location;
  }
  if (body.fields != null) {
    key += ':' + body.fields;
  }
  if (body.timesteps != null) {
    key += ':' + body.timesteps;
  }
  if (body.units != null) {
    key += ':' + body.units;
  }
  return key;
}

module.exports = router;
