const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    // Entry
    entry: {
        index: path.resolve(__dirname, 'src', 'index.js')
    },
    // Output
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist'),
        // publicPath: './',
    },
    // Rules
    module: {
        rules: [
            // Css
            {
                test: /\.css$/,
                use: [
                    {
                        loader: 'style-loader'
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true,
                            minimize: true
                        }
                    }
                ]
            },
            // Scss
            {
                test: /\.scss$/,
                use: [
                    {
                        loader: 'style-loader'
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true,
                            minimize: true
                        }
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true
                        }
                    }
                ]
            },
            // Images
            {
                test: /\.(png|jpe?g|gif)$/,
                loader: 'url-loader?limit=8000&name=assets/images/[name].[ext]'
            },
            // Audio
            {
                test: /\.(mp3|ogg)$/,
                loader: 'file-loader?name=assets/audio/[name].[ext]'
            },
            // Fonts
            {
                test: /\.(svg|eot|woff|woff2|ttf)$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: 'fonts/',
                    }
                }]
            }
        ]
    },
    // Plugins
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            inject: true, // Inject js in to body tag
            template: path.resolve(__dirname, 'src', 'index.html')
        })
    ]
}