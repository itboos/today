理解 bashrc 和 profile:
https://wido.me/sunteya/understand-bashrc-and-profile

macOS Sierra中使用VMware Fusion安装centos7：
https://blog.csdn.net/viola_lulu/article/details/70155317
查看本机IP：
ip addr show 
如何查看ubuntu的内核版本和发行版本号:
cat /etc/issue

查看 shell:
 查看当前终端运行的是哪种shell: ps -p $$
 查看当前系统所有支持的shell: cat /etc/shells

shell 常见命令：
ctrl + a :光标跳转到行首

ctrl + e: 光标跳转到行尾

ctrl + u: 删除光标到行首

ctrl + k: 删除光标到行尾

ctrl + l: 清屏

open /users/test 打开finder 窗口

 如果当前使用的是zsh, 配置/添加环境变量的时候，需要编辑 vim ~/.zshrc
 同时， 在zshrc 里添加 source ~/.bashrc
 这样，在bashrc 里的配置就能生效了

 理解 bashrc 和 profile:
 https://wido.me/sunteya/understand-bashrc-and-profile


切花成root用户:

sudo  su 或者 sudo -i 切换成root用户之后再操作

ssh 登录服务器:
ssh @username: 192.168.122.131
如: 使用root 用户登录:
    ssh root@192.168.122.131

yum 命的使用:
 http://man.linuxde.net/yum
tar 命令的使用:
 https://my.oschina.net/u/2274721/blog/416310  
chkconfig 的使用:

开关机命令:
https://www.kwx.gd/LinuxBase/Linux-shutdown.html
shutdown -r 关机
shutdown -r now 立即重启
2)、设置1分钟以后关闭计算机，并在SSH中提示“1 minute after shutdown
shutdown -h +1 "1 minute after shutdown"

(3)、取消关机
在SSH中可按Ctrl+C快捷键取消正在执行的命, 或者 shutdown -c 

(4) 
移动 文件/文件夹 https://linux.cn/article-2688-1.html
mv a.text b.text /usr/local/ 复制两个文件到制定的目录
mv mongodb /usr/local/ 移动mongodb 文件夹到 /usr/local/
重命名文件：
mv a.txt a_.txt  将a.txt 重命名为a_.txt
如果是绝对路径:
mv /home/pungki/Documents/file_1.txt /home/pungki/Documents/file_2.txt

(5) 复制文件/文件夹



Linux 创建连接命令 ln -s 软链接
ln -s 源文件 目标文件 (ln -s a b) , b 就指向了a

ln -s abc cde 建立abc 的软连接 （cde 指向了abc）
ln abc cde 建立abc的硬连接，

查看开机启动的项目:
systemctl list-unit-files

Linux 开机会执行的脚本：
/etc/rc.local
/etc/rc.sysinit
/etc/inittab
/etc/profile

### centOs 7.2 防火墙相关:
从centos7开始使用systemctl来管理服务和程序，包括了service和chkconfig。

在本地的启动了一个node.js 服务，发现只有服务器本机才可以访问，外网通过ip 无法访问， 后面找到是由于开启了网络防火墙的原因:
解决办法:
  1. 关闭防火墙
  2. 对防火墙开放指定端口(针对我们的web 服务器.)

  ###查看默认防火墙状态
   firewall-cmd --state 
  （关闭后显示notrunning，开启后显示running）
  ###关闭防火墙
   systemctl stop firewalld.service
  ### 开启防火墙:
    systemctl start firewalld.service
  ### 禁止防火墙开机启动
  systemctl disable firewalld.service 
  ### 查看已开放的端口:
  firewall-cmd --list-ports
  开启端口:
  firewall-cmd --zone=public --add-port=80/tcp --permanent (开启80端口，长久生效)

  命令含义：

    –zone #作用域

    –add-port=80/tcp #添加端口，格式为：端口/通讯协议

    –permanent #永久生效，没有此参数重启后失效

其它:

启动一个服务：systemctl start firewalld.service
关闭一个服务：systemctl stop firewalld.service
重启一个服务：systemctl restart firewalld.service
显示一个服务的状态：systemctl status firewalld.service
在开机时启用一个服务：systemctl enable firewalld.service
在开机时禁用一个服务：systemctl disable firewalld.service
查看服务是否开机启动：systemctl is-enabled firewalld.service;echo $?
查看已启动的服务列表：systemctl list-unit-files|grep enabled
原文地址:
https://www.cnblogs.com/zhangzhibin/p/6231870.html


