require('dotenv').config();
const express = require('express');
const app = express();
// const superRequest = require('superagent');
const wordRouter = require('./routes/wordRouter.js');
const palettes = require('./json/colorPalettes.json');

app.use('/api/words', wordRouter);

app.get('/color', (request, response) => {
  const randomIndex = Math.floor(Math.random() * (palettes.length - 0) + 0);
  const color = palettes[randomIndex];
  response.status(202).send( color );
});

module.exports = app;