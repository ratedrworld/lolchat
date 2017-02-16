'use strict'

const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const Client = require('node-xmpp-client');

const app = express();

app.set('port', (process.env.PORT || 5000));

// Allows us to process the data
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// ROUTES

app.get('/', function(req, res) {
	res.send("Hi I am a chatbot");
})


app.listen(app.get('port'), function() {
	console.log("running: port");
})







