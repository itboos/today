// 简单的 Promise 实现:
// 1. 文章链接：https://imweb.io/topic/5bbc264b6477d81e668cc930
function Promise(fn) {
  var self = this;
  self.status = 'pending'; // Promise初始状态为pending
  self.data = undefined; // Promise的值
  self.onFulfilledCallback = []; // Promise resolve回调函数集合
  self.onRejectedCallback = []; // Promise reject回调函数集合

  function resolve(value) {
    if (self.status === 'pending') {
      self.status = 'resolved';
      self.data = value;
      setTimeout(function() {
        for (var i = 0; i < self.onFulfilledCallback.length; i++) {
          self.onFulfilledCallback[i](value);
        }
      });
    }
  }

  function reject(reason) {
    if (self.status === 'pending') {
      self.status = 'rejected';
      self.data = reason;
      setTimeout(function() {
        for (var i = 0; i < self.onRejectedCallback.length; i++) {
          self.onRejectedCallback[i](reason);
        }
      });
    }
  }

  try {
    fn(resolve, reject); // 执行传进来的函数，传入resolve, reject参数
  } catch (e) {
    reject(e);
  }
}

Promise.prototype.then = function(onFulfilled, onRejected) {
  var self = this;

  // 根据标准，如果then的参数不是function，则我们需要忽略它
  onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : function(v) { return v};
  onRejected = typeof onRejected === 'function' ? onRejected : function(r) { return r };

  if (self.status === 'resolved') {
    // 这里promise的状态已经确定是resolved，所以调用onResolved
    return new Promise(function(resolve, reject) {
      setTimeout(function() {
        try {
          // ret是onFulfilled的返回值
          var ret = onFulfilled(self.data);
          if (ret instanceof Promise) {
            // 如果ret是一个promise，则取其值作为新的promise的结果
            ret.then(resolve, reject);
          } else {
            // 否则，以它的返回值作为新的promise的结果
            resolve(ret);
          }
        } catch (e) {
          // 如果出错，以捕获到的错误作为promise2的结果
          reject(e);
        }
      });
    });
  }

  // 这里的逻辑跟前面一样，不再赘述
  if (self.status === 'rejected') {
    return new Promise(function(resolve, reject) {
      setTimeout(function() {
        try {
          var ret = onRejected(self.data);
          if (ret instanceof Promise) {
            ret.then(resolve, reject);
          } else {
            reject(ret);
          }
        } catch (e) {
          reject(e);
        }
      });
    });
  }

  if (self.status === 'pending') {
    // 如果当前的Promise还处于pending状态，则不能确定调用
    // onResolved还是onRejecte，只能等到Promise状态确定后，
    // 才能确定如何处理
    return new Promise(function(resolve, reject) {
      self.onFulfilledCallback.push(function(value) {
        setTimeout(function() {
          try {
            var ret = onFulfilled(self.data);
            if (ret instanceof Promise) {
              ret.then(resolve, reject);
            } else {
              resolve(ret);
            }
          } catch (e) {
            reject(e);
          }
        });
      });

      self.onRejectedCallback.push(function(reason) {
        setTimeout(function() {
          try {
            var ret = onRejected(self.data);
            if (ret instanceof Promise) {
              ret.then(resolve, reject);
            } else {
              reject(ret);
            }
          } catch (e) {
            reject(e);
          }
        });
      });
    });
  }
}

// 顺便实现一下catch方法
Promise.prototype.catch = function(onRejected) {
  return this.then(null, onRejected);
}

const p = new Promise(function(resolve, reject) {
  setTimeout(function() {
    resolve(1);
  }, 2000);
});

p.then(function(v) {
  console.log(v);
  return 2;
}).then(function(v) {
  console.log(v);
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      resolve(3);
    }, 3000);
  });
}).then(function(v) {
  console.log(v);
});