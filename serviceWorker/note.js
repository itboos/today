// ServiceWorker 的一些笔记:
// https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API
// 在non-window上下文的环境中，我们可以使用self来表示全局作用域，注意，只能是光秃秃的self，window.self这样的写法是不行的。

// serviceWorker 的生命周期为： installing → installed → activating → activated。
/*
  捕获响应的事件：
  self.addEventListener('install', function(event) {  安装后...  });
  self.addEventListener('activate', function(event) {  激活后... });
  self.addEventListener('fetch', function(event) {  请求后... });
  'install'用来缓存文件，'activate'用来缓存更新，'fetch'用来拦截请求直接返回缓存数据


  PWA的核心技术包括：PWA全称为“Progressive Web Apps”，渐进式网页应用。功效显著，收益明显

    Web App Manifest – 在主屏幕添加app图标，定义手机标题栏颜色之类
    Service Worker – 缓存，离线开发，以及地理位置信息处理等
    App Shell – 先显示APP的主结构，再填充主数据，更快显示更好体验
    Push Notification – 消息推送，之前有写过“简单了解HTML5中的Web Notification桌面通知”

*/