/* node js 笔记相关 */
/*
  2018年02月25日17:04:42
  nodejs相关博客:
  http://cnodejs.org/
  node 调试工具 devtool:
   npm i devtool -g 
  
  查看node 的安装路径:
  which node ，得到的输出结果就是node安装路径

  软链接：
  在 Unix 系统中，可以对文件创建 硬链接 和 软链接。简单来说，链接就是可以指向文件系统中其他位置的一个快捷方式，
  比如 Windows 系统下的快捷方式。那么，硬链接和软链接有什么区别呢？
  https://slarker.me/mac-file-link/


  Linux: 自己创建一个软链接:
   http://iamocean.github.io/2014/05/19/mac-symbolic-link/
   ln -s  原路径 软链接名称
  如:  ln -s  /Users/xueqi/.nvm/versions/node/v7.9.0/lib/node_modules/create-react-app/node_modules/.bin  create-react-app
  这就在当前的目录创建了一个软链接, 软链接的名字叫create-react-app， 它指向了前面的目录


  which  查看可执行文件的位置。
  查看系统中全局的安装路径:
  npm root -g
  which命令的作用是，在PATH变量指定的路径中，搜索某个系统命令的位置，并且返回第一个搜索结果。也就是说，
  使用which命令，就可以看到某个系统命令是否存在，以及执行的到底是哪一个位置的命令。

  which node ： -> /Users/xueqi/.nvm/versions/node/v7.9.0/bin/node
  which pwd -> /bin/pwd

  查看全局安装的包， 深度为1（只列出一层):
  npm ls -g --depth=0
  npm ls -g --depth=0:
  一个npm 的bug：
  https://github.com/npm/npm/issues/10004#issuecomment-210710935
  sudo npm -g update

  、现在大家都安装了iTerm2，
  我们先把bash切换成zsh，使用命令行如下：
    sudo chsh -s /bin/zsh
    执行命令后，会让你输入电脑的密码，输入即可。完成后，需要完全退出iTerm2,再次进入时，就已经从bash切换到zsh了。
    也可以使用下列命令切回bash：
    sudo chsh -s /bin/bash

  bash shell默认读取的是当前用户下的.bash_profile文件,   强
  而zsh shell默认读取的是当前用户下的.zshrc文件

  echo $shell / which bash 查看当前使用的是哪个bash
  
  vscode使用 zsh 作为默认终端:
  修改默认配置:
    "terminal.integrated.shell.linux": "/bin/zsh",
    // // 终端在 OS X 上使用的 shell 的路径,改为zsh。
    "terminal.integrated.shell.osx": "/bin/zsh"
  淘宝npm 镜像:
  nvm的安装:
  https://github.com/alsotang/node-lessons/tree/master/lesson0
  https://github.com/creationix/nvm
  http://bubkoo.com/2017/01/08/quick-tip-multiple-versions-node-nvm/

  n 的安装:
  https://github.com/tj/n
  n 的使用:
  https://75team.com/post/manage_node_with_n.html
  https://github.com/muwenzi/Program-Blog/issues/6
  n ls 列出所有可以安装的版本，
  n stable 安装最新的稳定版本,
  n latest 安装最新的版本
  n 8.0.0  安装指定的版本
  切换版本:
  n 
    会列出所有已经安装的版本， 上下键切换，按回车确定， 就可以切换到指定的版本了
  删除某个版本:
  n rm 0.12.9

  查看某版本node的安装路径:
  n bin 8.0.0

  以指定的版本来执行脚本：
  n use 8.0.0 some.js

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
    查看全局安装包的信息:
    npm list -g
    mac 全局的包安装在: /usr/local/lib/node_modules/下面
    1.安装指定版本的包:

    使用这条命令来查看:

    npm root -g
    Mac 下默认的全局路径是:

    /usr/local/lib/node_modules
    Ubuntu 下默认的全局路径是:
    /usr/lib/node_modules


    2. 更改npm install -g 全局安装包的安装路径: 
      目录前缀配置参数prefix
      (详情请参考《npm常用技巧》)
      prefix参数指定全局安装时相关目录的共同路径，即全局安装的根目录；
      可以通过如下命令配置prefix参数：
       npm config set prefix <路径> [-g|--global]  //给配置参数key设置值为value；
       如  npm config set prefix '/usr/local/'
       或者直接加一条:
       /Users/xueqi/.npmrc:
       prefix=/usr/local
      包会被安装到如下位置：

        Unix系统：{prefix}/lib/node_modules
        Mac系统：{prefix}/lib/node_modules  -> /usr/local/lib/node_modules/gulp***
        Windows系统：{prefix}/node_modules
      
      并且，会把可执行文件链接到如下位置：(关键，这样才能在任意目录下执行相应的命令)

        Unix系统：{prefix}/bin
        Mac系统：{prefix}/bin
        Windows系统：{prefix}

      作者：科研者
      链接：https://www.jianshu.com/p/0cff9f4167c9 强
      來源：简书



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

// nodejs 测试工具:
// tap-producing test harness for node and browsers
// https://github.com/substack/tape