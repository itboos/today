/*! lozad.js - v1.0.2 - 2017-09-10
* https://github.com/ApoorvSaxena/lozad.js
* Copyright (c) 2017 Apoorv Saxena; Licensed MIT */

// 结构定义类似于这样


// (function(global, factory){
//     console.log('全局对象为:', global);
//     global.lazyload = factory();
//     console.log(global.lazyload);
//     console.log(global.lazyload());
// }(this,
//   function(){
//     var test_lazyload = function() {
//       console.log('我是图片懒加载方法....');
//     };
//     return test_lazyload;
// }));



// 定义的是立即函数
(function (global, factory) {
  //判断执行环境，是浏览器环境还是Node环境
  /*
    typeof define === 'function' && define.amd 
    // If 'define' is not undefined and it is a function and 'amd' (asynchronous module definition) 
      is also defined then the code assumes that require.js is in play.
      检测当前环境是否处于 require.js 的环境
  
  */
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
  (global.lozad = factory());
  //将参数里的工厂方法执行结果返回给全局的lozad变量
}(this, (function () { 'use strict';



// 定义assign方法, 存在则是用ES6自带的方法，否则，自定义一个对象赋值的方法.
// _extends(target, [source1, source2.... sourcen] );  将源对象的自身属性赋值给目标对象, 后面的对象属性会覆盖前面的对象的属性
var _extends = Object.assign || 
              function (target) { 
                for (var i = 1; i < arguments.length; i++) {
                   var source = arguments[i];
                    for (var key in source) {
                      // 如果属性是对象自身的，则赋值给目标对象 , 可以直接对象.hasOwnProperty -- 避免原型链的查找过程，原型链的查找很费时间, 参数也可以使用ES6剩余参数的形式, ...args 
                     if (Object.prototype.hasOwnProperty.call(source, key)) {
                        target[key] = source[key];
                      }
                    }
                }
                return target;
              };

var defaultUrl  = 'https://www.google.co.jp/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png';
var loadImageAsync = function loadImageAsync(element) {
  console.log(element);
  console.log(defaultConfig);
  var img = new Image();
  img.onload = function() {
    // 使用目标图片
    console.log('加载成功....');
    element.src = element.dataset.src;
  };
  img.onerror = function () {
    // 加载失败使用的error图片
    console.log('加载失败....');
    element.src = defaultConfig.errorImgUrl;
  }
  img.src = element.dataset.src;
  element.src = defaultConfig.holdImgUrl;
};
// 设置默认配置  考虑怎么加一个默认的占位图，在所需的图片加载完成前，先使用占位图，待图片完全加载后，再赋值.             
var defaultConfig = {
  rootMargin: '0px',
  threshold: 0, // 阈,(入口，开始值
  load: function load(element) {
    console.log( element);
    // 新的H5元素支持直接取dataset.src // 元素以data-shuxing 的形式存在时，可以直接这样 Node.dataset.shuxing 设置或者取值
    // element.src = element.dataset.src;
    loadImageAsync(element);
  },
  holdImgUrl: '',
  errorImgUrl: '',
};

//设置成已经加载
function markAsLoaded(element) {
  element.dataset.loaded = true;
}
// 判断图片是否已经加载
var isLoaded = function isLoaded(element) {
  return element.dataset.loaded === 'true';
};

// 内部选择方法
// https://developer.mozilla.org/zh-CN/docs/Web/API/IntersectionObserver
// IntersectionObserver接口 (为开发者提供了一种可以异步监听目标元素与其祖先或视窗(viewport)交叉状态的手段。祖先元素与视窗(viewport)被称为根(root)。
var onIntersection = function onIntersection(load) {
  return function (entries, observer) {
    console.log('entries:', entries);
    console.log('observer:', observer);
    entries.forEach(function (entry) {
      console.log(entry);
      if (entry.intersectionRatio > 0) {
        console.log('Loaded new Imgs....');
        observer.unobserve(entry.target);
        load(entry.target);
        markAsLoaded(entry.target);
      }
    });
  };
};

var lozad = function () {
  // 去的图片懒加载的选择器，默认为参数的第一个参数，没有则使用默认值
  var selector = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '.lozad';
  // 可选参数，为一个对象、没传则设置成空对象
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  // 设置配置参数对象
  var _defaultConfig$option = _extends({}, defaultConfig, options),
      rootMargin = _defaultConfig$option.rootMargin,
      threshold = _defaultConfig$option.threshold,
      load = _defaultConfig$option.load;
  // 设置占位图和错误图
  defaultConfig.holdImgUrl = _defaultConfig$option.holdImgUrl;
  defaultConfig.errorImgUrl = _defaultConfig$option.errorImgUrl;

  // 设置一个空值
  var observer = void 0;

  // 如果浏览器支持 IntersectionObserver
  if (window.IntersectionObserver) {
    // 创建观察者对象
    /**
     * 参数1： callback, 是个必选参数，当有相交发生时，浏览器便会调用
     * 参数2： options 可选参数 对象里面的三个属性也是可选的
     */
    observer = new IntersectionObserver(onIntersection(load), {
      rootMargin: rootMargin,
      threshold: threshold
    });
    console.log('观察者对象为:', observer);
  }

  return {
    // 返回一个对象，这个对象包含observe 方法
    observe: function observe() {
      // 返回还没有被加载的图片
      var elements = [].filter.call(document.querySelectorAll(selector), function (element) {
        return !isLoaded(element);
      });
      // observer 不存在了, 加载所有还没加载的图片
      if (!observer) {
        elements.forEach(function (element) {
          load(holdImgUrl, errorImgUrl, element);
          markAsLoaded(element);
        });

        return;
      }
      // 监听每一个待加载的图片
      elements.forEach(function (element) {
        observer.observe(element);
      });
    }
  };
};

// 返回lozad 方法
return lozad;

})));
