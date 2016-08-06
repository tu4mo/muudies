'use strict'

const CopyWebpackPlugin = require('copy-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')
const webpack = require('webpack')

const isDev = process.env.NODE_ENV !== 'production'

module.exports = {
  devtool: isDev ? 'eval' : 'cheap-module-source-map',

  entry: (function() {
    let entries = []

    if (isDev) {
      entries.push(
        'webpack-hot-middleware/client'
      )
    }

    entries.push(
      path.resolve(__dirname, './client')
    )

    return entries
  })(),

  output: {
    path: path.resolve(__dirname, './dist'),
    publicPath: '/',
    filename: 'bundle.js'
  },

  module: {
    loaders: (function() {
      let loaders = []

      loaders.push(
        { test: /\.js$/, exclude: /node_modules/, loader: 'babel' }
      )

      if (isDev) {
        loaders.push(
          { test: /\.css$/, loaders: ['style', 'css'] },
          { test: /\.scss$/, loaders: ['style', 'css', 'sass'] }
        )
      } else {
        loaders.push(
          { test: /\.css$/, loader: ExtractTextPlugin.extract(['css']) },
          { test: /\.scss$/, loader: ExtractTextPlugin.extract(['css', 'sass']) }
        )
      }

      return loaders
    })()
  },

  plugins: (function() {
    let plugins = []

    plugins.push(
      new webpack.optimize.OccurenceOrderPlugin(),
      new webpack.NoErrorsPlugin(),
      new CopyWebpackPlugin([
        { from: 'client/images/favicon.png', to: 'images' }
      ], {
        copyUnmodified: true
      }),
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, './client/index.html')
      })
    )

    if (isDev) {
      plugins.push(
        new webpack.HotModuleReplacementPlugin()
      )
    } else {
      plugins.push(
        new webpack.DefinePlugin({
          'process.env': {
            'NODE_ENV': JSON.stringify('production')
          }
        }),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin({
          compress: {
            warnings: false
          }
        }),
        new ExtractTextPlugin('styles.css')
      )
    }

    return plugins
  })()
}