Mongddb:
/data/db 拒绝用户访问:
https://stackoverflow.com/questions/42446931/mongodb-exception-in-initandlisten-20-attempted-to-create-a-lock-file-on-a-rea

启动mongdb: sudo mongdb

使用centOs 7.2搭建自己的服务器的步骤:

1. 安装centOs7.2 的系统 (电脑上是用虚拟机安装的)
     使用的是最小的版本， 网页的镜像, CentOS-7-x86_64-Minimal-1708  
     http://mirrors.mit.edu/centos/7/isos/x86_64/
2. 安装基本的工具: 如（wget, wget、curl、git、vim) 

3. 安装node.js 环境: (配置好npm, node， n(多个node的切换工具)), 配置好: .npmrc 文件：
      registry=http://r.cnpmjs.org/
      cache=/usr/lib/node_cache
      prefix=/usr
  部分命令需要配置几次，命令软链接到所有用户都可以访问到的位置:
 参考: https://help.aliyun.com/document_detail/50775.html

4. 安装node.js 环境后，外网的访问问题(让防火墙开放指定的端口: 参考上面的);

5. 安装PM2， PM2的使用
   http://pm2.keymetrics.io/docs/usage/quick-start/

6. 安装  Nginx, MySQL, PHP
  Nginx相关:
  // =====================================

  https://www.jianshu.com/p/495a02eb2672
  nginx 安装后，第一篇文章设置开机启动时针对6.*的， 7.* 的不一样。
  看这里:centos7 配置nginx服务、开机自动启动: 强
  https://my.oschina.net/taoluoluo/blog/749134
    http://nginx.org/download/ nginx 下载地址
  nginx 的一个问题:
  http://blog.51cto.com/ichange/1406528
 
 
   ps  -ef | grep nginx 看下主目录 是哪里 是不是装了两个可恶的 Nginx

 conf 文件语法和设置检查：
 ./nginx -t -c /usr/local/nginx/conf/nginx.conf
 创建软链接后，  nginx -t -c /usr/local/nginx/conf/nginx.conf

 查看某个文件软连接 之后的真实连接： ls -al


 查看Nginx 当前配置文件：
  nginx -t:

  nginx: the configuration file /usr/local/etc/nginx/nginx.conf syntax is ok

  nginx: configuration file /usr/local/etc/nginx/nginx.conf test is successful

  Nginx 重新加载：
  nginx -s reload （在修改了nginx.conf文件后，重新加载nginx）

  一个问题：
  nginx 403 Forbidden 排错记录：
  https://www.jianshu.com/p/e0dadb871894

  这样就可以看到nginx。conf 的实际位置了.


// =====================================
6.5 mongoDB 的配置和使用 
MongoDB 的使用： http://blog.51cto.com/linuxg/1895805

安装:(参照官网)
MacOs 安装：
https://docs.mongodb.com/manual/tutorial/install-mongodb-on-os-x/
Ubuntu安装：
https://docs.mongodb.com/manual/tutorial/install-mongodb-on-ubuntu/
不同的系统, 不同的MongoDB 安装方式，会导致启动服务的命令会有差别

Ubuntu: 
https://docs.mongodb.com/manual/tutorial/install-mongodb-on-ubuntu/

https://neuqzxy.github.io/2017/10/07/mongodb%E9%85%8D%E7%BD%AE%E7%94%A8%E6%88%B7/
http://yijiebuyi.com/blog/b6a3f4a726b9c0454e28156dcc96c342.html强 (使用homebrew 来安装)
https://www.jianshu.com/p/1bb663918cfd 安装
官方文档:
https://docs.mongodb.com/manual/tutorial/install-mongodb-on-os-x/
mongoose:
https://github.com/Automattic/mongoose/issues/6880

使用 mongoose 连接MongoDB 数据库
https://github.com/Automattic/mongoose


参照官方文档：
     第三方教程： https://blog.csdn.net/thatway_wp/article/details/79362261
