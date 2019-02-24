(function () {
  function init(){
    var docEl = document.documentElement;

    window.addEventListener('resize', function () {
      refreshRem(docEl);
    });

    refreshRem(docEl);
  }
  function refreshRem(docEl){
    var width = docEl.getBoundingClientRect().width;
    if (width > 720) {
      // 最大宽度
      width = 720;
    }
    var rem = width / 20; // 将屏幕宽度分成20份， 1份为1rem
    docEl.style.fontSize = rem + 'px';
  }
  init();
})();