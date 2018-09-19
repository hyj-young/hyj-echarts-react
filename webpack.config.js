const path = require('path');
 const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    app: './src/test.js'
  },
  devtool: 'inline-source-map',
  plugins: [
    new CleanWebpackPlugin(['test']),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin()
  ],
  module: {
    rules: [
      { 
        test: /\.js$/, 
        exclude: /node_modules/, 
        loader: "babel-loader" 
      },
      { 
        test: /\.less$/, 
        exclude: /node_modules/, 
        use: ['style-loader', 'css-loader', 'less-loader']
      },
    ]
  },
  output: {
    path: path.resolve(__dirname, 'test'),
    filename: 'test.js'
  },
  devServer: {
    contentBase: path.join(__dirname, "test"),
    compress: true,
    port: 9000,
    hot: true
  },
  mode: 'development'
};