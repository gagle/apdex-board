const path = require('path');
const webpack = require('webpack');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: {
    main: path.resolve(__dirname, 'src/index.ts'),
    polyfills: path.resolve(__dirname, 'src/polyfills.ts')
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist')
  },
  resolve: {
    extensions: ['.js', '.ts', '.scss'],
    plugins: [new TsconfigPathsPlugin()]
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
      template: path.resolve(__dirname, 'src/index.html'),
      chunks: ['polyfills', 'main'],
      chunksSortMode: 'manual'
    }),
    new MiniCssExtractPlugin({
      filename: 'styles.css',
      chunkFilename: '[id].css'
    }),
    new webpack.HotModuleReplacementPlugin()
  ],
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: true
            }
          },
          'css-loader',
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
              sassOptions: {
                includePaths: [
                  path.resolve(__dirname, 'node_modules'),
                  path.resolve(__dirname, 'src/styles/abstracts')
                ]
              }
            }
          }
        ]
      }
    ]
  }
};
