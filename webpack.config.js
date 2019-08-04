const path = require('path')
const webpack = require('webpack')

const HtmlWebpackPlugin = require('html-webpack-plugin')

const NODE_MODULES = path.resolve(__dirname, 'node_modules')
const EXTERNALS = path.resolve(__dirname, 'externals')
const STORAGE = path.resolve(__dirname, '__storage__')
const EXCLUDE_DEFAULT = [NODE_MODULES, EXTERNALS, STORAGE]

const SRC = path.resolve(__dirname, 'src')

const { NODE_ENV } = process.env
const MODE = NODE_ENV !== 'development' ? 'production' : 'development'

console.log('::: MODE:', MODE)

module.exports = {
    mode: MODE,
    entry: {
        'smart-web-client': [
            'core-js/stable',
            'regenerator-runtime/runtime',
            'whatwg-fetch',
            SRC,
        ],
    },
    output: {
        filename: '[name].min.js',
        library: 'SMART_WEB_CLIENT',
        libraryTarget: 'var',
    },
    devtool: 'source-map',
    module: {
        rules: [
            {
                test: /\.js$/,
                include: SRC,
                exclude: EXCLUDE_DEFAULT,
                use: { loader: 'babel-loader' },
            },
        ],
    },
    plugins: [
        new webpack.WatchIgnorePlugin(EXCLUDE_DEFAULT),
        new webpack.DefinePlugin({
            MODE: JSON.stringify(MODE),
            'process.env.NODE_ENV': JSON.stringify(NODE_ENV),
        }),
        new HtmlWebpackPlugin(),
    ],
    devServer: {
        stats: 'errors-only',
        watchOptions: {
            aggregateTimeout: 300,
            poll: 1000,
            ignored: EXCLUDE_DEFAULT,
        },
    },
}
