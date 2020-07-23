/**
 * desc: 广度优先遍历目录
 * ps: 但是，如果 callback 里有异步操作的话，如何判断遍历完成就是个问题。
 * 当目录层级很深时， 深度遍历的递归形式很可能导致栈溢出, 而广度遍历则没有这个问题。
 */

const fs = require('fs')
const path = require('path')


const disPath = path.resolve('../../arithmetic')

function BreadthTravel(dir, callback) {
  const stat = fs.statSync(dir)
  if (!stat.isDirectory()) {
    throw new Error('dir 未非目录')
  }

  const queue = []
  queue.push(dir)

  while(queue.length > 0) {
    const curDir = queue.shift()
    console.log('目录:', curDir)
    fs.readdirSync(curDir).forEach(file => {
      // console.log('file:', file)
      const pathName = path.join(curDir, file)
      if (fs.statSync(pathName).isDirectory()) {
        // 目录
        queue.push(pathName)
      } else { 
        // 文件
        callback(pathName)
      }
    })
    console.log('\n')
  }
}

function callback(pathName) {
  const fileName = path.basename(pathName)
  console.log(fileName)
}

BreadthTravel(disPath, callback);
console.log('遍历完成...')