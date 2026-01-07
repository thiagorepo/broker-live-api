const path = require('path');
const webpack = require('webpack');

module.exports = {
    mode: 'production',
    devtool: 'source-map',
    entry: ['./src/index.js'],
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production'),
            },
        }),
    ],
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                include: path.join(__dirname, 'src'),
            },
        ],
    },
    output: {
        library: 'binary-live-api',
        libraryTarget: 'umd',
        path: path.resolve(__dirname, 'lib'),
        filename: 'binary-live-api.js',
    },
};
