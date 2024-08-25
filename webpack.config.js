const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const dirname = path.resolve();
module.exports = {
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/[name].css',
    }),
  ],
  entry: './src/index.js',
  output: {
    filename: 'js/main.js',
    path: path.resolve(dirname, 'dest/desktop'),
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
    ],
  },
  mode: 'development',
};
