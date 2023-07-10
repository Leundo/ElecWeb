const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const path = require('path');
const fs = require('fs');
const http = require('http');
const app = express();


app.use(express.static(path.join(__dirname, 'dist')));
app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});


const httpsPort = 443;
const httpPort = 3014;

// HTTP 重定向
app.listen(httpPort, function () {
    console.log('Example app listening on port 3014!\n');
});