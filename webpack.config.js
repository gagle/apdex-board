const path = require('path');
const webpack = require('webpack');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const {
  CleanWebpackPlugin
} = require('clean-webpack-plugin');

const isDevEnvironment = () => process.env.NODE_ENV === 'development';

const plugins = [
  new CleanWebpackPlugin(),
  new HtmlWebPackPlugin({
    inject: true,
    template: path.resolve(__dirname, 'src/index.html')
  }),
  new MiniCssExtractPlugin({
    filename: '[name].css',
    chunkFilename: '[id].css',
  }),
  new webpack.HotModuleReplacementPlugin()
];

module.exports = {
  mode: 'development',
  entry: [path.resolve(__dirname, 'src/index.ts')],
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
  resolve: {
    extensions: ['.js', '.ts']
  },
  devServer: {
    hot: true,
    port: 3000
  },
  devtool: 'inline-source-map',
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebPackPlugin({
      inject: true,
      template: path.resolve(__dirname, 'src/index.html')
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css',
    }),
    new webpack.HotModuleReplacementPlugin()
  ],
  module: {
    rules: [{
      test: /\.ts$/,
      use: 'ts-loader',
      exclude: /node_modules/
    }, {
      test: /\.scss$/,
      use: [{
        loader: MiniCssExtractPlugin.loader,
        options: {
          esModule: true,
          hmr: isDevEnvironment(),
        },
      }, 'sass-loader'],
    }]
  }
};
