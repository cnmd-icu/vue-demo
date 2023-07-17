const path = require('path');
const { VueLoaderPlugin } = require('vue-loader')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const isProduction = process.env.NODE_ENV === 'production'
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');

module.exports = {
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                options: {
                    presets: [
                        [
                            '@babel/preset-env',
                            {
                                useBuiltIns: 'usage',
                                corejs: { version: 3 },
                                targets: {
                                    chrome: '60',
                                    firefox: '50'
                                }
                            }
                        ]
                    ],
                    // 开启babel缓存
                    // 第二次构建时，会读取之前的缓存
                    cacheDirectory: true
                }
            },
            {
                test: /\.(ttf|woff|woff2|eto|svg)$/,
                exclude: path.resolve(__dirname, '../src/assets/img'),
                type: 'asset',
                parser: {
                    dataUrlCondition: {
                        //如果一个模块源码大小小于 maxSize，那么模块会被作为一个 Base64 编码的字符串注入到包中， 否则模块文件会被生成到输出的目标目录中。
                        maxSize: 4 * 1024 // 4kb
                    }
                },
                generator: {
                    filename: isProduction
                        ? 'static/fonts/[name].[contenthash:8][ext]'
                        : 'static/fonts/[name][ext]'
                }
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/,
                exclude: path.resolve(__dirname, '../src/assets/fonts'),
                type: 'asset',
                parser: {
                    dataUrlCondition: {
                        maxSize: 4 * 1024
                    }
                },
                generator: {
                    filename: isProduction ?
                        'static/img/[name].[contenthash:8][ext]' :
                        'static/img/[name][ext]'
                }
            },
            {
                test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)$/,
                type: 'asset/resource',
                generator: {
                    filename: isProduction ?
                        'static/video/[name].[contenthash:8][ext]' :
                        'static/video/[name][ext]'
                }
            }, {
                test: /\.vue$/,
                loader: 'vue-loader'
            }
        ]
    },// 模块
    externals: {
        'vue': 'vue',
    },
    // 排除不打包的文件
    plugins: [
        new webpack.DllReferencePlugin({
            manifest: path.join(__dirname, '/dll/vue.manifest.json') // 指向生成的manifest.json
        }),
        new AddAssetHtmlPlugin([
            {
                filepath: path.join(__dirname, '/dll/vue.dll.529fbe27.js'), // 对应的 dll 文件路径
                outputPath: 'dll',   // 输出到build目录下的dll文件夹下,不设置的话默认输出到build下，比较乱;下面vendors同理
                publicPath: `${process.env.REACT_APP_PUBLICPATH || './'}dll`,// publicPath是用来修改引用路径的，默认是引用build下的文件，但是我们输出到dll下了，所以需要设置这个值;下面vendors同理
            },
        ]),
        new VueLoaderPlugin(),
        new webpack.DefinePlugin({
            __VUE_OPTIONS_API__: true,
            __VUE_PROD_DEVTOOLS__: false
        }),
        new HtmlWebpackPlugin({
            inject: true,
            template: path.resolve(__dirname, '../public/index.html'),
            title: 'This is a template'
        }),
        new CopyPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, '../public'),
                    to: path.resolve(__dirname, '../dist'),
                    filter: (resourcePath) => {
                        if (resourcePath.includes('/public/index.html')) {
                            return false
                        }

                        return true
                    }
                }
            ]
        })
    ],// 插件
    entry: {
        main: path.resolve(__dirname, '../src/main.js')
    },// 入口文件
    output: {
        clean: true,// 清理dist文件夹
        path: path.resolve(__dirname, '../dist')
    },// 出口文件
    resolve: {
        alias: {
            '@': path.resolve(__dirname, '../src'),
            '@assets': path.resolve(__dirname, '../src/assets')
        },
        extensions: ['.js', '.vue']// 自动解析确定的扩展
    },// 配置别名
}
