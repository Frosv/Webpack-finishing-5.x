// ./remove-comments-plugin.js

const config = require('./size.config')

console.log(config.name);

class CheckImagesSize {
  apply(compiler) {
    // console.log('compiler',compiler)
    compiler.hooks.emit.tap('CheckImagesSize', compilation => {
      console.log('plugins');
      console.log('\n');
      let imgList = []
      let jsList = []
      // compilation => 可以理解为此次打包的上下文
      for (const name in compilation.assets) {

        // 获取大小 转换成KB
        const size = ((compilation.assets[name].size()) / 1024).toFixed(3)
        // 获取图片格式
        if (name.endsWith('.svg') || name.endsWith('.png') || name.endsWith('.jpg')) {


          imgList.push({
            name,
            size: size + 'KB'
          })

        } else if(name.endsWith('.js')){
          jsList.push({
            name,
            size: size + 'KB'
          })
        }

      }
      console.log('png || jpg || svg 文件大小');
      console.table(imgList);
      console.log('js 文件大小');
      console.table(jsList);

      console.log('\n');

    })

  }
}

module.exports = CheckImagesSize