1.   https://docs.mongodb.com/manual/tutorial/install-mongodb-on-os-x/
2. 下载gz压缩包，解压
3. 配置 ~/.bashrc (即把bin 路径添加到环境变量中去，是的mongod 命令可以在全局使用)
vim ~/.bashrc
 添加： export PATH=/Users/xueqi/Documents/D/software/mongodb-osx-x86_64-4.0.4/bin:$PATH

 保存退出
 source ~/.bashrc

 2. 常见问题： 
  /data/bd 的文件权限问题：(文件夹只有读的权限问题)
  https://stackoverflow.com/questions/42446931/mongodb-exception-in-initandlisten-20-attempted-to-create-a-lock-file-on-a-rea

  sudo chown -R $USER(自己的用户名) /data/db （将文件夹的所有权限赋给当前用户，即当前用户取得文件夹的所有权限）

当以后台运行方式启动时，关闭mongodb的方式同样是：
mongodbd 常见命令：
ps -ef|grep mongo 

kill 进程号

查看 mongo 相关进程

ps -ef | grep mongo

关闭 MongoDB 服务：
kill -2 PID

可以使用操作系统的 kill 命令，给 mongod 进程发送 SIGINT 或 SIGTERM 信号，
             即 "kill -2 PID," 或者 “kill -15 PID“。
       
 建议不要使用 ”kill -9 pid“，因为如果 MongoDB 运行在没开启日志（--journal）的情况下，
            可能会造成数据损失。

mongodb远程连接配置如下：
https://www.cnblogs.com/jinxiao-pu/p/7121307.html
https://segmentfault.com/q/1010000002923686

1.修改配置文件mongodb.conf

命令：vim /etc/mongodb.conf

把 bind_ip=127.0.0.1 这一行注释掉或者是修改成 bind_ip=0.0.0.0

2.重启mongodb服务
sudo service mongod stop


2.1防火墙开放27017端口(看情况)

命令：iptables -A INPUT -p tcp -m state --state NEW -m tcp --dport 27017 -j ACCEPT


3.远程连接

要连接的IP：134.567.345.23

mongo 134.567.345.23:27017

带用户名密码的链接：
mongo somewhere.mongolayer.com:10011/my_database -u username -p password


MongoDB 的数据库备份与还原：
https://docs.mongodb.com/manual/tutorial/backup-and-restore-tools/

导出数据库:
mongodump -h IP --port 端口 -u 用户名 -p 密码 -d 数据库 -o 文件存在路径  
mongodump -h 198.18.36.58 -d yapi -o /Users/xueqi/Desktop


7. 配置域名解析， https 证书

8. 发布代码使用
  

查看端口占用：
查看端口占用情况的命令：lsof -i
查看某一端口的占用情况： lsof -i:端口号 



linux 技巧：使用 screen 管理你的远程会话
    https://www.ibm.com/developerworks/cn/linux/l-cn-screen/index.html 强

    https://www.ibm.com/developerworks/cn/linux/l-cn-screen/index.html
    https://segmentfault.com/a/1190000002607962

    使用screen 开启一个新的session， 在里面运行我们的服务，等ssh 关闭连接后， 这个服务 继续保持在后台运行


    🌰：
    screen -S 可以给screen 窗口取一个名字
    screen -S mongod 启动MongoDB  mongod
    screen -S yAPI 启动yAPI   node server/server.js
    
    screen -list
    There are screens on:
        4561.pts-46.eduard-X   (30.03.2015 14:48:51)   (Attached) 连接的
        4547.pts-46.eduard-X   (30.03.2015 14:48:33)   (Detached) 分离的
        4329.pts-41.eduard-X   (30.03.2015 14:46:28)   (Attached)
        3995.pts-30.eduard-X   (30.03.2015 14:30:01)   (Detached)
        3997.yAPI.eduard-X     (30.03.2015 14:30:01)   (Detached)

    恢复一个分离的窗口：
      screen -r <screen_pid>

    问题：恢复一个分离的却 显示连接的窗口，屏幕会响应没有屏幕要恢复：
    
    您可以选择其中分离并通过查找PID（或全名）与重新安装照常屏幕
     screen -d -r 12345(进程号)
    
    screen 窗口快捷键：
      ctrl +  a + 其它键
      ctrl +  a + c 创建一个新的运行shell的窗口并切换到该窗口
      ctrl +  a + d 暂时断开 screen 回话
      ctrl +  a + k 杀掉当前窗口 （同时也会终止当前窗口创建的任务）



 7. Docker 相关：
    https://docs.docker.com/  官方文档 
    docker Hub:
    https://hub.docker.com/
   文档相关：
    https://docs.docker-cn.com/get-started/part2/
    http://www.runoob.com/docker/docker-image-usage.html
    把一个 Node.js web 应用程序给 Docker 化：
    https://nodejs.org/zh-cn/docs/guides/nodejs-docker-webapp/



