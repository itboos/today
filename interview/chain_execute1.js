// 知识点： 函数的链式调用和 异步任务的顺序调用

//实现一个函数 myFun, 它可以按下面的方式调用。每隔 1 s 钟， 输出一个  1
myFun().execute(() => setTimeout(console.log(1), 1000))
       .execute(() => setTimeout(console.log(1), 1000))
       .execute(() => setTimeout(console.log(1), 1000))


function myFun() {
  const tasks = []
  function execute(task) {
    setTimeout(task, tasks.length * 1000)
    tasks.push(task)
    return { execute }
  }
  return { execute }
}


function fn1() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve('1')
      console.log('fn1 execute')
    }, 1000)
  })
}
function fn2() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve('2')
      console.log('fn2 execute')
    }, 1000)
  })
}
function fn3() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve('3')
      console.log('fn3 execute')
    }, 1000)
  })
}

// 1.异步任务的顺序调用, 实现
myFun().execute(fn1).execute(fn2).execute(fn3).execute()

async function executeSequentially(tasks) {
  // 注意的是， for of 循环 对于动态添加的数据，不会遍历到. 
  // 对于这种，则是可以遍历到的。
  for (let i = 0; i < tasks.length; i++) {
    const res = await tasks[i]()
    console.log('res:', res)
  }
  // 可以写成
  // for (const task of tasks) {
  //   const res = await task()
  //   console.log('res:', res)
  // }
}

function myFun() {
  const tasks = []
  function execute(task) {
    if (!task) {
      executeSequentially(tasks)
    } else {
      tasks.push(task)
    }
    return { execute }
  }
  return { execute }
}

// 3. 实现异步任务的顺序调用， 没有调用标识，一开始就调用
myFun().execute(fn1).execute(fn2).execute(fn3)

async function executeSequentially(tasks) {
  // 这里，就必须要 task.length, 因为 tasks 数组在动态添加元素
  for (let i = 0; i < tasks.length; i++) {
    const res = await tasks[i]()
    console.log('res:', res)
  }
}

function myFun() {
  const tasks = []
  let hasRun = false
  function execute(task) {
    tasks.push(task)
    // 使用是否运行标识，防止重复调用函数
    if (!hasRun) {
      hasRun = true
      executeSequentially(tasks)
    }
    return { execute }
  }
  return { execute }
}