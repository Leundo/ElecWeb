const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const config = require('./webpack.prod.config.js');

function copy() {
    fs.copyFileSync(path.join(__dirname, 'public', 'robots.txt'), path.join(__dirname, 'dist', 'robots.txt'));
    fs.copyFileSync(path.join(__dirname, 'public', 'index_prod.html'), path.join(__dirname, 'dist', 'index.html'));
};

webpack(config, (err, stats) => {
    if (err) {
        console.error(err.stack || err);
        if (err.details) {
            console.error(err.details);
        }
        return;
    }

    const info = stats.toJson();

    if (stats.hasErrors()) {
        console.error(info.errors);
    }

    if (stats.hasWarnings()) {
        console.warn(info.warnings);
    }

    copy();
});
