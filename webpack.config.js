const path = require('path')
const webpack = require('webpack')

const HtmlWebpackPlugin = require('html-webpack-plugin')

const pkg = require('./package.json')

const NODE_MODULES = path.resolve(__dirname, 'node_modules')
const EXTERNALS = path.resolve(__dirname, 'externals')
const STORAGE = path.resolve(__dirname, '__storage__')
const EXCLUDE_DEFAULT = [NODE_MODULES, EXTERNALS, STORAGE]

const SRC = path.resolve(__dirname, 'src')

const { NODE_ENV } = process.env
const MODE = NODE_ENV !== 'development' ? 'production' : 'development'

console.log('::: MODE:', MODE)

const config = {
    mode: MODE,
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
    ],
}

module.exports = [
    {
        ...config,
        entry: {
            'smart-web-client': [
                'core-js/stable',
                'regenerator-runtime/runtime',
                'whatwg-fetch',
                `${SRC}/client`,
            ],
        },
        output: {
            filename: '[name].js',
            library: 'SMART_WEB_CLIENT',
            libraryTarget: 'var',
        },
    },
    {
        ...config,
        entry: {
            demo: [
                'core-js/stable',
                'regenerator-runtime/runtime',
                'whatwg-fetch',
                `${SRC}/demo`,
            ],
        },
        plugins: [
            ...config.plugins,
            new webpack.DefinePlugin({
                'process.env.NODE_ENV': JSON.stringify(NODE_ENV),
                APP_NAME: JSON.stringify(pkg.name).replace(/['"]+/g, ''),
                MODE: JSON.stringify(pkg.version),
            }),
            new HtmlWebpackPlugin({
                filename: 'index.html',
                template: `${SRC}/index.ejs`,
                hash: true,
            }),
            new HtmlWebpackPlugin({
                filename: 'launch.html',
                template: `${SRC}/index.ejs`,
                hash: true,
            }),
        ],
        devServer: {
            stats: 'errors-only',
            watchOptions: {
                aggregateTimeout: 300,
                poll: 1000,
                ignored: EXCLUDE_DEFAULT,
            },
        },
    },
]
