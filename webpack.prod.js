const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const merge = require('webpack-merge');
const common = require('./webpack.common.js');


const loaders = {
    css: {
        loader: 'css-loader',
        options: {
            minimize: true,
        },
    },
    postcss: {
        loader: 'postcss-loader',
        options: {
            plugins: (loader) => [
                require('autoprefixer'),
            ],
        },
    },
    sass: {
        loader: 'sass-loader',
        options: {
            minimize: true,
        },
    },
};

module.exports = merge.smart(common, {
    mode: 'production',

    optimization: {
        minimizer: [
            new UglifyJsPlugin({
                cache: true,
                parallel: true,
            }),
            new OptimizeCSSAssetsPlugin({}),
        ]
    },

    module: {
        rules: [
            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    loaders.css,
                    loaders.postcss,
                    loaders.sass,
                ],
            },
        ]
    }
});