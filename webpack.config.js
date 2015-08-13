var HtmlWebpackPlugin = require('html-webpack-plugin');
var jade = require('jade');

module.exports = {
  entry: './game.js',

  output: {
    path: 'dist',
    filename: '[name]-[hash].js'
  },

  module: {
    loaders: [
      { test: /\.js$/, exclude: /node_modules/, loader: 'ng-annotate!babel' },
      { test: /\.jade$/, loader: 'jade' },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      templateContent: jade.compileFile('./index.jade')(),
      inject: true,
    })
  ]
};
