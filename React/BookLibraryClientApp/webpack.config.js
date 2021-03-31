const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: process.env.NODE_ENV,
  entry: path.join(__dirname, 'src', 'index'),
  output: {
    path: __dirname + '/dist',
    // publicPath: '/dist/',
    filename: "bundle.js",
    chunkFilename: '[name].js'
  },
  module: {
    rules: [
      {
      test: /.jsx?$/,
      include: [
        path.resolve(__dirname, 'src')
      ],
      exclude: [
        path.resolve(__dirname, 'node_modules')
      ],
      loader: 'babel-loader'
    }
  ]
  },
  resolve: {
    extensions: ['.json', '.js', '.jsx']
  },
  devtool: 'source-map',
  devServer: {
    // contentBase: path.join('/dist/'),
    inline: true,
    // host: '0.0.0.0',
    // port: 8080,
  },
  plugins: [
    new webpack.DefinePlugin({ 'process.env.API_URL': JSON.stringify(process.env.API_URL) }),
    new HtmlWebpackPlugin({
      title: 'Book Library',
      template: 'index.html'
    })
  ],
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendors: {
          chunks: 'all',
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          name: "vendors",
          enforce: true
        }
      }
    }
  }
};