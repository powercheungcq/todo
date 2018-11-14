const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const HTMLPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const isDev = process.env.NODE_ENV === 'development'
const config = {
  target: 'web',
  entry: path.join(__dirname, '../src/main.js'),
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, 'dist')
  },
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.(jsx|js)$/,
        loader: 'babel-loader'

      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader', 'postcss-loader']
      },
      {
        test: /\.(jpg|png|gif|jpeg|svg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 1024,
              name: 'resource/[path][name]-[hash:8].[ext]'
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: isDev ? '"development"' : '"production"'
      }
    }),
    new VueLoaderPlugin(),
    new HTMLPlugin({
      title: 'Todos'
    })
  ]
}

if (isDev) {
  config.module.rules.push({
    test: /\.scss$/,
    use: ['vue-style-loader', 'css-loader', 'postcss-loader', 'sass-loader']
  })
  config.devtool = '#cheap-module-eval-source-map'
  config.devServer = {
    port: 8000,
    host: '0.0.0.0',
    overlay: {
      errors: true
    },
    hot: true
  }
  config.plugins.push(
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  )
} else {
  config.output.filename = '[name].[chunkhash:8].js'
  config.module.rules.push({
    test: /\.scss$/,
    use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader']
  })
  config.plugins.push(
    new MiniCssExtractPlugin({ filename: 'style.[contenthash:8].css' })
  )
}

module.exports = config
