const { merge } = require('webpack-merge')
const commonConfig = require('./webpack.common')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const mode = process.env.NODE_ENV === 'production' ? 'production' : 'development'

const prodConfig = {
    mode,
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    // 压缩css文件，需配置的loader
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1
                        }
                    },
                    'postcss-loader'
                ]
            },
            {
                test: /\.styl(us)$/,
                use: [
                    // 压缩css文件，需配置的loader
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 2
                        }
                    },
                    'postcss-loader',
                    'stylus-loader'
                ]
            }
        ]
    },
    optimization: {
        minimizer: [
            // 在 webpack@5 中，你可以使用 `...` 语法来扩展现有的 minimizer（即 `terser-webpack-plugin`），将下一行取消注释
            // `...`,
            new CssMinimizerPlugin(),
            // 这将仅在生产环境开启 CSS 优化。
            // 如果还想在开发环境下启用 CSS 优化，请将 optimization.minimize 设置为 true:
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            // 决定输出的每个 CSS 文件的名称
            filename: 'css/[name].[contenthash:8].css',

            // 决定非入口的 chunk 文件名称,仅在 webpack@5 下可用
            chunkFilename: 'css/[name].[contenthash:8].chunk.css'
        })
    ],
    output: {
        filename: 'js/[name].[contenthash:8].js',
        chunkFilename: 'js/[name].[contenthash:8].chunk.js'
    }
}

module.exports = merge(commonConfig, prodConfig)
