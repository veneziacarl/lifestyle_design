var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: './client/entry.jsx',
  output: { path: __dirname + '/app/assets/javascripts', filename: 'bundle.js' },
  module: {
    loaders: [
      {
        test: /.jsx?$/,
        loader: ['babel-loader'],
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'react']
        }
      }
    ]
  },
};
