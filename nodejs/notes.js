/* node js 笔记相关 */
/*
  2018年02月25日17:04:42
  nodejs相关博客:
  http://cnodejs.org/
  node 调试工具 devtool:


  1.编程基础#如何在OS X下创建并运行一个shell脚本
  https://www.jianshu.com/p/60d240383180
  
  
  2. linux 文件权限基础
  https://askubuntu.com/questions/229589/how-to-make-a-file-e-g-a-sh-script-executable-so-it-can-be-run-from-termina
  http://blog.csdn.net/haydenwang8287/article/details/1753883
  
  
  3. node js创建一个命令行工具
    1.chmod u+x xxx.sh
    给当前文件加可执行权限。
    2.在脚本中第一行加入 #!/usr/bin/env bash
    当直接当脚本运行时，告诉操作系统用bash解释器。
    3.export PATH="$PATH:." 加入~/.bashrc
    将“.”即当前目录加入你的$PATH，这样搜索可执行文件时才能找到你的脚本。
     输入一段脚本，

   更改文件的可执行属性
   在脚本的目录下: ./XXX.sh 
   使得某个文件可以在用户的任何地方执行:
   profile、bash_profile、bashrc文件的作用与区别:
   强: https://itbilu.com/linux/management/NyI9cjipl.html
   修改 bash_profile文件:
   加入:
   export PATH=${PATH}:/Users/xueqi/Desktop/git/today/nodejs/demos
   
   添加环境变量后，需要重新登录才能生效，也可以使用source命令强制立即生效：
   使用source命令强制立即生效：
   source  ~/.bash_profile

   调试工具:
   1. node-inspector:
   https://github.com/node-inspector/node-inspector
   2. devtool 更好用
   https://github.com/Jam3/devtool


   NPM知识:
    npm list 列出所有包的信息
    npm list *** 列出指定包的信息
    1.安装指定版本的包:

    npm install <name>@<version>
    # e.g. to install version 4.11.1 of the package lodash
    npm install lodash@4.11.1
    2.安装最新的包:

    npm install <name>@latest
    3. packages from a specific repository
    npm install --registry=http://myreg.mycompany.com <package name>
    4. 安装包并且保存依赖:

    npm install --save <name> # Install dependencies # or
    npm install -S <name> # shortcut version --save # or
    npm i -S <name>
    保存开发依赖:
    npm install --save-dev <name> # Install dependencies for development purposes # or
    npm install -D <name> # shortcut version --save-dev
    # or
    npm i -D <name>

    5.全局安装包:
    npm install --global <name> # or
    npm install -g <name>
    # or
    npm i -g <name>
    # e.g. to install the grunt command line tool
    npm install -g grunt-cli

    6. 卸载包:
     npm uninstall --save <package name>
     npm remove <package name> 
     npm rm <package name>
     npm r <package name>
     在package.json里页保存修改:
     npm uninstall --save <package name>
     npm uninstall -S <package name>

     npm uninstall --save-dev <package name> 
     npm uninstall -D <package name>
     卸载全局的包:
     npm uninstall -g <package name>

     6.1 更新某个包:
     npm update <packgae name> 
     npm update <package name> --save
    
    7.npm package 配置:
     在项目的根目录里使用:
     npm init ： 初始化配置

     一切都使用默认的配置:
     npm init --yes
     npm init -y
     这就会把配置信息写入到package.json 里

    8. 执行脚本:
    "scripts": {
      "start": "echo hello!",
      "say": "echo hi..",
    }
     使用 ：同时执行两个脚本:
     npm run start && npm run say
    9. 锁定特定的包使用某个版本:
    npm shrinkwrap
    之后，会生成 npm-shrinkwrap.json 

    Express 框架：
    https://github.com/expressjs/express
    官方文档：
    http://expressjs.com/en/4x/api.html#app.METHOD

   CURl工具的使用:
   URL是一个利用URL语法在命令行下工作的文件传输工具，1997年首次发行。它支持文件上传和下载，所以是综合传输工具，
   1.查看网页源码:
   curl www.sina.com
   保存某个网页:
   curl -o [文件名] www.sina.com
   2.自动跳转:有的网址是自动跳转的。使用`-L`参数，curl就会跳转到新的网址。
   curl -L www.sina.com
   3.显示http response的头信息，连同网页一起
   curl -i www.sina.com
   4.显示通信过程
   curl -v www.sina.com
   查看更详细的通信过程:
   curl --trace output.txt www.sina.com
   运行后， 请打开output.txt文件查看

   Express 框架:
    1.1支持跨域的插件： cors
    https://www.npmjs.com/package/cors
    1.2 使用body-parser（bodyParser） 中间件实现处理post、get、delete请求:
    npm地址:  https://www.npmjs.com/package/body-parser
   
    package.json 文件可以直接用require 引入， 得到的就是一个js对象.

    const json = require('./package.json');

  流程控制模块: async(npm 库) step, wind
  https://www.npmjs.com/package/async
  async.series: 一组任务的串行化
  async.parallel 异步的并行执行

  缓存显示策略:
  一个缓存对象，用于删除最近最少使用的项目
  https://github.com/isaacs/node-lru-cache

  缓存的解决办法:
  1. Redis: 
    https://github.com/NodeRedis/node_redis
    https://www.npmjs.com/package/redis
  2.Memcached:
    https://github.com/3rd-Eden/memcached
*/