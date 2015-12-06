'use strict'

var path = require('path')
var webpack = require('webpack')

var config = {
  debug: true,
  devtool: 'source-map',
  entry: {
    'index.ios': ['./app/root.js'],
    'index.android': ['./app/root.js']
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: '[name].js'
  },
  module: {
    loaders: [{
      test: /\.js$/,
      include: [
        path.resolve(__dirname, 'src'),
        path.resolve(__dirname, 'node_modules/react-native-navbar')
      ],
      loader: 'babel',
      query: {
        stage: 0,
        plugins: []
      }
    }]
  },
  plugins: []
}

// Hot loader
if (process.env.HOT) {
  config.devtool = 'eval' // Speed up incremental builds
  config.entry['index.ios'].unshift('react-native-webpack-server/hot/entry')
  config.entry['index.ios'].unshift('webpack/hot/only-dev-server')
  config.entry['index.ios'].unshift('webpack-dev-server/client?http://localhost:8082')
  config.output.publicPath = 'http://localhost:8082/'
  config.plugins.unshift(new webpack.HotModuleReplacementPlugin())
  config.module.loaders[0].query.plugins.push('react-transform')
  config.module.loaders[0].query.extra = {
    'react-transform': {
      transforms: [{
        transform: 'react-transform-hmr',
        imports: ['react-native'],
        locals: ['module']
      }]
    }
  }
}

// Production config
if (process.env.NODE_ENV === 'production') {
  config.plugins.push(new webpack.optimize.OccurrenceOrderPlugin())
  config.plugins.push(new webpack.optimize.UglifyJsPlugin())
}

module.exports = config