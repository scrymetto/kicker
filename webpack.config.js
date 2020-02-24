const HtmlWebPackPlugin = require("html-webpack-plugin");
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const path = require('path');

module.exports = {
    entry: __dirname + "/src/index.js",
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, 'build'),
        publicPath: '/'
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /\.html$/,
                use: [{
                    loader: "html-loader"
                }],
            },
            {
                test: /\.css$/,
                use: ["style-loader",
                    {loader: 'css-loader', options: {importLoaders: 1}},
                    {
                        loader: 'postcss-loader',
                        options: {
                            ident: 'postcss',
                            plugins: () => [
                                require('postcss-preset-env')(),
                            ],
                            sourceMap: true
                        }
                    }],
            },
        ],
    },
    devtool: "source-map",
    devServer: {
        historyApiFallback: true,
        host: '192.168.1.100',
        port: 8081,
        proxy: {
            '/api': {
                target: 'http://localhost:8080',
                pathRewrite: {'^/api': ''}
            },
        }
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: "./src/index.html",
            filename: "./index.html"
        }),
        new UglifyJsPlugin({
            sourceMap: true,
        }),
    ],
};