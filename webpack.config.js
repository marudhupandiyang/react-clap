var webpack = require('webpack')
var Visualizer = require('webpack-visualizer-plugin');

module.exports = {

  entry: [
    './src/index.jsx'
  ],
  output: {
    library: 'react-clap',
    libraryTarget: 'umd',
    path: __dirname + '/dist',
    publicPath: '/',
    filename: 'index.js'
  },

  externals: [
    {
      react: {
        root: 'React',
        commonjs2: 'react',
        commonjs: 'react',
        amd: 'react'
      }
    }
  ],
  module: {
    rules: [
      {
        enforce: "pre",
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: "eslint-loader",
        options: {}
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: "babel-loader"
      },
      {
        test: /\.scss$/,
        use: [{
            loader: "style-loader" // creates style nodes from JS strings
        }, {
            loader: "css-loader" // translates CSS into CommonJS
        }, {
            loader: "sass-loader" // compiles Sass to CSS
        }]
      }
    ]
  },
  resolve: {
    extensions: [".jsx", ".js", ".css"],
  },
  node: {
    Buffer: false
  },

  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new Visualizer()
  ]
}
