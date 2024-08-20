const path = require('path');

const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const srcPath = path.resolve(__dirname, 'src');
const loaders = {
  css: {
    loader: 'css-loader',
    options: {
      sourceMap: true,
    },
  },
  postcss: {
    loader: 'postcss-loader',
    options: {
      postcssOptions: { plugins: (loader) => [require('autoprefixer')({ grid: true })], },
      sourceMap: true,
    },
  },
  sass: {
    loader: 'sass-loader',
    options: {
      sourceMap: true,
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

  devtool: 'source-map',

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
        test: /\.(gif|png)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
        },
      },
      {
        test: /\.(svg|eot|ttf|otf|woff2?)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
          publicPath: '/',
          outputPath: './',
        },
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
    publicPath: '/static',
  },
};
