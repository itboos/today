/*笔记  2017-05-06 15:24:03  */
// nodeJS
1.process是一个全局对象，argv是主函数的参数数组，
由于argv[0]固定等于NodeJS执行程序的绝对路径，argv[1]固定等于主模块的绝对路径，所以第一个命令行参数从argv[2]这个位置开始

git 笔记: 2017-06-06 17:07:13
	git add ***  或者 git add .
	git commit 
	git push
	git pull =git fetch + git merge  先拉取远程端的代码，再合并

	回退版本:  Head指针指向某个版本
	git reset --hard HEAD^  回到上一次commit 提交前的版本   注：（只是本地的版本变化了，远程端已经提交的是无法变化的）
	git reset --hard HEAD^ ^ 回到上两个版本 
	git reset --hard HEAD~100  回到上100个版本
	回退到制定版本:
	每一次提交到有一个版本号，用来记录本次提交的，回到制定的版本，只需要输入版本号的前7位

	git reset --hard e884ac1  回到 e884ac1对应的那个版本

	git log 显示提交的历史记录-- 可以查看提交历史
	git log --pretty=oneline --abbrev-commit 更加友好的log显示方式
	git reflog   用来记录你的每一次命令 --查看命令历史

	查看文件的差异:
	git diff是比较本地和版本库
	git diff --cached是比较本地和版本库
	git diff 是工作区和 中间区比较，git diff --cached是中间区和仓库比较。

	命令git checkout readme.txt意思就是，把readme.txt文件在工作区的修改全部撤销，这里有两种情况：

		一种是readme.txt自修改后还没有被放到暂存区，现在，撤销修改就回到和版本库一模一样的状态；

		一种是readme.txt已经添加到暂存区后，又作了修改，现在，撤销修改就回到添加到暂存区后的状态。

	git reset HEAD file可以把暂存区的修改撤销掉（unstage），重新放回工作区： 把 (git add *** 放大暂存区的东西放回 工作区)

	
	Github 将本地的仓库关联到新建的github仓库:  push an existing repository from the command line

	git remote add origin https://github.com/itboos/test02.git
	git push -u origin master

	创建与合并分支：

	查看分支：git branch

	创建分支：git branch <name>

	切换分支：git checkout <name>

	创建+切换分支：git checkout -b <name>  常用:  git checkout -b dev  创建dev分支，同时切换到dev分支

	合并某分支到当前分支：git merge <name>
	丢弃一个没有被合并过的分支，可以通过git branch -D <name>强行删除。

	删除分支：git branch -d <name>

	git log --graph 	命令可以看到分支合并图


   git stash : 可以把当前工作现场“储藏”起来，等以后恢复现场后继续工作(没有add的文件暂时存起来，然后就工作区就是干净的，就可以用来创建新的分支了)
   用  git stash list命令看  查看临时存储区的内容
   恢复临时存储区的内容：

   一是用git stash apply恢复，但是恢复后，stash内容并不删除，你需要用git stash drop来删除；

   另一种方式是用git stash pop（常用） ，恢复的同时把stash内容也删了

   在Git工作区的根目录下创建一个特殊的.gitignore文件，然后把要忽略的文件名填进去，Git就会自动忽略这些文件。

   简化git命令：

   而当前用户的Git配置文件放在用户主目录下的一个隐藏文件.gitconfig中： /Users/xueqi/..gitconfig

   $ cat .gitconfig
   [alias]
       co = checkout
       ci = commit
       br = branch
       st = status
   [user]
       name = Your Name
       email = your@email.com

   修改配置后就可以使用:
   git br 来表示git branch 命令了

 远程分支相关:
 git branch -r #查看远程分支
 git branch -a #查看所有分支

 切换到远程分支:
	 iMac:hardworking xueqi$ git branch -r
	   origin/develop
	   origin/master
	   origin/meila
 git checkout origin/develop  -切换到develop 分支

 ```
git 相关2: 
 
查看 修改后-未暂存的文件差异: 
git diff

查看 修改后- 已暂存的文件差异：
git diff --staged 或者  git diff --cached (staged和 cached 是同义词)

跳过使用暂存区域-直接提交文件

git commit -a -m '这是提交的注释' (只能提交已跟踪的文件，不能提交新文件)

移动文件(文件重命名:)

git mv file_old_name file_new_name

相当于:

mv README.md README  移动文件
git rm README.md
git add README

查看提交历史：
git log
git log -2 显示最近两条提交记录

git log -p 显示每次提交的内容差异
git log -p -2 显示最近两次提交的内容差异

git log --stat 带简略提交信息的 提交记录

git log --pretty 更好看的提交历史 (常用)

git log --grep '跳过'  显示只包含某个关键字的提交记录

 git log --pretty=oneline

撤消操作:
 1.取消暂存的文件 
 git reset HEAD a.md (将a.md 变为未暂存状态)  这是， a.md 就变为已修改，但是未暂存的状态了

 2.撤消对文件的修改
  拷贝了另一个文件来覆盖它
 git checkout a.md   将文件a.md 的修改抛弃，文件重置到上次提交的状态
 git checkout .  重置当前仓库的所有文件的 所有修改

查看远程仓库地址:
git remote
git remote -v

远程仓库中抓取与拉取
git fetch [remote-name] 拉取之后，并没有自动合并 可以 git merge 
git pull  拉取远程分支同时合并远程分支到当前分支 （相当于 git fetch + git merge）

查看某一个远程仓库的更多信息:
git remote show origin

远程仓库的移除与重命名:

 去修改一个远程仓库的简写名
git remote rename pb paul
移除一个远程仓库:
git remote rm paul

2.6 打标签: (强-使用-区分版本)
   列出标签:
	  git  tag
	 查看指定的标签:
	 git tag -l 'v1.0*'  只查看 1.0系列标签

	 创建附注标签:(中包含打标签者的名字、电子邮件地址、日期时间；还有一个标签信息)

	 git tag -a v1.4 -m 'my version 1.4'  -m 表示此个标签的标签信息
	 
	 git show 命令可以看到标签信息与对应的提交信息：

	 git show v1.0 

	 创建轻量标签:
	 本质上是将提交校验和存储到一个文件中,只需要提供标签名字
	 git tag v1.4
	 后期打标签 对以前的提交打标签：
   git tag -a v1.2 9fceb02(提交记录hash值，前六位就可以区分)

	 推送标签: 默认情况下，git push 命令并不会传送标签到远程仓库服务器上

	 推送标签：git push origin [tagname]
	 例如:
	  git push origin v1.0
	 
	 一次性推送多个标签：(推送所有不在远程的标签到远程)

	 git push origin --tags

	 删除标签:
	 git tag -d v1.0

	 检出标签:
	 在 Git 中你并不能真的检出一个标签，因为它们并不能像分支一样来回移动。 如果你想要工作目录与仓库中特定的标签版本完全一样，可以使用 git checkout -b [branchname] [tagname] 在特定的标签上创建一个新分支：
   
	 git checkout -b version2 v2.0.0
	 创建一个名为version2 的新分支，改分支的内容和v2.0.0 的内容完全一样


	 Git 别名：
	 git config 文件来轻松地为每一个命令设置一个别名：
	 列如：
	  git config --global alias.co checkout
    git config --global alias.br branch
    git config --global alias.ci commit
    git config --global alias.s status
    git config --global alias.cm commit -m 

		以后 ， git s = git status
					 git ci = git ci 了

	常用的一些别名：

	alias.s=status
	alias.a=!git add . && git status
	alias.au=!git add -u . && git status
	alias.aa=!git add . && git add -u . && git status
	alias.c=commit
	alias.cm=commit -m
	alias.ca=commit --amend
	alias.ac=!git add . && git commit
	alias.acm=!git add . && git commit -m

  alias.co=checkout
	alias.ci=commit
	alias.br=branch
	alias.st=status
  
	取消文件的暂存:
	
	alias.unstage= reset HEAD --
	使用: git config --global alias.unstage 'reset HEAD --'

 （显示图形提交界面:）

	alias.l=log --graph --all --pretty=format:'%C(yellow)%h%C(cyan)%d%Creset %s %C(white)- %an, %ar%Creset'
	alias.ll=log --stat --abbrev-commit
	alias.lg=log --color --graph --pretty=format:'%C(bold white)%h%Creset -%C(bold green)%d%Creset %s %C(bold green)(%cr)%Creset %C(bold blue)<%an>%Creset' --abbrev-commit --date=relative
	alias.llg=log --color --graph --pretty=format:'%C(bold white)%H %d%Creset%n%s%n%+b%C(bold blue)%an <%ae>%Creset %C(bold green)%cr (%ci)' --abbrev-commit

	alias.d=diff
	alias.master=checkout master
	alias.spull=svn rebase
	alias.spush=svn dcommit
	alias.alias=!git config --list | grep 'alias\.' | sed 's/alias\.\([^=]*\)=\(.*\)/\1\     => \2/' | sort

   



推送到远程仓库
1. git push origin master

新建分支：
git branch 分支名字（****）
切换分支：
git checkout 分支名称
列出分支：
git branch
删除分支:
git branch -d 分支名称

查看所有分支（包括远程）:
git branch -a

Git v1.7.0 之后:

删除远程分支:

git push origin --delete <branchName>
	
删除标签:
git push origin --delete tag <tagname>

否则，可以使用这种语法，推送一个空分支到远程分支，其实就相当于删除远程分支：
	
git push origin :<branchName>



删除tag的方法，推送一个空tag到远程tag：

git tag -d <tagname>
git push origin :refs/tags/<tagname>

删除不存在对应远程分支的本地分支
git fetch -p 
它在fetch之后删除掉没有与远程分支对应的本地分支：

重命名远程分支:
1.删除远程分支：
git push --delete origin devel
我在删除远程分支可能碰到这个错误, 当删除的是默认的分支的时候，这个时候，先把其它分支设置成默认分支，然后再删除就行了。
2.重命名本地分支:
git branch -m devel develop
3.推送本地分支：
git push origin develop

把本地tag推送到远程
git push --tags
获取远程tag:
git fetch origin tag <tagname>

 本地所有修改的。没有的提交的，都返回到原来的状态
 git checkout .



3. 分支:
 创建分支:
 git branch new-branch
 切换分支：
 git checkout new-branch
 查看各个分支当前所指的对象:

 简写： git checkout -b newBranch
 git log --oneline --decorate
 创建分支并且切换到新的分支:
 git chekcout -b fix-bug 
 查看分叉历史:
 git log --oneline --decorate --graph --all
 
 查看哪些分支已经合并到当前分支:
 git branch --merged
 $ git branch --merged
  iss53
	test
* master
这就表示： 分支iss53， test 已经合并到 master 分支上了,
可以安全删除它们

 查看分支尚未合并到当前分支:
 git branch --no-merged 

 删除分支：
 git branch -d test
 强制删除未合并的分支:
 git branch -D test

 远程分支：
 查看远程分支:
 git remote show

 推送远程分支:
 git push (remote仓库名称) (branch分支名称):
 例如： 将serverfix 推送到远程:
 git push origin serverfix
 意味着，“推送本地的 serverfix 分支来更新远程仓库上的 serverfix 分支。

 等同于:
 git push origin serverfix:serverfix
 意思是:推送本地的 serverfix 分支，将其作为远程仓库的 serverfix 分支

git push origin serverfix:awesomebranch
来将本地的 serverfix 分支推送到远程仓库上的 awesomebranch 分支。
(相当于本地的分支推送到远程，并且重命名这个分支)

下一次其他协作者从服务器上抓取数据时，他们会在本地生成一个远程分支 origin/serverfix，指向服务器的 serverfix 分支的引用：
注意:
	git fetch origin
	要特别注意的一点是当抓取到新的远程跟踪分支时，本地不会自动生成一份可编辑的副本（拷贝）。 换一句话说，这种情况下，不会有一个新的 serverfix 分支 - 只有一个不可以修改的 origin/serverfix 指针。
	如果想要在自己的 serverfix 分支上工作，可以将其建立在远程跟踪分支之上：
  
	git checkout -b serverfix origin/serverfix
	这会给你一个用于工作的本地分支，并且起点位于 origin/serverfix。换句话说，我们这个时候本地才有了一个名字叫做 origin/serverifx 的分支

 ```



 phthon3 相关教程: 2017年06月16日10:51:48
 
 自动转换时，转换为false的值:
 	数值0，空字符串-'',空list-  [] 会自动转换成false,
	非零数值、非空字符串、非空list等，就判断为True

