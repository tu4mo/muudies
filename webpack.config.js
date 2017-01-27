const CopyWebpackPlugin = require('copy-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')
const webpack = require('webpack')

const isDev = process.env.NODE_ENV === 'development'

module.exports = {
  devtool: isDev ? 'eval' : '',

  entry: (function () {
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
    rules: (function () {
      let rules = [
        { test: /\.js$/, exclude: /node_modules/, use: 'babel-loader' }
      ]

      if (isDev) {
        rules.push(
          { test: /\.css$/, use: ['style-loader', 'css-loader'] },
          { test: /\.scss$/, use: ['style-loader', 'css-loader', 'sass-loader'] }
        )
      } else {
        rules.push(
          {
            test: /\.(css|scss)$/,
            loader: ExtractTextPlugin.extract({
              fallbackLoader: 'style-loader',
              loader: [
                { loader: 'css-loader' },
                { loader: 'sass-loader' }
              ]
            })
          }
        )
      }

      return rules
    })()
  },

  plugins: (function () {
    let plugins = [
      new CopyWebpackPlugin([
        { from: 'client/images', to: 'images' }
      ], {
        copyUnmodified: true
      }),
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, './client/index.html')
      }),
      new webpack.ContextReplacementPlugin(/moment[\\/]locale$/, /^\.\/(en-gb)$/)
    ]

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
        new webpack.optimize.UglifyJsPlugin(),
        new ExtractTextPlugin({
          filename: 'styles.css',
          disabled: false,
          allChunks: true
        })
      )
    }

    return plugins
  })()
}
