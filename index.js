'use strict'

const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const Client = require('node-xmpp-client');

const envOptions = {
  lolId : process.env.LOL_ID + "@pvp.net/xiff",
  lolPassword : "AIR_" + process.env.LOL_PASSWORD,
  lolPort: process.env.LOL_PORT || 5223,
  lolServer : process.env.LOL_SERVER || "chat.eun1.lol.riotgames.com",
};

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

var client = new Client({
  jid : envOptions.lolId,
  password :  envOptions.lolPassword,
  host : envOptions.lolServer,
  port : envOptions.lolPort,
  reconnect : true,
  autostart : true,
  legacySSL : true
})

client.on('stanza', function (stanza) {
  console.log('Received stanza: ', stanza.toString());
});







