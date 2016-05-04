const webpack = require('webpack');
const HtmlPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const files = {
  entry: './src/App.js',
  outputPath: '../static',
  outputFilename: 'javascript/bundle.[hash].js',
  htmlTemplate: './src/index.html',
  cssPath: 'styles/styles.[hash].css',
};

module.exports = {
  entry: files.entry,
  output: {
    path: files.outputPath,
    filename: files.outputFilename
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel'
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract('style', 'css!sass')
      }
    ]
  },
  plugins: [
    new HtmlPlugin({
      template: files.htmlTemplate,
      minify: {
        collapseWhitespace: true
      }
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({ output: { comments: false } }),
    new ExtractTextPlugin(files.cssPath)
  ]
};
