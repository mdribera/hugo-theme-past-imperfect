const path = require('path');

const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");

const devMode = process.env.NODE_ENV !== 'production';

const srcPath = path.resolve(__dirname, 'src');
const loaders = {
  css: {
    loader: 'css-loader',
    options: {
      sourceMap: devMode,
    },
  },
  postcss: {
    loader: 'postcss-loader',
    options: {
      postcssOptions: { plugins: (loader) => [require('autoprefixer')({ grid: true })], },
      sourceMap: devMode,
    },
  },
  sass: {
    loader: 'sass-loader',
    options: {
      sourceMap: devMode,
    },
  },
};

module.exports = {
  entry: {
    main: [
      path.resolve(srcPath, 'js/index.js'),
      path.resolve(srcPath, 'style/index.scss'),
    ],
    photoswipe: path.resolve(srcPath, 'js/init-photoswipe.js'),
  },

  devtool: devMode ? 'eval-source-map' : false,

  optimization: {
    minimize: devMode,
    minimizer: [
      new TerserPlugin(),
      new CssMinimizerPlugin(),
    ],
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          loaders.css,
          loaders.postcss,
          loaders.sass,
        ],
      },
      {
        test: /\.(gif|png|svg|eot|ttf|otf|woff2?)$/,
        type: 'asset/resource',
        dependency: { not: ['url'] },
      },
    ],
  },

  plugins: [
    new CleanWebpackPlugin({ verbose: true }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css',
    }),
  ],

  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'static'),
    publicPath: '/',
  },
};
