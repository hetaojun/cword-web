const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: ['whatwg-fetch', path.join(__dirname, 'js', 'app.js')],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
  devServer: {
    contentBase: path.resolve(__dirname, 'dist'),
    host: 'localhost',
    port: 4444,
    proxy: {
      '/graphql': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        host: 'http://localhost:5000',
      },
    },
    // template: path.join(__dirname, 'dist/index.html'),
  },
  plugins: [
    // new CleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({
      title: '开发环境',
      template: 'dist/index.html',
    }),
  ],
  output: {
    filename: 'app.js',
    path: path.resolve(__dirname, 'dist'),
    // publicPath: '/',
  },
};
