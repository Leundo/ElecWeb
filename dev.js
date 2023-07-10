const express = require('express');
const webpack = require('webpack');
const { createProxyMiddleware } = require('http-proxy-middleware');
const webpackDevMiddleware = require('webpack-dev-middleware');
const WebpackHotMiddleware = require('webpack-hot-middleware');
const path = require('path');

const app = express();
const config = require('./webpack.dev.config.js');
const compiler = webpack(config);

process.env.NODE_ENV = 'development';

app.use(webpackDevMiddleware(compiler, {
    publicPath: '/',
}));

app.use(WebpackHotMiddleware(compiler, {
    log: console.log
}));

app.use(express.static(path.join(__dirname, 'public')));
app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(3013, function () {
    console.log('Example app listening on port 3013!\n');
});