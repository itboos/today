/*  2017年04月23日09:54:28 一些代码的积累*/
// 利用Promise 实现一个图片懒加载的功能:
//   1.有加载中的占位图片的显示
//   2.加载失败，显示加载失败占位符
//   3.在DOM加载之后再加载图片，要懒加载的图片加上data-src属性，等真正的图片加载完成之后，再替换默认的图片

 function loadImageAsync(url) {
    return new Promise(function (reslove, reject) {
        var img = new Image();
        img.onload = function () {
            reslove();
        }
        img.onerror = function () {
            reject();
        }
        console.log("loading image");
        img.src = url;
    });
}

var loadImage1 = loadImageAsync("https://www.google.co.jp/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png");
loadImage1.then(function success() {
    console.log("success");
    //将url赋值给img
    // document.querySelector('#img1').src="https://static.pexels.com/photos/211913/pexels-photo-211913.jpeg?4"; 
}, function fail() {
    console.log("fail");
    //加加载失败的图片付给img
});

var loadImage2 = loadImageAsync("1.png");
loadImage2.then(function success() {
    console.log("success");
}, function fail() {
    console.log("fail");
});


// 数组去重新思路:  利用set结构不添加重复值
var arr= [2,3,4,5,5,5,6,6,6,'a','a','b','b'];
//生成一个新的map结构，会自动去除重复的元素，再使用扩展运算符，展开map结构里的元素
var newArr = [ ...new Set(arr ) ]
// 方法2：
function dedupe(array) {
  return Array.from(new Set(array));
}

dedupe([1, 1, 2, 3]) // [1, 2, 3]


// 加载script 标签 tx
function loadScript(src,errorCallback, obj) {
  var tag = document.createElement("script");
  tag.type = 'text/javascript';
    tag.charset="utf-8";
    tag.onload = tag.onerror = tag.onreadystatechange = function() {
      if (window[obj]) { // 加载成功
        loadJs.onloadTime = +new Date();
        return;
      }
        if ( !this.readyState ||((this.readyState === "loaded" || this.readyState === "complete")&&!window[obj]) ) {
            errorCallback && errorCallback(); 
            tag.onerror = tag.onreadystatechange = null;
        }
    };
  tag.src = src;
  document.getElementsByTagName("head")[0].appendChild(tag);
};

// 根据毫秒数，格式化日期:
function omateDate(d) {
  var date = new Date(d),
  Y = date.getFullYear() + '-',
  M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-',
  D = date.getDate() + ' ',
  h = date.getHours() + ':',
  m = date.getMinutes() + ':',
  s = date.getSeconds();
  return (Y+M+D+h+m+s); 
}
// 如:  fomateDate(12123242343); = > 2016-06-23 16:12:54
/*  踩坑   */
// 当数字最为js对象的键时，会出现访问不了的情况

var data={
  201701:[
    {a:1,b:2},
    {a:2,b:3},
    {a:3,b:4},
  ],
  201702:[
    {a:11,b:22},
    {a:22,b:33},
    {a:33,b:44},
  ]
};
// data.2017 ->  报错
// data.[2017] ->  可以正常访问到 ,但是无法提前知道键名字是什么的情况下，使用 keys来遍历
// 可行的做法:
for(var key in data){
  console.log(key);
  console.log(data[key])  // -> 这里可以访问到值。
}

/*
  2017年05月18日10:15:11  http://es6.ruanyifeng.com/#docs/reflect 
  下面，使用 Proxy 写一个观察者模式的最简单实现，即实现observable和observe这两个函数。思路是observable函数返回一个原始对象的 Proxy 代理，拦截赋值操作，触发充当观察者的各个函数。
  观察者模式的简单实现
  上面代码中，先定义了一个Set集合，所有观察者函数都放进这个集合。然后，observable函数返回原始对象的代理，拦截赋值操作。拦截函数set之中，会自动执行所有观察者。
*/
const queuedObservers = new Set();

