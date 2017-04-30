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
                DEV: process.env.NODE_ENV === 'dev',
                API_URL: 'https://api.unsplash.com/',
                APP_KEY: '3d560770edd4ef0ce3a5646f418107014056e57e48137cc46450346d3476d674'
            }),
            new ExtractTextPlugin({filename: 'style.css', allChunks: true}),
            new webpack.HotModuleReplacementPlugin()
        ],

        module: {
            loaders: [
                {
                    test: /\.(png|jpg|svg|gif|ttf|eot|woff|woff2)$/,
                    loader: 'file-loader?name=[path][name].[ext]'
                },
                {
                    test: /\.js$/,
                    exclude: /\/node_modules\//,
                    loader: 'babel-loader?presets=env'
                },
                {
                  test:   /\.(pug|jade)$/,
                   loader: 'jade-loader'
                },
                {
                    test: /\.scss/,
                    loader: ExtractTextPlugin.extract({
                        use: 'css-loader!autoprefixer-loader!resolve-url-loader!sass-loader?sourceMap'
                    })
                },


            ],
            //noParse
        },
        devServer: {
            contentBase: __dirname + '/public'
        }
    }];