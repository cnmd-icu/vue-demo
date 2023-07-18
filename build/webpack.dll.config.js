const path = require('path');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');// 最好每次清理一下
const CompressionPlugin = require("compression-webpack-plugin");
const mode = process.env.NODE_ENV === 'production' ? 'production' : 'development'

module.exports = {
    mode,
    entry: {
        vue: ['vue']
    },
    output: {
        filename: "[name]/[name].[chunkhash].dll.js",
        path: path.join(__dirname, "dll"),
        library: "[name]",
        libraryTarget: "umd"
    },
    plugins: [
        new CleanWebpackPlugin(),
        new webpack.DllPlugin({
            path: path.join(__dirname, "/dll/[name]", "[name].[chunkhash].manifest.json"),
            name: "[name]"
        }),

        new CompressionPlugin({
            algorithm: 'gzip',         //算法
            test: new RegExp(
                '\\.(js|css)$'        //压缩 js 与 css
            ),
            threshold: 10240,          //只处理比这个值大的资源。按字节计算
            minRatio: 0.8              //只有压缩率比这个值小的资源才会被处理
        })
    ]
};

