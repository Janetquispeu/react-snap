const path = require('path');
const pathClient = path.join(__dirname, './../../src');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const outputDirectory = '../../dist';

module.exports = {
  entry: './src/index.tsx',
  output: {
    path: path.join(__dirname, outputDirectory),
    filename: 'bundle.js',
    publicPath: '/'
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json'],
    alias: {
      '@app': pathClient
    }
  },
  module: {
    rules: [
      {
        test: /\.(jpe?g|png|svg|woff2|woff|ttf)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]'
            }
          }
        ]
      },
      {
        test: /\.(tsx|ts$)/,
        exclude: /node_modules/,
        use: [
          { loader: 'awesome-typescript-loader' },
          { loader: 'stylelint-custom-processor-loader' }
        ]
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '../'
            }
          },
          { loader: 'css-loader' }
        ]
      }
    ]
  }
}
