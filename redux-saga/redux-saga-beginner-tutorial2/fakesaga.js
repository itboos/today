// 简单的redux-sga 实现模拟
// channel 是对事件源的抽象
// 原github 地址： https://github.com/ProtoTeam/blog/blob/master/201710/3.md

function channel (){
  let taker = null
  function take(cb) {
    taker = cb;
  }
  function put(input) {
    if (taker) {
      const tempTaker = taker;
      taker = null;
      tempTaker(input)
    }
  }
  return {
    put,
    take,
  }
}


// effects
function take() {
  return {
    type: 'take'
  };
}
// fork 的作用是启动一个任务，并且不阻塞原 task 的运行
function fork(cb) {
  return {
    type: 'fork',
    fn: cb,
  };
}
/*
 * takeEvery的作用就是当channel的put发生后，自动往channel里放进一个新的taker。
 * 我们实现的channel里同时只能有一个taker，while(true)的作用就是每当一个put触发消耗掉了taker后，
 * 就自动触发runTakeEffect中传入的task的next方法，再次往channel里放进一个taker，从而做到源源不断地监听事件。
*/
function* takeEvery(worker) {
  yield fork(function* () {
    while(true) {
      const action = yield take();
      worker(action);
    }
  });
}

// 内部方法
function runTakeEffect(effect, cb) {
  chan.take(input => {
    cb(input);
  });
}
function runForkEffect(effect, cb) {
  task(effect.fn || effect);
  cb();
}
// task是generator方法的执行环境，所有saga的generator方法都跑在task里。
function task(iterator) {
  console.log('iterator:', iterator)
  const iter = typeof iterator === 'function' ? iterator() : iterator;
  function next(args) {
    const result = iter.next(args); // {value: {type: 'take'}, done: false }
    if (!result.done) {
      const effect = result.value;
      // if (effect.type === 'take') {
      //   runTakeEffect(result.value, next);
      // }
      // 判断effect是否是iterator
      if (typeof effect[Symbol.iterator] === 'function') {
        // 运行迭代器 方法
        runForkEffect(effect, next);
      } else if (effect.type) {
        switch (effect.type) {
        case 'take':
          runTakeEffect(effect, next);
          break;
        case 'fork':
          runForkEffect(effect, next);
          break;
        default:
        }
      }
    }
  }
  next();
}

// 业务部分
const chan = channel();
// 监听点击事件
window.onload = () => {
  console.log('window.onload....')
  
  let i = 0;
  const btn = document.querySelector('#test-btn')
  const value = document.querySelector('#test-value');
  
  btn.addEventListener('click', () => {
    console.log('点击事件....')
    const action =`action data${i++}`;
    chan.put(action);
  }, false)

  function* mainSaga() {
    // const action = yield take();
    // console.log('action...', action)
    // value.innerHTML  = action;
    yield takeEvery(action => {
      value.innerHTML = action;
    });
  }
  // debugger;
  task(mainSaga);
  btn.click();
}
