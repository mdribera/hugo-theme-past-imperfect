const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");

const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

const loaders = {
  css: {
    loader: 'css-loader',
  },
  postcss: {
    loader: 'postcss-loader',
    options: {
      postcssOptions: { plugins: (loader) => [require('autoprefixer')({ grid: true })], },
    },
  },
  sass: {
    loader: 'sass-loader',
  },
};

module.exports = merge(common, {
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
