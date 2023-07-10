const path = require('path');
const webpack = require('webpack');

const webConfig = {
    mode: 'development',
    entry: {
        main: [
            'webpack-hot-middleware/client',
            path.resolve(__dirname, './src/Index.js'),
        ],
    },
    devtool: 'eval-source-map',
    output: {
        filename: 'js/[name].js',
        path: path.resolve(__dirname, './dist'),
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
                                {
                                },
                            ],
                        ],
                        plugins: [
                            [
                                '@babel/plugin-transform-react-jsx',
                                {
                                },
                            ],
                        ],
                    },
                }
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader',
                ],
            },
            {
                test: /\.css$/i,
                use: [
                    'style-loader',
                    'css-loader',
                ],
            },
        ],
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
    ],
    resolve: {
        alias: {
        },
        fallback: {
        },
        extensions: ['.js', '.json', '.css', 'scss',],
    },
    target: 'web',
}

module.exports = webConfig;