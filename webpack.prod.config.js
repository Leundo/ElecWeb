const path = require('path');
const webpack = require('webpack');
const miniCssExtractPlugin = require('mini-css-extract-plugin');
const cssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const terserPlugin = require("terser-webpack-plugin");


const webConfig = {
    mode: 'production',
    entry: {
        main: [
            path.resolve(__dirname, './src/Index.js')
        ],
    },
    output: {
        filename: 'js/[name].js',
        path: path.resolve(__dirname, './dist'),
        clean: true,
    },
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            [
                                '@babel/preset-env',
                            ],
                            [
                                '@babel/preset-react',
                                {},
                            ],
                        ],
                        plugins: [
                            [
                                '@babel/plugin-transform-react-jsx',
                                {},
                            ],
                        ],
                    },
                }
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    miniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader',
                ],
            },
            {
                test: /\.css$/i,
                use: [
                    miniCssExtractPlugin.loader,
                    'css-loader',
                ],
            },
        ],
    },
    optimization: {
        minimize: true,
        minimizer: [
            new terserPlugin({
                terserOptions: {
                    mangle: true,
                    compress: {
                        drop_console: false,
                        drop_debugger: true,
                        arguments: true,
                        dead_code: true,
                    },
                    format: {
                        comments: false,
                    },
                },
                extractComments: false,
            }),
            new cssMinimizerPlugin({
                minify: cssMinimizerPlugin.cssnanoMinify,
            }),
        ],
    },
    plugins: [
        new miniCssExtractPlugin({
            filename: 'css/[name].css',
        }),
    ],
    resolve: {
        alias: {
        },
        fallback: {
        },
        extensions: ['.js', '.json', '.css', 'scss',],
    },
    target: 'web',
    performance: {
        maxEntrypointSize: 1000000,
        maxAssetSize: 1000000,
    },
}

module.exports = webConfig;