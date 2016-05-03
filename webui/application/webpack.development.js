const path = require('path');
const webpack = require('webpack');
const HtmlPlugin = require('html-webpack-plugin');

const files = {
  entry: './src/App.js',
  outputPath: './development',
  outputFilename: 'javascript/bundle.js',
  htmlTemplate: './src/index.html'
};

module.exports = {
  entry: [
    'webpack-dev-server/client?http://localhost:3000',
    'webpack/hot/only-dev-server',
    files.entry
  ],
  output: {
    path: path.resolve(files.outputPath),
    filename: files.outputFilename
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loaders: ['react-hot', 'babel']
      },
      {
        test: /\.scss$/,
        loaders: ['style', 'css', 'sass']
      }
    ]
  },
  plugins: [
    new HtmlPlugin({ template: files.htmlTemplate }),
    new webpack.HotModuleReplacementPlugin()
  ]
};
