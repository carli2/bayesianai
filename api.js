var express = require('express');
var app = express();

var Pool = require('./pool.js');

var pools = {};

app.use(require('body-parser').urlencoded({ extended: true }));

app.get('/rest/create/:partition', function (request, response, next) {
	response.json(true);
	pools[request.params.partition] = new Pool();
});

app.get('/rest/delete/:partition', function (request, response, next) {
	if (!pools[request.params.partition]) return response.json('partition does not exist');
	response.json(true);
	delete pools[request.params.partition];
});

app.post('/rest/train/:partition', function (request, response, next) {
	if (!pools[request.params.partition]) return response.json('partition does not exit');
	if (!request.body.input) return response.json('parameter input not given');
	if (!request.body.output) return response.json('parameter output not given');
	var input;
	try {
		input = JSON.parse(request.body.input);
	} catch (e) {
		console.log(request.body);
		return response.json('parameter input is not a valid JSON');
	}
	var pool = pools[request.params.partition];

	response.json(true);
	pool.train(input, request.body.output);
});

app.post('/rest/classify/:partition', function (request, response, next) {
	if (!pools[request.params.partition]) return response.json('partition does not exist');
	if (!request.body.input) return response.json('parameter input not given');
	var input;
	try {
		input = JSON.parse(request.body.input);
	} catch (e) {
		return response.json('parameter input is not a valid JSON');
	}
	var pool = pools[request.params.partition];

	pool.classify(input, function (output, confidentiality) {
		response.json({output: output, confidentiality: confidentiality});
	});
});

app.listen('9040');