const observe = fn => queuedObservers.add(fn);
const observable = obj => new Proxy(obj, {set:set});

function set(target, key, value, receiver) {
  //Reflect.set方法设置target对象的name属性等于value。 设置属性成功，返回true,否则，返回false
  const result = Reflect.set(target, key, value, receiver);
  console.log( queuedObservers );
  queuedObservers.forEach(observer => observer());
  return result;
}

const person = observable({
  name: '张三',
  age: 20
});

function print() {
  console.log(`${person.name}, ${person.age}`)
}
function print2(){
  console.log('观察者2 ,看到数据改变了....');
}
observe(print);
observe(print2);
person.name = '李四';
// 输出
// 李四, 20
// 观察者2 ,看到数据改变了....


// generate 函数实现完全遍历二叉树:
 http://es6.ruanyifeng.com/#docs/generator
// 下面是二叉树的构造函数，
// 三个参数分别是左树、当前节点和右树
function Tree(left, label, right) {
  this.left = left;
  this.label = label;
  this.right = right;
}

// 下面是中序（inorder）遍历函数。
// 由于返回的是一个遍历器，所以要用generator函数。
// 函数体内采用递归算法，所以左树和右树要用yield*遍历
function* inorder(t) {
  if (t) {
    yield* inorder(t.left);
    yield t.label;
    yield* inorder(t.right);
  }
}

// 下面生成二叉树
function make(array) {
  // 判断是否为叶节点
  if (array.length == 1) return new Tree(null, array[0], null);
  return new Tree(make(array[0]), array[1], make(array[2]));
}
let tree = make([[['a'], 'b', ['c']], 'd', [['e'], 'f', ['g']]]);

// 遍历二叉树
var result = [];
for (let node of inorder(tree)) {
  result.push(node);
}

console.log( result );
// ['a', 'b', 'c', 'd', 'e', 'f', 'g']

/* 检测css3动画结束: */
  
el.addEventListener("transitionend", updateTransition, true);
https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_Transitions/Using_CSS_transitions
http://www.ruanyifeng.com/blog/2014/02/css_transition_and_animation.html

// 生成指定个数不重复的随机数: 2017-06-02 17:56:01
var headArr=document.querySelectorAll('.row .head'),
    randomArr=[];
 
 function newNumber(start,end){  
    return Math.round(Math.random()*(end-start)+start);
 } 
 
 function isHaveThisNumber(para,num){ 
   for(var i=0;i<para.length;i++){  
           if(para[i]==num){  
               return true;
           }  
       }  
       return false;  
 }

function newRandom(start,end,size){  
    var para=[];//目标随机数组  
    var rnum;
    var currentIndex=0;
    for(var i=0;i<size;i++){ //生成 size 个不重复的随机数  
        rnum=newNumber(start,end);
        if(isHaveThisNumber(para,rnum)){
            while(isHaveThisNumber(para,rnum)){
                rnum=newNumber(start,end);
            }  
        }  
        para[currentIndex++]=rnum;//添加到现有数字集合中  
    } 
    console.log(para); 
    return para;  
}  
function changeSrc(){
    var randomArr=newRandom(0,imgArr.length-1,6);
    //console.log(randomArr);
    for(var i=0;i<headArr.length;i++ ){
        headArr[i].src=imgArr[ randomArr[i] ];
    }
}
changeSrc();
// ===========================
//   2017年06月04日20:16:56
//   一个简单的State全局状态管理器的实现:
// 原文: http://www.jianshu.com/p/69dede6f7e5f
// 自执行创建模块
(function() {
    // states 结构预览
    // states = {
    //     a: 1,
    //     b: 2,
    //     m: 30,  
    //     o: {}
    // }
    var states = {};  // 私有变量，用来存储状态与数据

    // 判断数据类型  这个方法貌似不错¡™

    /**
     * @Param name 属性名
     * @Description 通过属性名获取保存在states中的值
    */
    function get(name) {
        return states[name] ? states[name] : '';
    }

    function getStates() {
        return states;
    }

    /*
    * @param options {object} 键值对
    * @param target {object} 属性值为对象的属性，只在函数实现时递归中传入
    * @desc 通过传入键值对的方式修改state树，使用方式与小程序的data或者react中的setStates类似
    */
    function set(options, target) {
        var keys = Object.keys(options);
        var o = target ? target : states;

        keys.map(function(item) {
            if(typeof o[item] == 'undefined') {
                o[item] = options[item];
            }
            else {
                type(o[item]) == 'object' ? set(options[item], o[item]) : o[item] = options[item];
            }
            return item;
        })
    }

    // 对外提供接口
    window.get = get;
    window.set = set;
    window.getStates = getStates;
})()

