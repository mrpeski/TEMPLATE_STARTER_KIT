var webpack = require("webpack");
var path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const devMode = process.env.NODE_ENV !== 'production';
const projectName = "project";
const devPaths = require("./devSetup");


module.exports = {
    // mode: "development",
    mode: "production",
    // devtool: "source-map",
    entry: {
        site: [devPaths[projectName].entry.front, devPaths[projectName]['entry']['js']],
        // admin: [devPaths[projectName].entry.dash]
    },
    output: {
        path: devPaths[projectName].output,
        filename: '[name].js',
        crossOriginLoading: 'anonymous',
    },
    module: {
        rules: [
            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                  false ? { loader: 'style-loader', options: { sourceMap: true } } : MiniCssExtractPlugin.loader,
                  { loader: 'css-loader', options: { sourceMap: true } },
                  { loader: 'postcss-loader', options: { sourceMap: true } },
                  { loader: 'sass-loader', options: { sourceMap: true } }
                ],
            },
            {
                  test: require.resolve('jquery-ui'),
                  use: 'imports-loader?$=jquery,define=>false'
            },
            {
                test: /\.jsx?$/,
                exclude: /node_modules\/(?!bootstrap)/,
                // loader: "babel-jest"
                loader: "babel-loader"
            },
            {
                enforce: "pre",
                test: /\.js$/,
                loader: "source-map-loader"
            },
            {
                test: /\.(png|jpe?g|gif|svg|eot|ttf|woff|woff2)$/,
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]'
                }
            },
            { test: /\.handlebars$/, loader: "handlebars-loader" }
        ]
    },
    resolve: {
        extensions: [ ".ts", ".tsx", "jsx", ".js", ".json", ".css", ".scss" ],
        modules: [ 'node_modules', path.resolve(__dirname, 'node_modules')]
    },

    plugins: [
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery',
            Popper: ['popper.js', 'default'],
        }),
        new MiniCssExtractPlugin({
            filename: "[name].css",
            chunkFilename: "[id].css"
          }),
        new BrowserSyncPlugin({
            host: 'localhost',
            port: 3000,
            files: [`./output_dev/**/*.html`, `./output_dev/**/*.css`, `./output_dev/**/*.js`],
            server: { baseDir: [`./output_dev`] }
            }),
    ],
    optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/](react|react-dom|jquery)[\\/]/,
          name: 'vendor',
          chunks: 'all',
        }
      },
        name: false
        }
    }
};
