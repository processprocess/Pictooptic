const path = require('path');
const app = require('./app/app');
const express = require('express');

const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const config = require('./webpack.config');

const compiler = webpack(config);
const webpackMiddle = webpackDevMiddleware(compiler, {
  publicPath: '/js',
  stats: {
    chunks: false,
    colors: true,
  },
});

app.use(webpackMiddle);
app.use(webpackHotMiddleware(compiler));

app.use(express.static(path.join(__dirname, 'dist')));
app.get('/', (request, response) => {
  response.sendFile(path.join(__dirname, 'dist/index.html'));
});

app.listen(3000, () => {
  console.log('Listening on Port 3000');
});
