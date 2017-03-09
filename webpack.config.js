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
    filename: 'muudy.js',
    path: path.resolve(__dirname, './dist'),
    publicPath: '/'
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
            use: ExtractTextPlugin.extract({
              fallback: 'style-loader',
              use: [
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
      new webpack.ContextReplacementPlugin(/moment[\\/]locale$/, /^\.\/(en-gb)$/),
      new ExtractTextPlugin({
        filename: 'styles.css',
        disable: isDev,
        allChunks: true
      })
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
        new webpack.optimize.UglifyJsPlugin()
      )
    }

    return plugins
  })()
}
