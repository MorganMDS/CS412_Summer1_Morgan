var express = require('express');
var router = express.Router();
var fetch = require('node-fetch');
var properties = require('../configuration');
var request = require('request');
const { response } = require('../app');

/* GET home page. */
router.get('/', function(req, res, next) {
  fetch('http://localhost:8888/search?keywords=Passionfruit')
          .then(res1 => res1.json())
          .then(res2 => {
            res.send(res2.result.songs);
          });

  res.render('myPage', {result: 'qweqeqwwq'});
});

router.post('/b', (req, res) => {
  let body = req.body;
  let url = generateUrl(body);
  fetch(url).then(res1 => res1.json()).then(res2 => {
    let data = res2.data;
    if (data == null) {
      // raise error if exception
      throw res2.message;
    } else {
      // got real-time temperature and response to caller
      let temp = data.timelines[0].intervals[0].values.temperature + '';
      res.send(temp);
    }
  }).catch(error => res.send(error)); // handle error if exists
})

router.post('/c', (req, res) => {
  let body = req.body;
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
      res.send(temp);
    }
  }).catch(error => res.send(error));
})

// async request function
async function requestForUrl(url) {
  return await fetch(url);
}

router.post('/d', (req, res) => {
  let body = req.body;
  let url = generateUrl(body);
  request(url, function (error, response, body) {
      let content = JSON.parse(body);
      let data = content.data;
      if (data == null) {
        res.send(content.message);
      } else {
        let temp = data.timelines[0].intervals[0].values.temperature + '';
        res.render('ps4', {temperature: temp});
      }
  });
})

// generate full url by params and address
function generateUrl(body) {
  return properties.tomorrowIoUrl + '?'
          + 'location=' + body.location 
          + '&fields=' + body.fields 
          + '&timesteps=' + body.timesteps 
          + '&units=' + body.units
          + '&apikey=' + properties.apiKey;
}



module.exports = router;
