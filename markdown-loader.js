// ./markdown-loader.js
module.exports = source => {
    // 加载到的模块内容 => '# About\n\nthis is a markdown file.'
    console.log('loader')
    // 返回值就是最终被打包的内容
    // return 'hello loader ~'
    return 'console.log("hello loader ~")'
  }