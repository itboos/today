// 2017年08月12日15:12:05  开始写一些种子方法
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