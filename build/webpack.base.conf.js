const path = require( 'path' )
// 引入插件
const HTMLWebpackPlugin = require('html-webpack-plugin')
// 清理 dist 文件夹
const CleanWebpackPlugin = require('clean-webpack-plugin')
// 抽取 css
const ExtractTextPlugin = require('extract-text-webpack-plugin')
// 引入多页面文件列表
const config = require('./config')
// 引入merge插件
const merge = require('webpack-merge')
// 拿到生产环境配置
const productionConfig = require('./webpack.prod.conf')
// 拿到开发环境配置
const developmentConfig = require('./webpack.dev.conf')


const generateConfig = env => {

  const styleLoader = ExtractTextPlugin.extract({
    fallback: 'style-loader',
    use: [
      {
        loader: 'css-loader'
      },
      {
        loader: 'postcss-loader',
        options: {
          ident: 'postcss',
          plugins: [
            require('cssnano')(),
            require('postcss-cssnext')()
          ]
        }
      },
      {
        loader: 'sass-loader'
      }
    ]
  })

  const imgLoader = [
    {
      loader: 'url-loader',
      options: {
        limit: 5000,
        name: '[name].[hash:5]-min.[ext]'
      }
    }
  ]

  return {
    entry: {
      index: '../src/js/index'
    },
    output: {
      path: path.resolve(__dirname, '../dist'),
      filename: 'js/[name]_[hash:7].js',
      publicPath: '/',
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          use: ['babel-loader']
        },
        {
          test: /\.scss$/,
          use: styleLoader
        },
        {
          test: /\.(png|jpg|jepg|gif)$/,
          use: imgLoader
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/,
          use: imgLoader
        }
      ]
    },
    plugins: [
      new HTMLWebpackPlugin({
        template: '../src/index',
        filename: 'index.html'
      }),

      new ExtractTextPlugin({
        filename: 'css/[name]_[hash:7].css',
        allChunks: true
      })
    ]
  }
}


module.exports = env => {
  let config = env === 'production'
    ?productionConfig
    :developmentConfig
  return merge(generateConfig(env), config)
}