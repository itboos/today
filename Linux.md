macOS Sierra中使用VMware Fusion安装centos7：
https://blog.csdn.net/viola_lulu/article/details/70155317
查看本机IP：
ip addr show 
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


Linux 创建连接命令 ln -s 软链接
ln -s 源文件 目标文件 (ln -s a b) , b 就指向了a

ln -s abc cde 建立abc 的软连接 （cde 指向了abc）
ln abc cde 建立abc的硬连接，

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

 
// =====================================
6.5 mongoDB 的配置和使用 https://neuqzxy.github.io/2017/10/07/mongodb%E9%85%8D%E7%BD%AE%E7%94%A8%E6%88%B7/

7. 配置域名解析， https 证书

8. 发布代码使用
  