const HtmlWebPackPlugin = require("html-webpack-plugin");
let path = require('path');
let glob = require("glob");
let entry = __dirname + "/src/index.js";
let outputPath = __dirname + "/dist/";

if (process.env.TESTBUILD) {
    entry = glob.sync(__dirname + "/test/**/*.test.js");
    outputPath = __dirname + "/test-dist/";
}

module.exports = {
    entry: entry,
    output: {
        filename: "bundle.js",
        path: outputPath,
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
                use: [
                    {
                        loader: "html-loader"
                    }
                ]
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"]
            },
        ]
    },
    devtool: "source-map",
    plugins: [
        new HtmlWebPackPlugin({
            template: "./dist/index.html",
            filename: "./index.html"
        })
    ]
};