python 函数命名只能以字母，下划线的形式，不能以 my-func 的形式:!!

Python函数在定义的时候，默认参数L的值就被计算出来了，即[]，因为默认参数L也是一个变量，它指向对象[]，每次调用该函数，如果改变了L的内容，则下次调用时，默认参数的内容就变了，不再是函数定义时的[]了。

所以，定义默认参数要牢记一点：默认参数必须指向不变对象！
它也存在闭包:
def count():
	def f(j):
		def g():
			return j*j;
		return g;
	fs=[]
	for  i in  range(1,4):
		fs.append(f(i));
	return fs;
f1,f2,f3=count();
res1=f1();
res2=f2();
res3=f3();
print(res1,res2,res3);

React 笔记:
属性使用驼峰式命名法:
 class -> className
 tanindex -> tabIndex
组件首字母使用大写形式
属性值用引号包起来:
< welcome  name='zdl' ,age='23'>

黑科技: 
利用数组的结构赋值来交换两个变量的值:
let x = 1;
let y = 2;
[x,y] = [y,x];
console.log(x); // 2
console.log(y); // 1



node 笔记:
 node 进入node的repl环境中, .ext / ctrl+c *2 退出repl环境，

 ```
 微信小程序踩坑:

1. 问题：

 使用wxpy 生成项目，运行后报:
 Error: module "npm/lodash/_nodeUtil.js" is not defined
 问题产生原因： 未知
 解决方法：
   https://github.com/Tencent/wepy/issues/1294
    "npm i util --no-save && wepy build --no-cache"
    不保存依赖，安装util , 同时 不使用缓存构建
 问题集合:
 https://www.ctolib.com/article/comments/69137

 Git 命令:
 当本地的文件修改了后，可以通过git add  xxx文件 讲文件提交到本地仓库，以便后面的提交
也可以通过 git checkout  xxx文件  放弃本次修改，这会让文件回到上次提交的状态，把修改的内容都放弃了
b1分支的提交
 ```