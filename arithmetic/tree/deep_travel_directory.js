/**
 * desc: 深度优先遍历目录
 * ps: 但是，如果 callback 里有异步操作的话，如何判断遍历完成就是个问题。
 */
const fs = require('fs')
const path = require('path')


const disPath = path.resolve('../../arithmetic')
console.log('disPath:', disPath)

DepTravel(disPath, callback)

function DepTravel(dir, callback) {
  const stat = fs.statSync(dir)
  if (!stat.isDirectory()) {
    throw new Error('dir 未非目录')
  }
  fs.readdirSync(dir).forEach(file => {
    const pathName = path.join(dir, file)
    if (fs.statSync(pathName).isDirectory()) {
      DepTravel(pathName, callback)
    } else {
      callback(pathName)
    }
  })
}

function callback(pathName) {
  // const fileName = path.basename(pathName)
  console.log(pathName)
}
console.log('遍历完成...')