var webpack = require('webpack');
var path = require('path');

module.exports = {
  devtool: 'eval-source-map',
  entry: [
    'babel-polyfill',
    'webpack/hot/only-dev-server',
    path.join(__dirname, '/client/components/App.jsx')
  ],
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  output: {
    path: path.join(__dirname, '/public/'),
    filename: 'app.js',
    publicPath: '/client'
  },
  module: {
    loaders: [{
      test: /\.jsx?$/,
      include: path.join(__dirname, '/client/components/'),
      loaders: ['react-hot-loader', 'babel-loader']
    }]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ]
};
