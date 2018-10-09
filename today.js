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
  6. 404 页面刚刷新，logo 不见得问题

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
  4. 首页的一些改动 底部的菜单添加商务合作，nav 里的英文字母的字体改为14px done

  https://36kr.com/p/5107277.html
  http://news.winshang.com
  https://www.pingwest.com/a/89737

  9.25: 
   1. 媒体报道剩余页 done
   2. 超猩社区页 done 差研究接口
   3. 招聘首页 done
   4. 不存在的路由 404 组件 done
   5. 修改后的底部 done
   6. 文章分享到微信，朋友圈的方法

  9.26:
    1. 文章接口
       问题：  1. post 和page 的区别是什么？ 看之前用的是page
              2. 如何设置文章的slug, 默认的是文章的标题
              post 可以设置目录和标签， 而文章不行. 标签和目录返回的都是数字，可以手动定义么
              3. 如何获取所有的标签， 先写死？ wordpress 有接口返回么?


       正式接口: https://www.supermonkey.com.cn
       获取所有的posts:
       http://wordpress.supermonkey.com.cn/wp-json/wp/v2/posts
       获取所有的pages:
       http://wordpress.supermonkey.com.cn/wp-json/wp/v2/pages

       获取所有的目录：
       http://wordpress.supermonkey.com.cn/wp-json/wp/v2/categories
       获取所有的标签:
       http://wordpress.supermonkey.com.cn/wp-json/wp/v2/tags

       推荐是根据标签还是目录来过滤的？

       过滤文章：
       根据标签来过滤文章:
       http://wordpress.supermonkey.com.cn/wp-json/wp/v2/posts?tag=6
       根据slug来过滤文章： 
       http://wordpress.supermonkey.com.cn/wp-json/wp/v2/posts?=slug=%E6%B5%8B%E8%AF%95%E8%B6%85%E7%8C%A9%E7%A4%BE%E5%8C%BA%E6%96%87%E7%AB%A0%E6%A0%87%E9%A2%98-1

     超猩社区文章: 
     http://test9.supermonkey.com.cn/pc/sm/article?slug=aaaaa 根据slug 去区分文章

    3. 招聘首页 done
    4. 不存在的路由 404页面 组件 done

    5. 文章页内容获取的接口 todo 
     超猩社区: 先获取所有的目录列表，然后找到名为 超猩社区的目录，拿到目录ID, 在 根据目录ID 去哪文章列表
     标签的话，获取所有的标签，显示出来？ 点击后根据标签过滤文章？？？
     返回的tags 是数字

    5. 看下路由懒加载

    5. 关于我们页面
    5. 修改后的底部
    6. 文章分享到微信，朋友圈的方法

    


    9.27: 
    1. 修改底部 done
    2. 超猩学院 -monkeyCollege done

    9.28: 
    1. 招聘页 2个大页面
    2. 关于我们页
    3. 整理需要背景图的地方，找设计要，记录下没写和要换背景图的地方
       1. 职能招聘底部的背景， 二维码左右的箭头
       https://txt2pic.bannedbook.org/img/15381277324053.gif
    9.29:
     1. 职能招聘页
     2. 关于我们页
     3. EP 沟通视频，文章，和图片的给定时间
     4. 打包后的问题

    9.30 
     1. 招聘页的完成 done
     2. 打包出的问题(放在跟目录下没问题)
     3. 首页-视频页（底部的黑边问题)
    
  官网问题：
  1. 关于我们介绍页 -2017年的内容和设计没有 -小明

  10.8: 
   官网相关的问题：
   1. 首页-视频页（底部的黑边问题) -未复现了
   2. 关于我们介绍页 -2017年的内容和设计没有 -小明
   3. 官网给设计验收, 列出存在的问题(等静态Icon 替换后，再给) 未  1
   4. footer 底部的logo 用图片
   5. 一些其余用到的图片上传到cdn, 拿到图片地址
   6. Pc 官网 index.html 的描述 done
   7. 关于我们 年份介绍的 左滑 右滑 - 有疑惑-问下
   8. 发送需要的图标给设计 done
   9. 更新已经有的图片，拿到图片CDN地址
   10.job 页 菜单 -差猩猩管家的菜单
   11. 菜单logo 不显示的问题
   12. faq 内容的补充. done

   剩余问题：
    1. 首页门店的 接口，和点击进去的子页面的门店列表接口一样
    2. 超猩社区的文章接口，标签接口， 分享文章到微信的接口
    3. 一些之前没传的固定图片的更改
  
    10.09:
     1. 首页接口的定义形式和后台约定, 改成首页获取数据，后面每次传给子组件.
     2. 拿到图片Icon， 拿到cdn 地址，更换图片 done
     3. 官网给设计验收, 列出存在的问题(等静态Icon 替换后，再给)
     4. 图片，视频， 社区文章给的时间
     5. 文章分享页的 图片滑动， 微信分享形式， 微博分享形式.
     6. 招聘页的链接找谁拿.done
     7. 门店的中英文如何显示的问题（PM）, 设计里没有体现（UI） PC端样式先不用英文的样式. done
     8. 社区文章的展示，引入cms 里面, 引入样式

     微博分享链接：
     http://service.weibo.com/share/share.php?title=%23%E6%8B%89%E5%8B%BE%E7%BD%91%E4%BC%98%E8%B4%A8%E4%BC%81%E4%B8%9A%23%E6%88%91%E5%9C%A8%E6%8B%89%E5%8B%BE%E7%BD%91%E5%8F%91%E7%8E%B0%E8%B6%85%E7%BA%A7%E7%8C%A9%E7%8C%A9%E5%81%A5%E8%BA%AB%EF%BC%8C%E8%BF%99%E5%AE%B6%E5%85%AC%E5%8F%B8%E5%BE%88%E8%B5%9E%EF%BC%8C%E4%BB%96%E4%BB%AC%E5%BE%88%E5%A4%9A%E8%81%8C%E4%BD%8D%E5%9C%A8%E6%89%BE%E7%89%9B%E4%BA%BA%EF%BC%8C%E5%A6%82%E6%9E%9C%E4%BD%A0%E5%AF%B9%E8%BF%99%E5%AE%B6%E5%85%AC%E5%8F%B8%E6%84%9F%E5%85%B4%E8%B6%A3%EF%BC%8C%E5%BF%AB%E6%9D%A5%E7%9C%8B%E7%9C%8B%E6%9C%89%E6%B2%A1%E9%80%82%E5%90%88%E4%BD%A0%E7%9A%84%E8%81%8C%E4%BD%8D%E5%90%A7%EF%BC%81&
     url=https%3A%2F%2Fwww.lagou.com%2Fgongsi%2F70395.html
     &appkey=3761453225&
     pic=https%3A%2F%2Fwww.lagou.com%2Fi%2Fimage%2FM00%2F16%2F9C%2FCgpFT1j9rAqAIj3fAABIIWZFhK0392.png#_loginLayer_1539054702404











  9.23:
  redux设计思想:
  https://www.mtyun.com/library/redux-design-code
  https://www.mtyun.com/library/redux-design-code

  9.27:
  1. westore 世界上最小却强大的小程序框架 - 100多行代码搞定全局状态管理和跨页通讯
   https://github.com/dntzhang/westore
  2. 腾讯omi 框架：
  https://github.com/Tencent/omi
  3. redux源码分析
  http://web.jobbole.com/91362/

  10.03:
  Vue.js 技术揭秘
  https://ustbhuangyi.github.io/vue-analysis/extend/tansition.html#transition-module
  10.08 
  svg 入门：
  https://developer.mozilla.org/zh-CN/docs/Web/SVG/Tutorial/Getting_Started
  https://developer.mozilla.org/zh-CN/docs/Web/SVG
 */