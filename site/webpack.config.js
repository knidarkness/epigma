const webpack = require('webpack');
const path = require('path');

const BUILD_DIR = path.resolve(__dirname, './build/');
const APP_DIR = path.resolve(__dirname, './src/');

const config = {
    entry: [
        APP_DIR + '/app.js'
    ],
    output: {
        path: BUILD_DIR,
        filename: 'bundle.js'
    },
    devtool: 'source-map',
    resolve: {
        modules: [
          path.resolve('./src'),
          path.resolve('./node_modules')
        ]
    },
    module: {
        rules:
        [
            {
                test: /\.jsx?/,
                include: APP_DIR,
                loader: "babel-loader",
                query:
                    {
                        presets:['react']
                    }
            },
            {
                test: /\.scss$/,
                use: [{
                    loader: "style-loader" // creates style nodes from JS strings
                }, {
                    loader: "css-loader" // translates CSS into CommonJS
                }, {
                    loader: "sass-loader" // compiles Sass to CSS
                }]
            }
        ]
    }
};

module.exports = config;
