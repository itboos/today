/* node js 笔记相关 */
/*
  2018年02月25日17:04:42
  
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
   
   使用source命令强制立即生效：
   source  ~/.bash_profile

   调试工具:
   1. node-inspector:
   https://github.com/node-inspector/node-inspector
   2. devtool
   https://github.com/Jam3/devtool
*/