// ./remove-comments-plugin.js

const colors = require('colors')

const config = require('./size.config')

const fs = require("fs");

// 判断配置是否正确
if(config.fileType.length === 0){
  console.log('请设置需要检测类型(fileType)！'.red)
  return
}

class CheckImagesSize {
  apply(compiler) {
    // console.log('compiler',compiler)
    compiler.hooks.emit.tap('CheckImagesSize', compilation => {
      console.log('plugins');
      console.log('\n');
      let tmp = ``
      // compilation => 可以理解为此次打包的上下文
      for (const name in compilation.assets) {

        // 获取大小 转换成KB
        const size = ((compilation.assets[name].size()) / 1024).toFixed(3)

        // 根据用户设置将后缀名相同的取出
        config.fileType.forEach(element => {
          // 防止用户输入大写
          if(name.endsWith(element.toLocaleLowerCase())){
            tmp += `<tr>
                      <td>${name}</td>
                      <td>${size}KB</td>
                    </tr>`
          }
        });

      }

      console.log(tmp)
      const html = `<html>
        <title>前端项目健康报告</title>
        <body>
          <div style="color: red;">目前设置单位件最大${config.maxSize}KB</div>
          <table border="0">
          <tr>
            <th>Name</th>
            <th>Size</th>
          </tr>
          ${tmp}
        </table>
        </body>
      </html>`

      fs.writeFile('前端项目健康报告.html', html, 'utf8', function (error) {
        if (error) {
          console.log(error);
          return false;
        }
        console.log('已经生成分析报告.html');
      })

      console.log('\n');

    })

  }
}

module.exports = CheckImagesSize