// 具体使用如下

set({ a: 20 });     // 保存 属性a
set({ b: 100 });    // 保存属性b
set({ c: 10 });     // 保存属性c

// 保存属性o, 它的值为一个对象
set({ 
    o: {
        m: 10,
        n: 20
    }
})

// 修改对象o 的m值
set({
    o: {
        m: 1000
    }
})

// 给对象o中增加一个c属性
set({
    o: {
        c: 100
    }
})
console.log(getStates())

// =========================

// 格式化日期:
// 比如需要这样的格式 yyyy-MM-dd hh:mm:ss

function dataFormat(str){
  var date = new Date(str);
  Y = date.getFullYear() + '-';
  M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
  D = date.getDate() + ' ';
  h = date.getHours() + ':';
  m = date.getMinutes() + ':';
  s = date.getSeconds(); 
  return Y+M+D+h+m+s;
}
var res = dataFormat(1495209600000);
console.log(res);
// 输出结果：2014-04-23 18:55:49



// 一个小小的拖拽代码:2017年06月11日22:33:35
  http://www.jianshu.com/p/cd3fee40ef59

// 获取当前浏览器支持的transform兼容写法
function getTransform() {
    var transform = '',
        divStyle = document.createElement('div').style,
        // 可能涉及到的几种兼容性写法，通过循环找出浏览器识别的那一个
        transformArr = ['transform', 'webkitTransform', 'MozTransform', 'msTransform', 'OTransform'],

        i = 0,
        len = transformArr.length;

    for(; i < len; i++)  {
        if(transformArr[i] in divStyle) {
            // 找到之后立即返回，结束函数
            return transform = transformArr[i];
        }
    }

    // 如果没有找到，就直接返回空字符串
    return transform;
}
function getStyle(elem, property) {
    // ie通过currentStyle来获取元素的样式，其他浏览器通过getComputedStyle来获取
    return document.defaultView.getComputedStyle ? document.defaultView.getComputedStyle(elem, false)[property] 
                            : elem.currentStyle[property];
}
//获取元素样式的方法s
function getStyle2(obj,name) {
  return (obj.currentStyle || getComputedStyle(obj,false) )[name];
}
function getTargetPos(elem) {
    var pos = {x: 0, y: 0};
    var transform = getTransform();
    if(transform) {
        var transformValue = getStyle(elem, transform);
        console.log(transformValue);
        if(transformValue == 'none') {
            elem.style[transform] = 'translate(0, 0)';
            return pos;
        } else {
          //这里有疑问
            var temp = transformValue.match(/-?\d+/g);
            return pos = {
                x: parseInt(temp[4].trim()),
                y: parseInt(temp[5].trim())
            }
        }
    } else {
        if(getStyle(elem, 'position') == 'static') {
            elem.style.position = 'relative';
            return pos;
        } else {
            var x = parseInt(getStyle(elem, 'left') ? getStyle(elem, 'left') : 0);
            var y = parseInt(getStyle(elem, 'top') ? getStyle(elem, 'top') : 0);
            return pos = {
                x: x,
                y: y
            }
        }
    }
}
//设置目标元素的位置方法
// pos = { x: 200, y: 100 }
function setTargetPos(elem, pos) {
    var transform = getTransform();
    if(transform) {
        elem.style[transform] = 'translate('+ pos.x +'px, '+ pos.y +'px)';
    } else {
        elem.style.left = pos.x + 'px';
        elem.style.top = pos.y + 'px';
    }
    return elem;
}



