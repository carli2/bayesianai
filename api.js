var express = require('express');
var app = express();

var Pool = require('./pool.js');

var pools = {};

app.get('/rest/create/:partition', function (request, response, next) {
	response.end('true');
	pools[request.params.partition] = new Pool();
});

app.listen('9040');
