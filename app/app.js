require('dotenv').config();
const express = require('express');
const app = express();
const iconRouter = require('./routes/iconRouter.js');
const palettes = require('./json/colorPalettes.json');

app.use('/api/icons', iconRouter);

app.get('/color', (request, response) => {
  const randomIndex = Math.floor(Math.random() * (palettes.length - 0) + 0);
  const color = palettes[randomIndex];
  response.status(202).send( color );
});

module.exports = app;