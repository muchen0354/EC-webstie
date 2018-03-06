const webpack = require('webpack')


module.exports ={
  devServer: {
    port:8080,
    historyApiFallback: false,
    proxy: {}
  }
}