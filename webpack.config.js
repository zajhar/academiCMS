var path = require('path');
var webpack = require('webpack');
var WebpackNotifierPlugin = require('webpack-notifier');

var generalApp = {
    entry: {
        index: [__dirname + '/web-app/apps/generalApp/index/index.js'],
        admin: [__dirname + '/web-app/apps/generalApp/admin/admin.js']
    },
    output: {
        path: __dirname + '/app/views/js',
        filename: '[name].js'
    },
    module: {
        noParse: [/polyfill\.min\.js$/],
        loaders: [{
            test: /\.(png|woff|woff2|eot|ttf|svg)(\?v=\d+\.\d+\.\d+)?$/,
            loader: 'url-loader?limit=100000'
        }, {
            test: /\.scss$/,
            loaders: ["style", "css", "sass"]
        }, {
            test: /\.css$/,
            loaders: ["style", "css"]
        }, {
            test: /\.js$/,
            exclude: /(node_modules|bower_components)/,
            loader: 'babel', // 'babel-loader' is also a legal name to reference
            query: {
                presets: ['es2015']
            }
        }, {
            test: /\.tpl.html$/,
            loader: 'html'
        }]
    },
    resolve: {
        root: path.resolve(__dirname, 'vendor'),
        alias: {
            angular: 'angular/angular.js'
        },
        extensions: ['', '.js']
    },
    plugins: [
        new WebpackNotifierPlugin({title: 'Master,', alwaysNotify: true})
        // new CompressionPlugin({
        //     asset: "[path].gz[query]",
        //     algorithm: "gzip",
        //     test: /\.js$|\.html$/,
        //     threshold: 10240,
        //     minRatio: 0.8
        // })
    ]
};

var subdomainApp = {
    entry: {
        subIndex: [__dirname + '/web-app/apps/subdomainApp/index/index.js'],
        subAdmin: [__dirname + '/web-app/apps/subdomainApp/admin/admin.js']
    },
    output: {
        path: __dirname + '/subdomainApp/app/views/js',
        filename: '[name].js'
    },
    module: {
        noParse: [/polyfill\.min\.js$/],
        loaders: [{
            test: /\.(png|woff|woff2|eot|ttf|svg)(\?v=\d+\.\d+\.\d+)?$/,
            loader: 'url-loader?limit=100000'
        }, {
            test: /\.scss$/,
            loaders: ["style", "css", "sass"]
        }, {
            test: /\.css$/,
            loaders: ["style", "css"]
        }, {
            test: /\.js$/,
            exclude: /(node_modules|bower_components)/,
            loader: 'babel', // 'babel-loader' is also a legal name to reference
            query: {
                presets: ['es2015']
            }
        }, {
            test: /\.tpl.html$/,
            loader: 'html'
        }]
    },
    resolve: {
        root: path.resolve(__dirname, 'vendor'),
        alias: {
            angular: 'angular/angular.js'
        },
        extensions: ['', '.js']
    },
    plugins: [
        new WebpackNotifierPlugin({title: 'Master,', alwaysNotify: true})
        // new CompressionPlugin({
        //     asset: "[path].gz[query]",
        //     algorithm: "gzip",
        //     test: /\.js$|\.html$/,
        //     threshold: 10240,
        //     minRatio: 0.8
        // })
    ]
};


module.exports = [subdomainApp];