// 绑定在mousedown上的回调，event为传入的事件对象
function start(e) {
  var event =e || window.event;
    // 获取鼠标初始位置
    startX = event.pageX;
    startY = event.pageY;

    // 获取元素初始位置
    var pos = getTargetPos(oElem);

    sourceX = pos.x;
    sourceY = pos.y;

    // 绑定
    document.addEventListener('mousemove', move, false);
    document.addEventListener('mouseup', end, false);
}

function move(event) {
    // 获取鼠标当前位置
    var currentX = event.pageX;
    var currentY = event.pageY;

    // 计算差值
    var distanceX = currentX - startX;
    var distanceY = currentY - startY;

    // 计算并设置元素当前位置
    setTargetPos(oElem, {
        x: (sourceX + distanceX).toFixed(),
        y: (sourceY + distanceY).toFixed()
    })
}

function end(event) {
    document.removeEventListener('mousemove', move);
    document.removeEventListener('mouseup', end);
    // do other things
    console.log('释放了鼠标，拖拽完成....');
}


// 获取目标元素对象
var oElem = document.getElementById('target');

// 声明2个变量用来保存鼠标初始位置的x，y坐标
var startX = 0;
var startY = 0;

// 声明2个变量用来保存目标元素初始位置的x，y坐标
var sourceX = 0;
var sourceY = 0;
oElem.addEventListener('mousedown', start, false);

// 用对象的方法封装:
;
(function() {
    // 这是一个私有属性，不需要被实例访问
    var transform = getTransform();

    function Drag(selector) {
        // 放在构造函数中的属性，都是属于每一个实例单独拥有
        this.elem = typeof selector == 'Object' ? selector : document.getElementById(selector);
        this.startX = 0;
        this.startY = 0;
        this.sourceX = 0;
        this.sourceY = 0;

        this.init();
    }


    // 原型
    Drag.prototype = {
        constructor: Drag,

        init: function() {
            // 初始时需要做些什么事情
            this.setDrag();
        },

        // 稍作改造，仅用于获取当前元素的属性，类似于getName
        getStyle: function(property) {
            return document.defaultView.getComputedStyle ? document.defaultView.getComputedStyle(this.elem, false)[property] : this.elem.currentStyle[property];
        },

        // 用来获取当前元素的位置信息，注意与之前的不同之处
        getPosition: function() {
            var pos = {x: 0, y: 0};
            if(transform) {
                var transformValue = this.getStyle(transform);
                if(transformValue == 'none') {
                    this.elem.style[transform] = 'translate(0, 0)';
                } else {
                    var temp = transformValue.match(/-?\d+/g);
                    pos = {
                        x: parseInt(temp[4].trim()),
                        y: parseInt(temp[5].trim())
                    }
                }
            } else {
                if(this.getStyle('position') == 'static') {
                    this.elem.style.position = 'relative';
                } else {
                    pos = {
                        x: parseInt(this.getStyle('left') ? this.getStyle('left') : 0),
                        y: parseInt(this.getStyle('top') ? this.getStyle('top') : 0)
                    }
                }
            }

            return pos;
        },

        // 用来设置当前元素的位置
        setPostion: function(pos) {
            if(transform) {
                this.elem.style[transform] = 'translate('+ pos.x +'px, '+ pos.y +'px)';
            } else {
                this.elem.style.left = pos.x + 'px';
                this.elem.style.top = pos.y + 'px';
            }
        },

        // 该方法用来绑定事件
        setDrag: function() {
            var self = this;
            this.elem.addEventListener('mousedown', start, false);
            function start(event) {
                self.startX = event.pageX;
                self.startY = event.pageY;

                var pos = self.getPosition();

                self.sourceX = pos.x;
                self.sourceY = pos.y;

                document.addEventListener('mousemove', move, false);
                document.addEventListener('mouseup', end, false);
            }

            function move(event) {
                var currentX = event.pageX;
                var currentY = event.pageY;

                var distanceX = currentX - self.startX;
                var distanceY = currentY - self.startY;

                self.setPostion({
                    x: (self.sourceX + distanceX).toFixed(),
                    y: (self.sourceY + distanceY).toFixed()
                })
            }

            function end(event) {
                document.removeEventListener('mousemove', move);
                document.removeEventListener('mouseup', end);
                // do other things
            }
        }
    }

    // 私有方法，仅仅用来获取transform的兼容写法
    function getTransform() {
        var transform = '',
            divStyle = document.createElement('div').style,
            transformArr = ['transform', 'webkitTransform', 'MozTransform', 'msTransform', 'OTransform'],

            i = 0,
            len = transformArr.length;

        for(; i < len; i++)  {
            if(transformArr[i] in divStyle) {
                return transform = transformArr[i];
            }
        }

        return transform;
    }

    // 一种对外暴露的方式
    window.Drag = Drag;
})();

