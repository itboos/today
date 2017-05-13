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
data.['2017'] ->  undefined 
可行的做法:
for(var key in data){
  console.log(key);
  console.log(data[key])  -> 这里可以访问到值。
}