const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const config = require('./webpack.development');

new WebpackDevServer(webpack(config), { hot: true }).listen(3000);
