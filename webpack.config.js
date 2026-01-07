const path = require('path');
const webpack = require('webpack');

module.exports = {
    devtool: 'source-map',
    entry  : ['./src/index.js'],
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
                test   : /\.js$/,
                loader : 'babel-loader',
                include: path.join(__dirname, 'src'),
                options: {
                    babelrc: false,
                    presets: [
                        [
                            'env',
                            {
                                targets: {
                                    browsers: [
                                        'last 2 versions',
                                        'ios_saf >= 8',
                                        'not IE <= 10',
                                        'chrome >= 49',
                                        'firefox >= 49',
                                        '> 1%',
                                    ],
                                },
                                loose: true,
                            },
                        ],
                    ],
                    plugins: [
                        'transform-export-extensions',
                        'transform-object-rest-spread',
                        'transform-class-properties',
                        'transform-flow-strip-types',
                    ],
                },
            },
        ],
    },
    output: {
        library      : 'binary-live-api',
        libraryTarget: 'umd',
        path         : path.resolve(__dirname, 'lib'),
        filename     : 'binary-live-api.js',
    },
};
