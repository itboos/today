/**
 * 深度遍历 实战： 遍历所有文件，读取文件内容，处理后，最后写入文件
 * desc: 寻找项目中 color 未使用 less 变量的值
 * example: color: #666 background: #ccc
 * 判断遍历结束： 先提前遍历整个文件夹，统计文件数。
 * 当异步遍历时， 每遍历一个文件，总文件数减 1, 当文件数为 0 时， 则认为遍历完成了。
 */
const fs = require('fs')
const path = require('path')

const colorMap = {}
let fileNum = 0

const disPath = path.resolve('./src')

getDirFileNum(disPath)
// console.log('fileNum:', fileNum)
DepTravel(disPath, callback)

function getDirFileNum(dir) {
  const stat = fs.statSync(dir)
  if (!stat.isDirectory()) {
    throw new Error('dir 未非目录')
  }
  fs.readdirSync(dir).forEach(file => {
    const pathName = path.join(dir, file)
    if (fs.statSync(pathName).isDirectory()) {
      getDirFileNum(pathName)
    } else {
      // 是文件，deal
      fileNum += 1
    }
  })
}

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

async function callback(pathName) {
  const styleReg = /<style\s*lang="less">([\s\S]*)<\/style>/
  if (path.extname(pathName) === '.wpy') {
    // 空文件返回 null
    const textContents = await readFile(pathName)
    // ''.match(/xxxx/) => null
    const mathArr = textContents.match(styleReg)
    if (mathArr !== null) {
      const styleContents = textContents.match(styleReg)[1]
      findIllegalColor(styleContents)
    }
  }

  fileNum -= 1

  if (fileNum === 0) {
    finishCallBack()
  }
}

function readFile(pathName) {
  return new Promise((resolve, reject) => {
    fs.readFile(pathName, { encoding: 'utf-8' }, (err, data) => {
      if (err) {
        reject(err)
      }
      resolve(data)
    })
  })
}


function findIllegalColor(style) {
  // 检查 color 和 background
  const bcColors = style.match(/background-color:\s*([\s\S]*?);|color:\s*([\s\S]*?);|background:\s*([\s\S]*?);/g) || []
  const illegalColors = bcColors.filter(value => {
    // 非 less 变量， 或者 rgb, rgba, linear-gradient, background: none 这几种情况之一, 则认为是非法颜色
    const colorInvalid = value.indexOf('@') === -1
                         && value.indexOf('rgb') === -1
                         && value.indexOf('linear-gradient') === -1
                        && value.indexOf('none') === -1
    if (colorInvalid) {
      return true
    }
    return false
  })
  // console.log('illegalColors', illegalColors.toString())
  // 检测 .font-style(@font-size-22, @color-999); 的文字颜色是否使用变量
  const fontColors = style.match(/font-style\([\s\S]*?,\s*[\w\W]*?\)/g) || []
  const illegalFontColors = fontColors.filter((color => {
    return color.indexOf('@color') === -1
  }))

  const resultArr = [].concat(illegalColors, illegalFontColors)

  const filterResult = resultArr.filter(color => {
    const hasInMap = colorMap[color]
    if (!hasInMap) {
      colorMap[color] = true
    }
    return !hasInMap
  })
  // console.log('filterResult:', filterResult.toString())
  return filterResult
}

function finishCallBack() {
  fs.writeFile(path.resolve('./colorResult.json'), JSON.stringify(colorMap), 'utf-8', err => {
    console.log('写入 colorResult.js success.')
    if (err) {
      throw err
    }
  })
}
