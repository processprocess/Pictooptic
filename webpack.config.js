const path = require('path');

module.exports = {
  devtool: 'source-map',
  entry: path.join(__dirname, 'clientView', 'index.js'),
  output: {
    path: path.join(__dirname, 'dist', 'js'),
    filename: 'bundle.js',
  },
  module: {
    loaders: [
      {
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015'],
        },
      },
    ],
  },
};
