const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

let minimizeOptions = {
    conservativeCollapse     : true,
    preserveLineBreaks       : true,
    preventAttributesEscaping: true,
};

module.exports = {
    entry: {
        app: path.join(__dirname, 'source', 'module.js'),
        vendors:Object.keys(require(path.join(__dirname, 'package.json')).dependencies)
    },
    devtool: 'inline-source-map',
    output: {
        filename: path.join('bundle','[name].bundle.js'),
        path: __dirname,
        publicPath: '/static/'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                include: path.join(__dirname, 'source'),
                use: [
                    {
                        loader: 'ng-annotate-loader'
                    },{
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            'env'
                        ],
                        cacheDirectory: true
                    }
                }]
            },
            {
                test   : /\.html$/,
                exclude: /base\.html/,
                use    : [
                    {
                        loader: 'ng-cache-loader?[dir]/[dir]&minimizeOptions=' + JSON.stringify(minimizeOptions)
                    }
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            inject: false,
            template: path.join('source','templates','base.html.ejs'),
            filename: path.join('templates', 'base.html')
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendors',
            filename:  path.join('bundle','vendors.bundle.js')
        })
    ]
};