var webpack = require('webpack');
var path = require('path');
var autoprefixer = require('autoprefixer');
var babelPolyfill = require("babel-polyfill");
var whatwgFetch = require("whatwg-fetch");
var promise = require('es6-promise');
const buildPath = path.resolve(__dirname, 'build');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  debug: true,
  devtool: 'source-map',
  entry: [
    'es6-promise',
    'babel-polyfill',
    'whatwg-fetch',
    './src/app/app.jsx'
  ],
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  output: {
    path: buildPath,
    filename: 'bundle.[hash].js'
  },
  devServer: {
    contentBase: 'src/www', // Relative directory for base of server
    devtool: 'eval'
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel',
        query: {
          presets: [
            'es2015',
            'react'
          ]
        }
      }, {
        test: /\.css?$/,
        loader: "style-loader!css-loader!postcss-loader"
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('development')
      }
    }),
    new HtmlWebpackPlugin({
      template: './index.ejs',
      title: 'SPA Auth'
    })
  ],
  postcss: function () {
    return [autoprefixer];
  }
};
