var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {

  entry: [
    './src/index.jsx'
  ],
  output: {
    path: __dirname + '/public',
    publicPath: '',
    filename: 'index.js'
  },
  module: {
    rules: [
      {
        enforce: "pre",
        test: /\.jsx?$/,
        include: [__dirname + '/src'],
        loader: "eslint-loader",
        options: {}
      },
      {
        test: /\.jsx?$/,
        include: [__dirname + '/src'],
        loader: "babel-loader",
      },
    ]
  },
  resolve: {
    extensions: [".jsx", ".js"],
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new HtmlWebpackPlugin({
        template: './index.html', // Load a custom template
        inject: 'body' // Inject all scripts into the body
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin()
  ],
  devServer: {
    contentBase: './public',
    hot: true,                //Live-reload
    inline: true,
    port: 3000,                //Port Number
    host: 'localhost',    //Change to '0.0.0.0' for external facing server
  },
  devtool: 'sourcemap'
}
