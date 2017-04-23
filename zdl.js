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
