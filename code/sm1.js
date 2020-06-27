/*
* 循环同步: 异步任务有序，但是数量未知，最后执行同步任务
* Promise 形式 和 async/await
*/


function taskA() {
  return new Promise(resolve => {
    setTimeout(() => {
      console.log('taskA end...')
       resolve(1)
    }, 500)
  })
}

function taskB(v) {
  return new Promise(resolve => {
    setTimeout(() => {
      console.log('taskB end...', v)
       resolve(v+1)
    }, 500)
  })
}

function taskC(v) {
  return new Promise(resolve => {
    setTimeout(() => {
      console.log('taskC end...', v)
       resolve(v+1)
    }, 500)
  })
}

function sync(v) {
  console.log('执行同步任务: sync...', v)
}

const tasks = [taskA, taskB, taskC]

// 普通 for 循环形式
// let p = null
// for (const task of tasks) {
//   console.log('task...')
//   if (p === null) {
//     p = task()
//   } else {
//     p = p.then(function (v) {
//       return task(v)
//     })
//   }
// }
// p.then(function (v){
//   sync(v)
// })

// async/await 形式
async function processArray(arr) {
  let v = 0
  for (const task of arr) {
    v = await task(v)
  }
  console.log('all Done!')
}

processArray(tasks)





/**
 *  desc: 并发同步， Promise 解决方案
 *  多个异步任务并发执行, 所有异步任务执行完成后，最后执行同步任务 
 */

function taskA() {
  console.log('raskA running...')
  return new Promise(resolve => {
    setTimeout(() => {
      console.log('taskA end...')
       resolve(1)
    }, 500)
  })
}

function taskB(v) {
  console.log('raskB running...')
  return new Promise(resolve => {
    setTimeout(() => {
      console.log('taskB end...')
       resolve(2)
    }, 500)
  })
}

function taskC(v) {
  console.log('raskC running...')
  return new Promise(resolve => {
    setTimeout(() => {
      console.log('taskC end...')
       resolve(3)
    }, 500)
  })
}


function sync(v) {
  console.log('执行同步任务: sync...', v)
}

Promise.all([taskA(), taskB(), taskC()]).then(function(resArr) {
  console.log('异步任务执行完成...')
  sync(resArr)
})




/**
 *  desc: 并发同步， 回调函数形式
 *  多个异步任务并发执行, 所有异步任务执行完成后，最后执行同步任务 
 */

function taskA(cb) {
  console.log('raskA running...')
  setTimeout(() => {
    console.log('taskA end...')
    cb()
  }, 500)
}

function taskB(cb) {
  console.log('raskB running...')
  setTimeout(() => {
    console.log('taskB end...')
    cb()
  }, 500)
}

function taskC(cb) {
  console.log('raskC running...')
  setTimeout(() => {
    console.log('taskC end...')
    cb()
  }, 500)
}

function sync() {
  console.log('执行同步任务: sync...')
}

let asyncCount = 0

taskA(function() {
  asyncCount++
  if (asyncCount >= 3) {
    sync()
  }
})

taskB(function() {
  asyncCount++
  if (asyncCount >= 3) {
    sync()
  }
})

taskC(function() {
  asyncCount++
  if (asyncCount >= 3) {
    sync()
  }
})




