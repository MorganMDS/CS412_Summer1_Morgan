var express = require('express');
var router = express.Router();

/* GET home page. */
router.post('/', function(req, res) {
    let obj = req.body;
    let l = obj.test.length;
    let result = {};
    let string = obj.test;
    result.string = string;
    result.length = l;
    res.send(result);
});

module.exports = router;
