const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const autoprefixer = require('autoprefixer');


module.exports = {
    entry: [
        __dirname + "/src/app/index.js",
        __dirname + "/src/style/index.scss"
    ],
    output: {
        path: __dirname + '/dist',
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: 'babel-loader',
            },
            {
                test: /\.(sass|scss)$/,
                use:  [
                    {
                        loader: MiniCssExtractPlugin.loader
                    },
                    {
                        loader: "css-loader"
                    },
                    {
                      loader: "sass-loader"
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: [
                                autoprefixer({
                                    browsers:['ie >= 8', 'last 4 version']
                                })
                            ],
                            sourceMap: true
                        }
                    },
                ]
            },
            {
                test: /\.jpe?g$|\.gif$|\.png$|\.svg$|\.woff$|\.ttf$|\.wav$|\.ico$|\.mp3$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: 'assets'
                        },
                    },
                    'img-loader',
                ]
            },
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'app.css',
        }),
        new CopyWebpackPlugin([{
            from: __dirname + '/src/public/assets',
            to: __dirname + '/dist/assets'
        }]),
        new HtmlWebpackPlugin({
            template: __dirname + "/src/public/index.html",
            inject: 'body',
            title: "amethyst"
        })
    ],
    devServer: {
        contentBase: './src/public',
        port: 3000,
    }
};