Ubutu 18.0 开机启动 项目：
/etc/rc.local 在里面编写脚本
https://www.cnblogs.com/digdeep/p/9760025.html (强)
https://www.centos.bz/2018/05/ubuntu-18-04-rc-local-systemd%E8%AE%BE%E7%BD%AE/
http://hcjhuanghe.top/archives/58
Ubutu:
查看服务状态：
sudo systemctl status rc-local.service
Ubuntu 上使用：
    https://docs.mongodb.com/manual/tutorial/install-mongodb-on-ubuntu/
    1. 启动 sudo service mongod start
    2. 停止 sudo service mongod stop
    3. 重启 sudo service mongod restart

小技巧：

 ssh 自动登录：
  参考文章：
  https://segmentfault.com/a/1190000011438491
  https://www.cnblogs.com/configure/p/7911037.html  (1)
  https://blog.csdn.net/Jerome_s/article/details/77351507 (1)
用expect实现SCP/SSH自动输入密码登录：
假设我们的服务器iP 地址为： 198.18.36.58
set timeout 30
设定超时时间为30s，spawn是expect的语句，执行命令前都要加这句

ssh 自动登录:
``` sh
#!/usr/bin/expect  expect 所在位置, 表明使用 expect 来执行
set timeout 30
spawn ssh root@198.18.36.58
expect "password:"
send "********（服务器的登录密码）\r"
# 代表执行完留在远程控制台，不加这句执行完后返回本地控制台
interact
```
注意：密码有特殊字符如“$”需要转义；
　　　密码以“\r”结尾。

linux下执行.sh文件的方法和语法
  参考文章：https://blog.csdn.net/ljp812184246/article/details/52585650

1. 创建 sh文件，编写内容
2. 赋予文件可执行权限 chmod a+x xxx.sh 
.sh文件就是文本文件，如果要执行，需要使用chmod a+x xxx.sh来给可执行权限。 
3. 执行
   3.1 进入 sh 文件所有目录： ./aa.sh

### expect 脚本注意事项：

```
不能按照习惯来用sh autosu.sh来这行expect的程序，会提示找不到命令，如下：

autosu.sh: line 3: spawn: command not found
couldn't read file "password:": no such file or directory
autosu.sh: line 5: send: command not found
autosu.sh: line 6: interact: command not found

因为expect用的不是bash所以会报错。执行的时候直接./autosu.sh就可以了。～切记！

--------------------- 
作者：紫颖 
来源：CSDN 
原文：https://blog.csdn.net/zhuying_linux/article/details/6657020 
版权声明：本文为博主原创文章，转载请附上博文链接！
```


# Mac下使用launchctl创建定时任务:
使用launchctl加载plist
任务描述文件写好后，怎么使用它呢？可以使用launchctl工具，添加任务到launchd。
系统定义了几个位置来存放任务列表
~/Library/LaunchAgents 由用户自己定义的任务项
/Library/LaunchAgents 由管理员为用户定义的任务项
/Library/LaunchDaemons 由管理员定义的守护进程任务项
/System/Library/LaunchAgents 由Mac OS X为用户定义的任务项
/System/Library/LaunchDaemons 由Mac OS X定义的守护进程任务项

作者：柳浪闻笛
参考：
链接：https://www.jianshu.com/p/b4f31bf47b5d
https://www.kancloud.cn/mayan0718/mac/587087 (强)
https://my.oschina.net/jackin/blog/263024

### 加载任务, -w选项会将plist文件中无效的key覆盖掉，建议加上
$ launchctl load -w com.demo.plist

### 删除任务
$ launchctl unload -w com.demo.plist

