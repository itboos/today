/*  2017年04月23日09:54:28 一些代码的积累*/
利用Promise 实现一个图片懒加载的功能:
  1.有加载中的占位图片的显示
  2.加载失败，显示加载失败占位符
  3.在DOM加载之后再加载图片，要懒加载的图片加上data-src属性，等真正的图片加载完成之后，再替换默认的图片

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


数组去重新思路:  利用set结构不添加重复值
var arr= [2,3,4,5,5,5,6,6,6,'a','a','b','b'];
//生成一个新的map结构，会自动去除重复的元素，再使用扩展运算符，展开map结构里的元素
var newArr = [ ...new Set(arr ) ]
方法2：
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
fomateDate (d) {
  var date = new Date(d),
  Y = date.getFullYear() + '-',
  M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-',
  D = date.getDate() + ' ',
  h = date.getHours() + ':',
  m = date.getMinutes() + ':',
  s = date.getSeconds();
  return (Y+M+D+h+m+s); 
},
如: fomateDate(12123242343); = > 2016-06-23 16:12:54
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
data.2017 ->  报错
data.[2017] ->  可以正常访问到 ,但是无法提前知道键名字是什么的情况下，使用 keys来遍历
可行的做法:
for(var key in data){
  console.log(key);
  console.log(data[key])  -> 这里可以访问到值。
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


generate 函数实现完全遍历二叉树:
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
  2017年06月04日20:16:56
  一个简单的State全局状态管理器的实现:
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