// 使用：声明2个拖拽实例
new Drag('target');
new Drag('target2');

/* 利用动态加载script的方式 发送get请求 --（ 实质上是动态加载脚本 ） */
function Myload(B, A){
  this.done = false;
  B.onload = B.onreadystatechange = function() {
    if (!this.done && (!this.readyState || this.readyState === "loaded" || this.readyState === "complete")) {
      this.done = true;
      A();
      B.onload = B.onreadystatechange = null;
    }
  };
}

function loadScript(A, id, C) {
  var B = function() {};
  if (C !== undefined) {
    B = C;
  }
  if (!document.getElementById(id)) {
    var D = document.createElement("script");
    D.setAttribute("src", A);
    D.setAttribute("id", id);
    document.body.appendChild(D);
    this.Myload(D, B);
  } else {
    B();
  }
}

var url='http://116.62.28.97:9012/v1/c6/add_card_qrcode?callback=callback&code=123&type=999&style=5';
loadScript(url,'script00111222322',function(){
    alert('加载成功!');
});

function callback(data){
    alert(JSON.stringify(data));
}

/*  元素外发光的虚线 */
var xkXian = function () {
       var body = document.querySelector('body');
       var style = '<style id="xm" media="screen">* {outline: 1px red dashed!important;} </style>'
       var i = true;
       body.insertAdjacentHTML('afterbegin', style);
       body.addEventListener('keydown', function (event) {
         if (event.keyCode === 77 && event.ctrlKey) {
           if (i) {
             var styletog = document.querySelector('#xm')
             styletog.remove()
             i= false
           }else {
             i = true
             body.insertAdjacentHTML('afterbegin', style);
           }
         }
       })
     }
xkXian();

// 数组的map 方法:
const numbers = [1, 2, 3, 4, 5];
// 第一个参数为回调函数，第二个参数为指定回调函数的this值
let arr = numbers.map((currentValue, index, array) => {
    console.log(`currentValue = `, currentValue);
    console.log(`index = `, index);
    console.log(`array= `, array);
    return currentValue * 2;
}, numbers);

console.log(`arr `, arr);
    
    //根据时间戳，转换为剩余的天，时，分，秒
     function resetTime(time) {
        time = parseInt(time) + ''
        if (time.length < 2) {
          return '0' + time
        } else {
          return time
        }
      }
      function getTimeStr(timeStr){
        var remain = {
          time: parseInt(timeStr/1000),
          h: 0,
          m: 0,
          s: 0,
        };
        remain.h = this.resetTime(remain.time / (60 * 60));
        remain.m = this.resetTime(remain.time % (60 * 60) / 60);
        remain.s = this.resetTime(remain.time % 60);
        if(parseInt(remain.h)  > 24) {
          var day = Math.floor( parseInt(remain.h) /24 ),
              hour = parseInt(remain.h) % 24;
          return day+'天'+hour +'时'+ remain.m +'分'+remain.s+'秒';
        }
        return remain.h +'时'+ remain.m+'分'+remain.s+'秒';
      }

