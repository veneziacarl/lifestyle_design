var path = require('path');
var webpack = require('webpack');

var config = {
  entry: [
    './client/entry.jsx'
  ],
  resolve: {
    root: [
      path.resolve(__dirname, './client')
    ],
    extensions: ['', '.js', '.json', '.jsx']
  },
  output: {
    path: __dirname + '/app/assets/javascripts',
    filename: 'bundle.js',
    publicPath: 'http://localhost:3000'
  },
  module: {
    loaders: [
      {
        test: /.jsx?$/,
        exclude: /node_modules/,
        loaders: ['babel-loader']
      }
    ]
  }
};

module.exports = config;
