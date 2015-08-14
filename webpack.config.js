var HtmlWebpackPlugin = require('html-webpack-plugin');
var jade = require('jade');

module.exports = {
  entry: './game.js',

  devtool: 'source-map',

  output: {
    filename: '[name]-[hash].js'
  },

  module: {
    loaders: [
      { test: /\.js$/, loader: 'ng-annotate!babel', exclude: /node_modules/ },
      { test: /\.jade$/, loader: 'jade' },
      { test: /\.css$/, loader: 'style!css' },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      templateContent: jade.compileFile('./index.jade')(),
      inject: true,
    })
  ]
};
