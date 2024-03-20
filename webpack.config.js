const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin")

var config = {
    entry: './src/index.tsx',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'ts-loader',
                },
            },
            {
                test: /\.css$/,
                use: [
                  { loader: MiniCssExtractPlugin.loader },
                  { loader: 'css-loader', options: { modules: true } }
                ]
            }
        ],
    },
    resolve: {
        extensions: ['.js', '.jsx', '.ts', '.tsx']
    },
    devServer: {
        historyApiFallback: true,
    }
};

module.exports = (env, argv) => {
    config.plugins = [new HtmlWebpackPlugin({ template: "index.html", base: argv.mode == "production" ? false : "/" }), new MiniCssExtractPlugin()];

    return config;
}