/**
 *  时间戳-> 时间
 * @param {*} timeStamp 
 */
function getDate(timeStamp) {
    var Y,M,D,h,m,s;
    var date = new Date(timeStamp);
    Y = date.getFullYear() + '-';
    M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
    D = date.getDate() + ' ';
    h = date.getHours() + ':';
    m = date.getMinutes() + ':';
    s = date.getSeconds(); 
    return Y+M+D+h+m+s;
}
var res = getDate(1504595190000);
console.log(res);


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


// 一般的模块化写法 2017年11月13日22:48:49

(function(root, factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        module.exports = factory();
    } else if (typeof define === 'function' && define.amd) {
        define(factory);
    } else {
        root.$ = factory();
    }
})(this, function() {
    // 模块主体

});


    // 网易rem 方案
    !function(doc, win){
      var n = doc.documentElement,
       event = "orientationchange"in window ? "orientationchange":"resize",
      // MSStream 是Ie下的一个Dom对象
      // d=(/iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream,
      // 这段话貌似没有什么实质性的含义, 就是为了语法不报错，在后面定义一个函数???
      d=(/iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream,
      function(){
        var t=n.clientWidth;
        t && (t >= 750 ? (t=750,doc.body.style.width="750px"):
            doc.body.style.width = t+"px",
            n.style.fontSize=100*(t/750)+"px",
        
        n.dataset.width = t,
        n.dataset.percent=100 * (t / 750));

      });
      d(),
      doc.documentElement.classList.add("iosx" + win.devicePixelRatio),
      doc.addEventListener  &&  win.addEventListener(event, d, false);

      }(document, window);



// js 生成随机字符串:
// randomStr(10) 传入随机字符串的长度
 function randomStr(len) {
    var d,
        e,
        b = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
        c = "";
        for (d = 0; len > d; d += 1){
            e = Math.random() * b.length, e = Math.floor(e), c += b.charAt(e);
        }
        return c;
  }

  /*
    比较笨的方法， 计算剩余的天数，时，分，秒
  var timeObj = {
    day: 0,
    hour: 0,
    minute: 0,
    senconds: 0,
  };
  // 根据时间戳，转换成 时分秒
  function getLeftTime(time) {
     // 100800 s
      // 2 天 14 小时 15分 40 秒 10087
      var day = Math.floor(time / (24*60*60));
      var hour = Math.floor((time - (day * 24 * 60 * 60)) / (60 * 60));
      var minute = Math.floor((time- (day * 24 * 60 * 60)- (hour * 60 * 60)) / 60 );
      var senconds = Math.floor((time- (day * 24* 60 * 60)- (hour * 60 * 60)-(minute * 60)) % 60 );
      timeObj = {
        day,
        hour,
        minute,
        senconds,
      };
      setZero(timeObj);
      return timeObj;
  }
  function setZero(timeObj) {
     for (var p in timeObj) {
        if(timeObj[p] < 10) {
          timeObj[p] =  '0' + timeObj[p];
        } else {
          timeObj[p] = '' + timeObj[p];
        }
     }
  }

  var timeObj = getLeftTime(100870);
  console.log('timeObj:', timeObj);


  */

// 版本2, 计算倒计时的天，时，分， 秒
function setZero(timeObj) {
    for (var p in timeObj) {
       if(timeObj[p] < 10) {
         timeObj[p] =  '0' + timeObj[p];
       } else {
         timeObj[p] = '' + timeObj[p];
       }
    }
 }

 var remain = {
   d: 0,
   h: 0,
   m: 0,
   s: 0,
 };
 var remainTime = {
    time: 100870,
 };
