/**
 * desc: 观察者模式/发布订阅模式 的 es5 实现
 * Date: 2020-03-24 19:05:20
 */
function Events() {
  // 所有事件的监听器
  var es = {};

  function on(eventName, listener, isOnce) {
    if (!es[eventName]) es[eventName] = [];
    es[eventName].push({
      cb: listener,
      isOnce: isOnce === undefined ? false : isOnce
    })
   //  console.log('es:', es)
    return function() {
     //  console.log('取消订阅...', eventName)
      off(eventName, listener);
    };
  }

  function off(eventName, listener) {
    if (!es[eventName]) return
    // clear all
    if (eventName === undefined) {
      es = {}
      return
    }
    // 移除某种事件的全部订阅。
    if (listener === undefined) {
     delete es[eventName]
     return
    }

    // clear one listener
    var listeners = es[eventName]
    for (var i = 0, len = listeners.length; i < len; i++) {
      if (listeners[i].cb === listener) {
       es[eventName].splice(i, 1)
       break;
      }
    }

  }

  function emit(eventName) {
    // 按需 是否 copy 一份 listeners 的副本出来
    var args = Array.prototype.slice.call(arguments, 1);
    var listeners = es[eventName] || []

    for (var i = 0, len = listeners.length; i < len; i++) {
      listeners[i].cb.apply(this, args)
      if (listeners[i].isOnce) {
       off(eventName, listeners[i].cb);
      }
    }
  }

  function once(eventName, listener) {
     on(eventName, listener, true);
  }
  
  return {
    on: on,
    off: off,
    emit: emit,
    once: once
  }
}

var es = Events();
es.on('click', function(a,b) {
  console.log('click-1', a, b);
})
var unSub = es.on('click', function(a,b,c) {
 console.log('click-2', a, b, c);
})
es.emit('click', 1,2,3);

console.log('取消 click-2 订阅 unSub')
unSub() // 取消某个订阅的某一个监听函数
// es.off('click') 取消 某个类型的所有订阅
es.emit('click', 3,4,5);

// 执行一次后，就移除监听函数。
es.once('mouseover', function(a, b) {
 console.log('mouseover', a, b);
})
es.emit('mouseover', 1,2);
es.emit('mouseover', 3,4); // 无输出