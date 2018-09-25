/**
 *  同步一些设置 2018-09-04 17:55:25 同步文件
 *  
 *  
 * 
    1.  redux 学习资料合集： https://redux.js.org/introduction/ecosystem
    2. redex 英文文档： https://redux.js.org/introduction
    3. redux 中文文档： https://cn.redux.js.org/
    4. 阮一峰redux 教程：
    http://www.ruanyifeng.com/blog/2016/09/redux_tutorial_part_one_basic_usages.html
    下载redux 的GitHub的源码： 里面包含了一些demo
    git clone https://github.com/reactjs/redux.git 
    redux 源码： https://unpkg.com/redux@4.0.0/
    https://unpkg.com/redux@4.0.0/dist/redux.js
    比较强的：
    https://github.com/ecmadao/Coding-Guide/blob/master/Notes/React/Redux/Redux%E5%85%A5%E5%9D%91%E8%BF%9B%E9%98%B6-%E6%BA%90%E7%A0%81%E8%A7%A3%E6%9E%90.md
   
  9.05：
  JavaScript的不可变集合
  创建后不可更改不可变数据，从而使应用程序开发更简单，无需防御性复制，并且可以通过简单的逻辑实现高级存储和更改检测技术。
  持久性数据提供了一个可变API，它不会就地更新数据，而是始终产生新的更新数据。
  1.http://facebook.github.io/immutable-js/
  GitHub： https://github.com/facebook/immutable-js/

  React 官方文档：
  https://reactjs.org/docs/refs-and-the-dom.html
  
  https://reactjs.org/docs/refs-and-the-dom.html

  propo-type: Runtime type checking for React props and similar objects.
  https://www.npmjs.com/package/prop-types
  Selector library for Redux：

  https://github.com/reduxjs/reselect
  
  Less 中文文档：
  http://www.css88.com/doc/less/features/
  https://less.bootcss.com/features/ 英文文档

  React - gatsbyjs: 构建 pc站：
  https://www.gatsbyjs.org/tutorial/part-three/
  几个用到的库：
   1. removedev: https://www.npmjs.com/package/remotedev-server
   2. ramda: 一款实用的 JavaScript 函数式编程库。
      https://www.npmjs.com/package/ramda 
      github: https://github.com/ramda/ramda
      中文文档： http://ramda.cn/
   3. moment: 一个轻量级的JavaScript日期库，用于解析，验证，操作和格式化日期
   https://www.npmjs.com/package/moment

  vscode 快捷键：
  1. control + alt + i 插入作者信息

  9.07:
  wepy 官方文档：
  https://tencent.github.io/wepy/document.html#/
  一些框架常见的问题解决方法：
  github: https://github.com/Tencent/wepy/wiki/WePY-%E4%BD%BF%E7%94%A8less-autoprefix
  
  前端页面预处理:
  https://github.com/chrisvfritz/prerender-spa-plugin/tree/master/examples/create-react-app-eject
  9.07：
   比较好博客：
   https://blog.sessionstack.com/how-javascript-works-under-the-hood-of-css-and-js-animations-how-to-optimize-their-performance-db0e79586216


  PC 官网：
  1.  相应式的处理
  2. css 动画
    vue 做官网的限制
    PC 站点预渲染：
    https://github.com/chrisvfritz/prerender-spa-plugin
   9.11:

  可以看的:
    官网demo:
    http://www.bstcine.com/
    2. redux.js 源码学习：
    https://juejin.im/post/5b9617835188255c781c9e2f
    3.css 添加浏览器 前缀:
    https://github.com/postcss/autoprefixer
    4. immutable  入坑指南
    http://www.aliued.com/?p=4175
    React源码分析-ant-H5
    https://www.yuque.com/ant-h5/react/ygoa2g

  9.12:
   Shadow DOM v1：独立的网络组件:
   https://developers.google.com/web/fundamentals/web-components/shadowdom?hl=zh-cn#_3
   谷歌浏览器开启显示shadow dom:

  9.18:
  loadscript 各种方法：
  https://github.com/letiantian/how-to-load-dynamic-script

  官网存在的问题：
  1.transtion slide 开启动画不显示的问题
  2. 打包后，文件路径出错的问题， 1开始时绝对路径，后来改成相对路径，然后路径也不对
  3. 首页底部的菜单差一个  商务合作的菜单
  4. 商务合作，和其它子页面顶部的头部可能需要轮播图的形式
  5. fullpage.css 在main.js 里引入了，可以删除pc 上引入的文件

  9.19: 上午开会 下午开会

  9.20:
  上午:
  2. 门店轮播图样式修改
  4. 轮播图的切换按钮上传到服务器, done (使用了本地图片)
  5. 建立任务列表 done


  下午:
  4.  FAQ页
  5.  媒体报道页
  
  任务列表:
  1. PC官网首页
  2. PC 商务合作页
  3. FAQ页
  4. 媒体报道页，创投商机，生活方式
  5. 超猩社区，单篇文章

  注意事项：
  1. 建立任务时把还没开始的也写上
  2. UI 小改动修改完成后同步给 UI
  

  9.21:
  1. FAQ页 done
  2. 媒体报道页，创投商机，生活方式 done
  3. 商务合作页 bscooperation done
  4. 首页的一些改动 底部的菜单添加商务合作，nav 里的英文字母的字体改为14px

  https://36kr.com/p/5107277.html
  http://news.winshang.com
  https://www.pingwest.com/a/89737

  9.25: 
   1. 媒体报道剩余页 done
   2. 超猩社区页 done 差研究接口
   3. 招聘首页
   4. 不存在的路由 404 组件
   5. 修改后的底部
   6. 文章分享到微信，朋友圈的方法

  9.23:
  redux设计思想:
  https://www.mtyun.com/library/redux-design-code
  https://www.mtyun.com/library/redux-design-code
 */