### 查看任务列表, 使用 grep '任务部分名字' 过滤
$ launchctl list | grep 'com.demo'

### 开始任务
$ launchctl start  com.demo.plist

### 结束任务
$ launchctl stop   com.demo.plist

注意:
  如果任务被修改了，那么必须先unload，然后重新load
  start可以测试任务，这个是立即执行（但是自己实际上没有看到有执行），不管时间到了没有
  执行start和unload前，任务必须先load过，否则报错
  stop可以停止任务

例子:
每天固定的时间，将远程的 MongoDB 数据备份到本地电脑
~/Library/LaunchAgents/

/Users/xueqi/Library/LaunchAgents/com.mongdb.yapi.backup.plist
内容如下：
``` xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
  <key>Label</key>
  <string>com.mongdb.yapi.backup.plist</string>
  <key>ProgramArguments</key>
  <array>
    <string>/Users/xueqi/mongod_bak.sh</string>
  </array>
  <key>StartCalendarInterval</key>
  <dict>
      <key>Minute</key>
      <integer>14</integer>
      <key>Hour</key>
      <integer>14</integer>
  </dict>
  <key>StandardOutPath</key>
<string>/Users/xueqi/mongod_bak.err</string>
<key>StandardErrorPath</key>
<string>/Users/xueqi/mongod_bak.log</string>
</dict>
</plist>
// 上面的脚本表示，每天的 14:14 分执行 /Users/xueqi/mongod_bak.sh的脚本
```
/Users/xueqi/mongod_bak.sh：
#### !!!注意： 这里有个问题，就是里面的路径都要使用绝对路径， 对于mongodump 命令，虽然已经添加到环境变量，本地cmd 窗口可以直接使用，但是 在脚本里会报命令找不到的错误(暂时不知道问题,为什么没有携带环境变量)，对于这个，我们就使用命令的绝对位置，如
mongodump ->  /Users/xueqi/Documents/D/software/mongodb-osx-x86_64-4.0.4/bin/mongodump
``` sh
  #!/bin/sh
DUMP="/Users/xueqi/Documents/D/software/mongodb-osx-x86_64-4.0.4/bin/mongodump"
DUMP_PATH="/Users/xueqi/Documents/D/software/mongodb-osx-x86_64-4.0.4/bin/"
# MongoDB 服务器IP:
HOST_IP="198.18.36.58"
# mac 本地备份目录
MAC_OUT_DIR="/Users/xueqi/Documents/D/yAPI_backups"
# 备份文件将以备份时间保存
DATE=`date +%Y_%m_%d_%H_%M_%S`
# 数据库操作员
DB_USER="root"
# 数据库操作员密码
DB_PASS="******"
# 保留最新30天的备份
DAYS="30"
# 备份文件命名格式
TAR_BAK="mongod_bak_$DATE.tar.gz"

# 本地备份
cd $MAC_OUT_DIR
mkdir -p $MAC_OUT_DIR/$DATE
$DUMP -h $HOST_IP -o $MAC_OUT_DIR/$DATE

# 将备份文件打包放入正式目录
# tar -zcvf $TAR_DIR/$TAR_BAK $OUT_DIR/$DATE
# 删除30天前的旧备份
# find $TAR_DIR/ -mtime +$DAYS -delete

# 说明：数据库备份
```

启动yAPI：
``` bash
#!/bin/bash
echo "启动mongd 和 YAPI..start... " > /home/supermonkey/yapi_start.log
# 启动yapi 服务
nohup /home/supermonkey/.nvm/versions/node/v8.12.0/bin/node /home/supermonkey/my-yapi/vendors/server/app.js &
echo "开机启动mongd 和 YAPI.. end.... " > /home/supermonkey/yapi_start.log
```


### 2019
修改host文件：
1.查看host文件
 cat /etc/hosts**
2..打开hosts文件
 sudo vim /etc/hosts** 打开hosts文件。

### tree 命令：
https://www.jianshu.com/p/15a96c1de695

macOS 默认不支持tree命令，可以通过homebrew安装，brew install tree -g

展示 文件 目录的结构：
常见命令：
tree -a
tree -f
输出 目录结构到文件：
tree > ~/Desktop/tree.txt

查看 Linux 系统信息：

```
 uname -a
```
  