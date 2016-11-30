const CopyWebpackPlugin = require('copy-webpack-plugin');
const copy = require('./copy');

module.exports = {
  entry: './test/index.js',
  output: {
    filename: 'test.bundle.js',
    path: './dist/public/',
  },
  plugins: [
    new CopyWebpackPlugin(copy),
  ],
  resolve: {
    extensions: ['', '.js'],
  },
};
