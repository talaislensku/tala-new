var path = require('path')
var webpack = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var brand = require('./app/brand')

var cssModulesLoader = 'css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss-loader'

module.exports = {
  devtool: 'cheap-module-eval-source-map',

  entry: {
    app: [
      'webpack-dev-server/client?http://tala.dev',
      'webpack/hot/only-dev-server',
      path.resolve(__dirname, './app/index.js'),
    ],
  },

  output: {
    path: path.resolve(__dirname, 'build'),
    publicPath: '/',
    filename: 'bundle.js',
  },

  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loaders: ['react-hot', 'babel'],
      }, {
        test: /\.css$/,
        loader: 'style-loader!' + cssModulesLoader,
      }, {
        test: /\.yaml$/,
        loader: 'json-loader!yaml-loader',
      }, {
        test: /\.svg$/,
        loader: 'file-loader',
      },
    ],
  },

  postcss: [
    require('autoprefixer'),
    require('postcss-simple-vars')({ variables: brand }),
    require('postcss-color-function'),
    require('postcss-calc'),
    require('postcss-assets'),
  ],

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new HtmlWebpackPlugin({
      title: 'tala.is',
      template: 'index.dev.html',
      inject: 'body',
    }),
  ],

  devServer: {
    host: '0.0.0.0',
    historyApiFallback: true,
    stats: {
      assets: false,
      colors: true,
      version: false,
      hash: false,
      timings: true,
      chunks: false,
      chunkModules: false,
    },
  },
}
