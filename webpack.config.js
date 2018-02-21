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
    module: {
        loaders: [
            {
                test: /\.jsx?/,
                include: APP_DIR,
                loader: "babel-loader",
                query:
                    {
                        presets:['react']
                    }
            }
        ]
    }
};

module.exports = config;