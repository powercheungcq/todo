const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const HTMLPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const merge = require('webpack-merge')
const baseConfig = require('./webpack.config.base')

const devServer = {
  port: 8080,
  host: '0.0.0.0',
  overlay: {
    errors: true
  },
  hot: true
}

const defaultPlugins = [
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: '"development"'
    }
  }),
  new VueLoaderPlugin(),
  new HTMLPlugin({
    template: path.resolve(__dirname, 'template.html')
  })
]

let config

config = merge(baseConfig, {
  entry: path.resolve(__dirname, '../practice/index.js'),
  devtool: '#cheap-module-eval-source-map',
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          'vue-style-loader', 'css-loader', 'postcss-loader', 'sass-loader'] // vue-style-loader --- css热更替
      }
    ]
  },
  devServer,
  resolve: {
    alias: {
      'vue': path.resolve(__dirname, '../node_modules/vue/dist/vue.esm.js')
    }
  },
  plugins: defaultPlugins.concat([
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ])
})

module.exports = config
