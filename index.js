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

client.on('online', function () {
  console.log('Client is online')
  client.send('<presence/>')
})

client.on('offline', function () {
  console.log('Client is offline')
})

client.on('connect', function () {
  console.log('Client is connected')
})

client.on('reconnect', function () {
  console.log('Client reconnects …')
})

client.on('disconnect', function (e) {
  console.log('Client is disconnected', client.connection.reconnect, e)
})

client.on('error', function (e) {
  console.error(e)
  process.exit(1)
})

process.on('exit', function () {
  client.end()
})

client.on('stanza', function (stanza) {
  if (stanza.is('message') && stanza.attrs.type === 'chat') {
    var i = parseInt(stanza.getChildText('body'), 10)
    console.log(stanza.getChildText('body'));
    var reply = new Client.Stanza('message', {
      to: stanza.attrs.from,
      from: stanza.attrs.to,
      type: 'chat'
    })
    reply.c('body').t(isNaN(i) ? 'i can count!' : ('' + (i + 1)))
    setTimeout(function () {
      client.send(reply)
    }, 321)
  }
})









