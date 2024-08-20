const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");

const merge = require('webpack-merge');
const common = require('./webpack.common.js');

const loaders = {
  css: {
    loader: 'css-loader',
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
  },
};

module.exports = merge.smart(common, {
  mode: 'production',

  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin(),
      new CssMinimizerPlugin(),
    ],
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
    ],
  },
});
