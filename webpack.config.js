const webpack = require('webpack');
const path = require('path');
const ENV = process.env.NODE_ENV || 'dev';
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = [

    {

        entry: [
            __dirname + "/frontend/scss/main.scss",
            __dirname + "/frontend/js/main",
        ],
        output: {
            path: path.resolve(__dirname, "public"),
            filename: "[name].js",
            publicPath: "/",
            library: "app"
        },

        watch: process.env.NODE_ENV === 'dev',
        watchOptions: {
            aggregateTimeout: 100
        },

        devtool: ENV === 'dev' ? 'sourcemap' : null,
        plugins: [
            new webpack.NoEmitOnErrorsPlugin(),
            new webpack.DefinePlugin({
                NODE_ENV: JSON.stringify(ENV),
                DEV: process.env.NODE_ENV === 'dev'
            }),
            new ExtractTextPlugin({filename: 'style.css', allChunks: true}),
            new webpack.HotModuleReplacementPlugin()
        ],

        module: {
            loaders: [
                {
                    test: /\.js$/,
                    exclude: /\/node_modules\//,
                    loader: 'babel-loader'
                },
                {
                  test:   /\.(pug|jade)$/,
                   loader: 'jade-loader'
                },
                {
                    test: /\.scss/,
                    loader: ExtractTextPlugin.extract({
                        use: 'css-loader!autoprefixer-loader!sass-loader'
                    })
                },
                {
                    test: /\.(png|jpg|svg|gif|ttf|eot|woff|woff2)$/,
                    loader: 'file-loader?name=[path][name].[ext]'
                },

            ],
            //noParse
        },
        devServer: {
            contentBase: __dirname + '/public'
        }
    }];