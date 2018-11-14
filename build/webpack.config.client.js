const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const HTMLPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const merge = require('webpack-merge')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const baseConfig = require('./webpack.config.base')
const VueClientPlugin = require('vue-server-renderer/client-plugin')
const isDev = process.env.NODE_ENV === 'development'

const devServer = {
  port: 8000,
  host: '0.0.0.0',
  overlay: {
    errors: true
  },
  headers: { 'Access-Control-Allow-Origin': '*' },
  historyApiFallback: {
    index: '/index.html'
  },
  hot: true,
  proxy: {
    '/api': {
      // 目标接口域名
      target: 'http://localhost:3333',
      // 是否跨域
      changeOrigin: true,
      pathRewrite: {
        // 重写接口
        '^/api': '/api'
      }
    },
    '/user': {
      // 目标接口域名
      target: 'http://localhost:3333',
      // 是否跨域
      changeOrigin: true,
      pathRewrite: {
        // 重写接口
        '^/user': '/user'
      }
    }
  }
}

const defaultPlugins = [
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: isDev ? '"development"' : '"production"'
    }
  }),
  new VueLoaderPlugin(),
  new HTMLPlugin({
    title: 'Todos',
    template: path.resolve(__dirname,'template.html')
  })
  ,
  new VueClientPlugin() //生成vue-ssr-client-manifest.json 文件
]

let config

if (isDev) {
  config = merge(baseConfig, {
    devtool: '#cheap-module-eval-source-map',
    module: {
      rules: [{
        test: /\.scss$/,
        use: ['vue-style-loader', 'css-loader', 'postcss-loader', 'sass-loader']
      }]
    },
    devServer,
    plugins: defaultPlugins.concat([
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoEmitOnErrorsPlugin()
    ])
  })
} else {
  config = merge(baseConfig, {
    entry: {
      app: path.resolve(__dirname, '../client/client-entry.js'),
      vendor: ['vue']
    },
    output: {
      filename: '[name].[chunkhash:8].js',
      publicPath: '/public/'
    },
    module: {
      rules: [{
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader']
      }]
    },
    plugins: defaultPlugins.concat([
      new MiniCssExtractPlugin({ filename: 'style.[contenthash:8].css' })
    ])
  })
}

module.exports = config
