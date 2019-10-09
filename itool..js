/**
 * Determine if a value is an Array
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Array, otherwise false
 */
function isArray(val) {
  return toString.call(val) === '[object Array]';
}

/** 
  * 对象混合方法
  * 混和多个对象， 将多个源对象的值合并到目标对象，支持是否复写同名属性，虽然有返回值，但是就是直接改变的target 对象，可以不接收返回值
  * @param {Object} target 目标对象，
  * @param {Object} soucre,要复制属性源对象 source1，source2.....至少一个
  * @param {boolean}isReWrite 是否覆盖原有属性（可选，默认为否）
  * @returns {boolean} 要改变的那个target 目标对象
  */
  function mix(target,source,isReWrite) {
    var args = [].slice.call(arguments),
        isReWrite = typeof args[args.length-1] === 'boolean' ? args.pop() : false,
        key = '';
        i= 1;
    //遍历元对象数组，依次混合
    while((source = args[i++])) {
      // 如果是重写属性，直接复制，否则，如果目标对象不存在的属性，才赋值，args[1000] =undefined
      for(var p in source) {
        if(isReWrite || !target.hasOwnProperty(p)) {
          target[p] = source[p];
        }
      }
    }
    return target;
  }
  // 调用列子： mix( target,obj1[,obj2,.....objn,true] )
  /**
   *  isXXXX 的类型判断...., 种子方法里
  /
  /*
   * @param {any} obj 要判断的参数
   * @returns {boolean} 是否是纯净的js对象
  */
   function isPlainObject(obj) {
     return obj && typeof obj === 'object' && Object.getPrototypeOf(obj) === Object.prototype ;
   }

    /* ERget 脚本加载器 */
   /**
 * Copyright (c) 2014,Egret-Labs.org
 * All rights reserved.
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 *     * Redistributions of source code must retain the above copyright
 *       notice, this list of conditions and the following disclaimer.
 *     * Redistributions in binary form must reproduce the above copyright
 *       notice, this list of conditions and the following disclaimer in the
 *       documentation and/or other materials provided with the distribution.
 *     * Neither the name of the Egret-Labs.org nor the
 *       names of its contributors may be used to endorse or promote products
 *       derived from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY EGRET-LABS.ORG AND CONTRIBUTORS "AS IS" AND ANY
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL EGRET-LABS.ORG AND CONTRIBUTORS BE LIABLE FOR ANY
 * DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
 * ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

egret_h5 = {};

egret_h5.prefix = "";

egret_h5.loadScript = function (list, callback, proCallBack) {
    var loaded = 0;
    var loadNext = function () {
        egret_h5.loadSingleScript(egret_h5.prefix + list[loaded], function () {
            loaded++;
            if (loaded >= list.length) {
                callback();
            }
            else {
                if(proCallBack){
                    proCallBack(loaded);
                }
                loadNext();
            }
        })
    };
    loadNext();
};

egret_h5.loadSingleScript = function (src, callback) {
    var s = document.createElement('script');
    if (s.hasOwnProperty("async")) {
        s.async = false;
    }
    s.src = src;
    s.addEventListener('load', function () {
        this.removeEventListener('load', arguments.callee, false);
        callback();
    }, false);
    document.body.appendChild(s);
};

egret_h5.preloadScript = function (list, prefix) {
    if (!egret_h5.preloadList) {
        egret_h5.preloadList = [];
    }
    egret_h5.preloadList = egret_h5.preloadList.concat(list.map(function (item) {
        return prefix + item;
    }))
};

egret_h5.startLoading = function () {
    var list = egret_h5.preloadList;
    egret_h5.loadScript(list, egret_h5.startGame);
};
// 检测css3的支持情况
supportCss3(style) {
    const prefix = ['webkit', 'Moz', 'ms', 'o'];
    let i;
    const humpString = [];
    const htmlStyle = document.documentElement.style;
    const _toHumb = function (string) {
      return string.replace(/-(\w)/g, function ($0, $1) {
        return $1.toUpperCase();
      });
    };
    for (i in prefix) {
      humpString.push(_toHumb(prefix[i] + '-' + style));
    }
    humpString.push(_toHumb(style));
    for (i in humpString) {
       if (humpString[i] in htmlStyle) {
         return true;
       } 
    }
    return false;
  }

// 监听移动端手指滑动事件:
  //获得角度
function getAngle(angx, angy) {
    return Math.atan2(angy, angx) * 180 / Math.PI;
};

//根据起点终点返回方向 1向上 2向下 3向左 4向右 0未滑动
function getDirection(startx, starty, endx, endy) {
    var angx = endx - startx;
    var angy = endy - starty;
    var result = 0;

    //如果滑动距离太短
    if (Math.abs(angx) < 2 && Math.abs(angy) < 2) {
        return result;
    }

    var angle = getAngle(angx, angy);
    if (angle >= -135 && angle <= -45) {
        result = 1;
    } else if (angle > 45 && angle < 135) {
        result = 2;
    } else if ((angle >= 135 && angle <= 180) || (angle >= -180 && angle < -135)) {
        result = 3;
    } else if (angle >= -45 && angle <= 45) {
        result = 4;
    }

    return result;
}
//手指接触屏幕
DOm.addEventListener("touchstart", function(e) {
    //停止正在执行的轮播图.
      startx = e.touches[0].pageX;
      starty = e.touches[0].pageY;
}, false);
//手指离开屏幕
DOm.addEventListener("touchend", function(e) {
  var endx, endy;
  endx = e.changedTouches[0].pageX;
  endy = e.changedTouches[0].pageY;
  var direction = getDirection(startx, starty, endx, endy);
  switch (direction) {
      case 0:
          alert("未滑动！");
          break;
      case 1:
          alert("向上！");
          break;
      case 2:
          alert("向下！");
          break;
      case 3:
          alert("向左！");
          //触发上一张事件 $(this)只让当前的那个轮播图滑动
          break;
      case 4:
          alert("向右！");
          break;
      default:
  }
}, false);

// 检测是否支持localStorage:
// 移动端浏览器隐私模式/无痕模式使用本地存储localStorage/sessionStorage的问题
function isLocalStorageSupport(){
    try {
        var isSupport = 'localStorage' in window && window['localStorage'] !== null;
        if (isSupport) {
            localStorage.setItem('__test', '1');
            localStorage.removeItem('__test');
        }
        return isSupport;
    } catch (e) {
        return false;
    }
}

// 美团rem 解决方案 2017年10月31日09:37:46  有未理解的地方
! function(e, t) {
    // e= document , t = window;

    function n() {
    var e = Math.min(d.getBoundingClientRect().width, 768);
    t.payuiWidth = e,
    d.style.fontSize = e / 7.5 + "px"
    }

    // 这个方法是什么意思?  貌似是遇到高清屏， 创建一个半个像素的透明框，最后移除
    function i() {
        var n = e.createElement("div");
        n.style.border = ".5px solid red";
        e.body.appendChild(n);
        1 === n.offsetHeight &&  e.body.classList.add("hairline");
        // e.body.removeChild(n);
        t.removeEventListener("DOMContentLoaded", i);
    }
    var d = e.documentElement;
    n(); 
    t.addEventListener("resize", n);
    t.devicePixelRatio && devicePixelRatio > 1 && 				
    ("complete" === e.readyState ? 
                            i() : 
                            t.addEventListener("DOMContentLoaded", i))

}(document, window);


// 检查是否支持localStorage, safiri 无痕模式会报错

function isLocalStorageSupport(){
    try {
        var isSupport = 'localStorage' in window && window['localStorage'] !== null;
        if (isSupport) {
            localStorage.setItem('__test', '1');
            localStorage.removeItem('__test');
            info.textContent = '支持';
        }
        return isSupport;
    } catch (e) {
         info.textContent = '不支持';
        return false;
    }
}
var res = isLocalStorageSupport();
console.log(res);
if (!res) {
  alert('无痕模式可能会导致问题....');
}

// 2019-08-28 09:45:37
// 将传回调形式的函数，转换成 返回 Promise 对象的函数：
// promisify(f, true) to get array of results

function promisify(f, manyArgs = false) {
    return function (...args) {
      return new Promise((resolve, reject) => {
        function callback(err, ...results) { // our custom callback for f
          if (err) {
            return reject(err);
          } else {
            // resolve with all callback results if manyArgs is specified
            resolve(manyArgs ? results : results[0]);
          }
        }
        // 手动加了一个 callback 参数，原方法需要明确， 最后一个参数是 calllback
        args.push(callback);
        
        f.call(this, ...args);
      });
    };
  };
  
  function f(time, callback) {
    setTimeout(() => {
      console.log('时间到了...')
      callback(null, 1, 2,3)
    }, time)
  }
  // promiseify 前：
  // f(2000, (err, ...args) => {
  //   console.log('结果：', err, args)
  // })
  
  // promiseify 后：
  const pf = promisify(f, true);
  
  pf(2000).then(res => {
    console.log('res:', res) //  [1, 2, 3]
  })

// 实现一个无论调用多少次，都只执行一次的工具函数。
function once(fn, context) {
  let called = false
  let result = null
  return function(...args) {
    if (called) {
      return result
    }
    called = true
    return result = fn.apply(context || null, args)
  }
}

const saiHi = once(function(name) {
  console.log('周六愉快~....', name)
  return 1;
})
var res1 = saiHi('zack zhong')
var res2 =saiHi('zack zhong1')
saiHi('zack zhong2')
saiHi('zack zhong3')

console.log('res1, res2:', res1, res2)

// 接受一个函数作为参数， 返回一个对这个函数返回结果取反的参数
function complement(fn) {
  return function() {
    return !fn.apply(null, arguments)
    // return !fn.apply(null, Array.from(arguments))
  }
}
var isOld = complement(function(a) {
  return a % 2 === 0
})
// 返回常量的函数
function always(v) {
  return function() {
    return v
  }
}
var f = always(function() {console.log('1')})

// 数组扁平化
function flat(arr) {
  var res = []
  for (let i = 0, len = arr.length; i < len;  i++) {
    if (Array.isArray(arr[i])) {
       res = res.concat(flat(arr[i]))
    } else {
      res.push(arr[i])
    }
  }
  return res
}