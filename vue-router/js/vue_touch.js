/**
 *  原文地址：https://github.com/904790204/vue-touch/blob/master/vue-touch.html
 *  官方文档： https://cn.vuejs.org/v2/guide/custom-directive.html
 *  2018年09月15日17:45:24
 * @param {DOM} el 
 * @param {*} binding 
 * @param {Stirng} type 
 */
function vueTouch(el, binding, type) {
  var _this = this;
  this.obj = el;
  this.binding = binding;
  this.touchType = type;
  this.vueTouches = {x: 0, y: 0};
  this.vueMoves = true;
  this.vueLeave = true;
  this.longTouch = true;

  //这里可以优化，判断传入的值是否是函数
  this.vueCallBack=typeof(binding.value) == "object" ? binding.value.fn: binding.value;
  // 监听手机滑动事件
  this.obj.addEventListener("touchstart", function(e) {
    _this.start(e);
  },false);
  this.obj.addEventListener("touchend",function(e) {
    _this.end(e);
  },false);
  this.obj.addEventListener("touchmove",function(e) {
    _this.move(e);
  },false);

}
vueTouch.prototype = {
  start: function(e) {
    this.vueMoves = true;
    this.vueLeave = true;
    this.longTouch = true;
    // 记录开始滑动的坐标- 输出看下
    console.log('开始滑动:',e);
    this.vueTouches = {x: e.changedTouches[0].pageX, y: e.changedTouches[0].pageY};
    // 判断是否是长按
    this.time = setTimeout(function() {
      if (this.vueLeave && this.vueMoves) {
        this.touchType == "longtap" && this.vueCallBack(this.binding.value, e);
        this.longTouch = false;
      }
    }.bind(this), 1000);
  },
  end: function(e) {
    var disX = e.changedTouches[0].pageX-this.vueTouches.x;
    var disY = e.changedTouches[0].pageY-this.vueTouches.y;
    console.log('滑动结束: disX, disY',e, disX, disY);
    clearTimeout(this.time);
    // 判断滑动方向-当横向位移大于10，纵向位移大于100，则判定为滑动事件
    if(Math.abs(disX) > 10 || Math.abs(disY) > 100){
      // 触发滑动事件，不管是上下滑动还是左右滑动
      this.touchType == "swipe" && this.vueCallBack(this.binding.value, e);
      if(Math.abs(disX) > Math.abs(disY)) { // //判断是横向滑动还是纵向滑动
        // 水平滑动
        if(disX > 10) {
          // console.log('水平滑动-右滑动.....');
          this.touchType === "swiperight" && this.vueCallBack(this.binding.value, e);
        };
        if(disX < -10) {
          // console.log('水平滑动左滑动.....');
          this.touchType === "swipeleft" && this.vueCallBack(this.binding.value, e);
        };
      } else {
        // 上下滑动
        if(disY > 10) {
          this.touchType=="swipedown" && this.vueCallBack(this.binding.value, e);
        };
        if(disY < -10) {
          this.touchType=="swipeup" && this.vueCallBack(this.binding.value, e);
        };  
      }
    } else { // 为点击事件
      if(this.longTouch && this.vueMoves) {
        this.touchType === "tap" && this.vueCallBack(this.binding.value, e);
        this.vueLeave = false;
      };
    }

  },
  move: function(e) {
    this.vueMoves = false;
    console.log('滑动中:',e);
  },
};

// 注册Vue自定义指令
Vue.directive("tap",{
  bind: function(el,binding){
    new vueTouch(el, binding, "tap");
  }
});
Vue.directive("swipe",{
  bind: function(el, binding) {
    new vueTouch(el, binding, "swipe");
  }
});
Vue.directive("swipeleft",{
  bind: function(el, binding) {
    new vueTouch(el, binding, "swipeleft");
  }
});
Vue.directive("swiperight", {
  bind: function(el, binding) {
    new vueTouch(el, binding, "swiperight");
  }
});
Vue.directive("swipedown", {
  bind: function(el, binding) {
    new vueTouch(el, binding, "swipedown");
  }
});
Vue.directive("swipeup",{
  bind: function(el, binding) {
    new vueTouch(el,binding, "swipeup");
  }
});
Vue.directive("longtap",{
  bind: function(el, binding) {
    new vueTouch(el,binding, "longtap");
  }
});