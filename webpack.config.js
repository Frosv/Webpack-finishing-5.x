// ./webpack.config.js
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const {
  CleanWebpackPlugin
} = require('clean-webpack-plugin')

const CheckImagesSize = require('./check-images-size')
// 提取css文件 减少js文件体积
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
// 提前css文件无法压缩
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

const TerserWebpackPlugin = require('terser-webpack-plugin')

module.exports = {
  /**
   * 我使用框架的情况会比较多，以 React 和 Vue.js 为例，无论是 JSX 还是 vue 单文件组件，Loader 转换后差别都很大，我需要调试 Loader 转换前的源代码。
   *  一般情况下，我编写的代码每行不会超过 80 个字符，对我而言能够定位到行到位置就够了，而且省略列信息还可以提升构建速度。
   * 虽然在这种模式下启动打包会比较慢，但大多数时间内我使用的 webpack-dev-server 都是在监视模式下重新打包，它重新打包的速度非常快。
   *  */
  devtool: 'eval-cheap-module-source-map',
  mode: 'none',

  // 多入口文件打包
  // entry: {
  //   index: './src/main.js',
  //   about: './src/index.html'
  // },
  entry: './src/main.js',
  output: {
    filename: 'bundle.js'
  },
  plugins: [
    new CheckImagesSize(),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: 'Webpack Plugin Sample'
    }),
    // 多文件入口打包
    // new HtmlWebpackPlugin({
    //   title: 'Multi Entry',
    //   template: './src/index.html',
    //   filename: 'index.html',
    //   chunks: ['index'] // 指定使用 index.bundle.js
    // }),
    // new HtmlWebpackPlugin({
    //   title: 'Multi Entry',
    //   template: './src/album.html',
    //   filename: 'album.html',
    //   chunks: ['album'] // 指定使用 album.bundle.js
    // })
    new CopyWebpackPlugin({
      patterns: ['public'] // 需要拷贝的目录或者路径通配符
    }),
    // HMR 特性所需要的插件
    new webpack.HotModuleReplacementPlugin(),
    // DefinePlugin，DefinePlugin 是用来为我们代码中注入全局成员的
    new webpack.DefinePlugin({
      API_BASE_URL: '"https://api.example.com"'
    }),
    new MiniCssExtractPlugin() //提取css css超过200kb才提取
  ],
  devServer: {
    // 开启 HMR 特性，如果资源不支持 HMR 会 fallback 到 live reloading
    hot: true
    // 只使用 HMR，不会 fallback 到 live reloading
    // hotOnly: true
  },
  module: {
    rules: [{
      test: /\.md$/,
      // 直接使用相对路径
      use: './markdown-loader'
    }, {
      test: /\.vue$/,
      loader: 'vue-loader',
      // 官方给出得方案是禁用掉hot reload
      options: {
        hotReload: false // disables Hot Reload
      }
    }, {
      test: /\.css$/,
      // 对同一个模块使用多个 loader，注意顺序
      use: [
        // 'style-loader',
        MiniCssExtractPlugin.loader, // 提取css
        'css-loader'
      ]
    }],

  },
  // Tree Shaking 整理代码 未使用代码将移除
  optimization: {
    // 模块只导出被使用的成员
    usedExports: true,
    // 尽可能合并每一个模块到一个函数中
    concatenateModules: true,
    // 压缩输出结果
    minimize: true,

    /**
     * Tree-shaking 只能移除没有用到的代码成员，而想要完整移除没有用到的模块，那就需要开启 sideEffects 特性了。
     * webpack.config.js 中的 sideEffects 用来开启这个功能；
     * package.json 中的 sideEffects 用来标识我们的代码没有副作用。
     * 尽可能不要写影响全局的副作用代码。
     */
    sideEffects: true,
    splitChunks: {
      // 自动提取所有公共模块到单独 bundle
      chunks: 'all'
    },
    minimizer: [
      // For webpack@5 you can use the `...` syntax to extend existing minimizers (i.e. `terser-webpack-plugin`), uncomment the next line
      // `...`,
      new TerserWebpackPlugin(),
      new CssMinimizerPlugin(),
    ],
  }
}