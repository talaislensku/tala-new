var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin')

var cssModulesLoader = 'css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss-loader'

module.exports = {
  entry: {
    javascript: './app/index.js',
    vendors: ['react', 'react-dom']
  },

  output: {
    filename: '[name].[chunkhash].js',
    path: path.join(__dirname, 'build', 'assets'),
    publicPath: '/assets',
    devtool: 'source-map'
  },

  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel?presets[]=react,presets[]=es2015,presets[]=stage-0',
        exclude: /node_modules/
      }, {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style-loader', cssModulesLoader)
      }, {
        test: /\.svg$/,
        loader: 'url-loader?limit=10000&mimetype=image/svg+xml'
      }
    ]
  },

  postcss: [
    require('autoprefixer')
  ],

  plugins: [
    new HtmlWebpackPlugin({
      title: 'tala.is',
      template: 'index.html',
      inject: 'body',
      filename: '../index.html'
    }),
    new ExtractTextPlugin('styles.[chunkhash].css', { allChunks: true }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.CommonsChunkPlugin('vendors', 'vendors.[chunkhash].js'),
    new webpack.optimize.UglifyJsPlugin()
  ]
};