function getLeftTime(isUseDay = false){
   remain.h =  Math.floor(remainTime.time / (60 * 60));
   remain.m =  Math.floor((remainTime.time % (60 * 60)) / 60);
   remain.s = remainTime.time % 60;
   // 大于24小时，则用天来表示
   if(isUseDay && remain.h > 24) {
     remain.d = Math.floor(remain.h / 24),
     remain.h = remain.h % 24 ;
   }
   setZero(remain);
   return remain;
}

 var timeObj = getLeftTime(false);
 console.log('timeObj:', timeObj);

 /*
     https://microzz.com/2017/03/05/func/
    利用偏函数来实现一个简单的类型判断
    偏函数的定义:  假设有一个参数或变量已经预置的函数A，我们通过调用A来产生一个新的函数B，函数B就是我们说的偏函数。
 */
    var isType = function(type){
      return function(obj) {
        return toString.call(obj) === '[object '+ type +']';
      } 
    }
    // 定制新的函数
    var isString = isType('String');  // isString 就称为偏函数
    var isArray = isType('Array');
    var isFunction = isType('Function');

    // 测试偏函数
    console.log(isString('abc')); // true
    console.log(isArray([1, 2])); // true
    console.log(isFunction('abc')); // false
 // =============================
 // ============ node.js 版本号比较:=================
 function compareVersion(v1, v2) {
    v1 = v1.split('.')
    v2 = v2.split('.')
    var len = Math.max(v1.length, v2.length)
  
    while (v1.length < len) {
      v1.push('0')
    }
    while (v2.length < len) {
      v2.push('0')
    }
  
    for (var i = 0; i < len; i++) {
      var num1 = parseInt(v1[i])
      var num2 = parseInt(v2[i])
  
      if (num1 > num2) {
        return 1
      } else if (num1 < num2) {
        return -1
      }
    }
    return 0
  }
  
  compareVersion('1.11.0', '1.9.9') // => 1 // 1表示 1.11.0比1.9.9要新
 // =============================
 // =============== 超长型字符串整数相加  ==============
 function addBigSting(v1, v2) {
    v1 = v1.split('')
    v2 = v2.split('')
    var len = Math.max(v1.length, v2.length)
    var arr = [], node = 0;
    while (v1.length < len) {
      v1.unshift('0')
    }
    while (v2.length < len) {
      v2.unshift('0')
    }
    // 将字符串分割成数组， 找出两个数组的长度最长的， 在另一个数组前面补0， 这样方便按位相加，  然后各位相加， 最高位特殊处理， 大于10 进一位，然后反转数组， 转换成字符串

   //  v1 ['1','2', '0'] v2: ['3', '4','1']
    for (var i = len-1; i > 0 ; i--) {
       var res = ~~v1[i]+~~v2[i];
       if ( res >= 10) {
         arr.push(res % 10);
         node = 1;
       } else {
         arr.push(res);
         node = 0;
       }
       
    }
    // 最高位特殊处理:
    if( ~~v1[0] + ~~v2[0] + node > 10) {
      arr.push((~~v1[0] + ~~v2[0] + node) % 10);
      arr.push('1'); // 最高位加1
    } else {
      arr.push((~~v1[0] + ~~v2[0] + node) % 10);
    }
    return arr.reverse().join('');
  }
  var num1 = [19], num2 = [12];
  for (var j = 0 ; j < 100; j++) {
    num1.push(0);
    num2.push(0);
  }

  console.log(addBigSting(num1.join(''), num2.join('')));

 // =================================
 // ================ 利用generator  函数扁平化数组 =================
    // http://es6.ruanyifeng.com/#docs/generator
    function* iterTree(tree) {
        if (Array.isArray(tree)) {
        for(let i=0; i < tree.length; i++) {
            yield* iterTree(tree[i]);
        }
        } else {
        yield tree;
        }
    }
    
    const tree = [ 'a', ['b', 'c'], ['d', 'e'], [{a: 1}, {b: 2}] ];
    var newArr = [];
    for(let x of iterTree(tree)) {
     // console.log(x);
     newArr.push(x);
    }
    console.log(newArr);
 // =================================