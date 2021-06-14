// ./remove-comments-plugin.js

var colors = require('colors');

class CheckImagesSize {
  apply(compiler) {
    // console.log('compiler',compiler)
    compiler.hooks.emit.tap('CheckImagesSize', compilation => {
      console.log('plugins');
      console.log('\n');
      console.log('约定图片体积不得超过200KB');
      // compilation => 可以理解为此次打包的上下文
      for (const name in compilation.assets) {

        // console.log(name); // 检查css载入
        // 获取图片格式
        if (name.endsWith('.svg') || name.endsWith('.png') || name.endsWith('.jpg')) {

          // 获取大小 转换成KB
          const size = ((compilation.assets[name].size()) / 1024).toFixed(3)

          // 针对不同文件输出不一样的颜色
          if (size < 100) {
            console.log(name, (size + 'KB').green);
          } else if (size < 200 && size > 100) {
            console.log(name, (size + 'KB').yellow);
          } else {
            console.log(name, (size + 'KB').red);
          }

          // 考虑是否加入排序功能

        }

      }

      console.log('\n');

    })

  }
}

module.exports = CheckImagesSize