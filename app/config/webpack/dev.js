const Dotenv = require('dotenv-webpack');
const common = require('./base');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const outputDirectory = '../../dist';

module.exports = {
  ...common,
  mode: 'development',
  devServer: {
    port: 3000,
    historyApiFallback: true,
    open: true
  },
  plugins: [
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: [outputDirectory],
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html'
    }),
    new Dotenv()
  ]
};
