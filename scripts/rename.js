//rename.js
const fs = require('fs') //引入node内置的文件系统

function rename() {
  let newName = []
  fs.readdir('./a/', (err, oldName) => {  //读取指定文件夹下的文件的名字，oldName是一个数组
    if (err) {
      console.log(err)
    }
    for (let i = 0; i < oldName.length; i++) {
      let name = `ani-${String("0" + i).slice(-2)}.jpg` // 以图片为例，可以修改为其它文件，使用 slice 方法来保持 01 02 ... 11 的数字格式
      newName[i] = name        // 把名字赋给一个新的数组
    }

    for (var i = 0; i < oldName.length; i++) {
      let oldPath = `./a/${oldName[i]}`  //原本的路径
      let newPath = `./a/${newName[i]}`  //新路径

      fs.rename(oldPath, newPath, (err) => {  //重命名
        if (err) {
          console.log(err)
        }
        console.log('done!')
      })
    }

  })
}

rename()