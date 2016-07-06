const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')
const webpack = require('webpack')

const isDev = process.env.NODE_ENV !== 'production'

module.exports = {
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
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel'
      }
    ]
  },

  plugins: (function() {
    let plugins = []

    plugins.push(
      new webpack.optimize.OccurenceOrderPlugin(),
      new webpack.NoErrorsPlugin(),
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
        })
      )
    }

    return plugins
  })()
}
