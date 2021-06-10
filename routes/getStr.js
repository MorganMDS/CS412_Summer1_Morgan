var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    let obj = req.query;
    console.log(obj);
    if (obj.string === undefined) {
        obj = {string: 'my first node project'};
    }
    let  l = obj.test.length;
    let result = {}
    result.test = obj.test;
    result.len = l;
    res.send(result);
});

module.exports = router;