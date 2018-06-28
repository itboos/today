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

查看某一次提交的具体修改的内容:
git show 1c002d(SSA-1的前流位) SSA不少于4位，就可以区分唯一一个提交对象(即有4位既可以区分)

git 生成 SHA-1 简短的唯一缩写：
git log --abbrev-commit --pretty=oneline

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
git push origin(origin为默认的仓库名字) develop(分支名)

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
 查看远程仓库:
 git remote show

 拉取远程仓库:
 git clone git@github.com:itboos/today.git(远程仓库名字)
 git  会帮我们自动将仓库命名为 origin
 如果你运行 git clone -o xueqiweb，那么你默认的远程分支名字将会是 xueqiweb/master
 这相当于 将拉下来的远程仓库命名为 xueqiweb

 查看本地分支:
 git branch
 查看远程分支:
 git branch --remote

 查看所有分支(本地和远程的都显示出来):
 git branch -a
 * master (本地master分支)
  remotes/zdl/HEAD -> zdl/master
  remotes/zdl/develop
  remotes/zdl/master (远程master 分支)

 拉取仓库时，默认只会在本地创建一个master 分支， 仓库里的其它分支都是远程的， 要使用其它的分支，我们需要创建一个以远程分支为基础的分支，然后就可以在那个分支上开发了.
  git checkout -b develop zdl/develop (zdl为仓库名，develop 为分支名)
	这样， 在本地就有了 一个名为 develop 的分支了，而且他的内容和远程分支上对应的内容一样.

 2.1 推送远程分支:
 git push (remote仓库名称) (branch分支名称):
 例如： 将serverfix 推送到远程:
 git push origin serverfix
 意味着，“推送本地的 serverfix 分支来更新远程仓库上的 serverfix 分支。

 等同于:
 git push origin serverfix:serverfix
 意思是:推送本地的 serverfix 分支，将其作为远程仓库的 serverfix 分支

 查看设置的所有跟踪分支: 
 git branch  -vv
 
git push origin serverfix:awesomebranch
来将本地的 serverfix 分支推送到远程仓库上的 awesomebranch 分支。
(相当于本地的分支推送到远程，并且重命名这个分支)

下一次其他协作者从服务器上抓取数据时，他们会在本地生成一个远程分支 origin/serverfix，指向服务器的 serverfix 分支的引用：
注意:
	git fetch origin
	要特别注意的一点是当抓取到新的远程跟踪分支时，本地不会自动生成一份可编辑的副本（拷贝）。 换一句话说，这种情况下，不会有一个新的 serverfix 分支 - 只有一个不可以修改的 origin/serverfix 指针。
	如果想要在自己的 serverfix 分支上工作，可以将其建立在远程跟踪分支之上：
  
	跟踪远程分支: 

	git checkout -b serverfix origin/serverfix
	这会给你一个用于工作的本地分支(建立在远程跟踪分支之上)：并且起点位于 origin/serverfix。换句话说，我们这个时候本地才有了一个名字叫做 origin/serverifx 的分支

	当克隆一个仓库时，它通常会自动地创建一个跟踪 origin/master 的 master 分支。 然而，如果你愿意的话可以设置其他的跟踪分支 - 其他远程仓库上的跟踪分支，或者不跟踪 master 分支。 最简单的就是之前看到的例子，
	运行 git checkout -b [local-branch-name] [remotename]/[branch]。 
  
	如果想要将本地分支与远程分支设置为不同名字，你可以轻松地增加一个不同名字的本地分支的上一个命令：
		$ git checkout -b sf origin/serverfix

	这是一个十分常用的操作所以 Git 提供了 --track 快捷方式：

   git checkout --track origin/serverfix

	2.2 删除远程分支:
	git push origin --delete serverfix	(删除远程分支上的serverfix)
	
	基本上这个命令做的只是从服务器上移除这个指针。 Git 服务器通常会保留数据一段时间直到垃圾回收运行，所以如果不小心删除掉了，通常是很容易恢复的

 2.3 如果想要查看设置的所有跟踪分支，
 可以使用 git branch 的 -vv 选项

拉取远程分支:

当 git fetch 命令从服务器上抓取本地没有的数据时，它并不会修改工作目录中的内容。 它只会获取数据然后让你自己合并。 
然而，有一个命令叫作 git pull 在大多数情况下它的含义是一个 git fetch 紧接着一个 git merge 命令。 
如果有一个像之前章节中演示的设置好的跟踪分支，不管它是显式地设置还是通过 clone 或 checkout 命令为你创建的，
git pull 都会查找当前分支所跟踪的服务器与分支，从服务器上抓取数据然后尝试合并入那个远程分支。

由于 git pull 的魔法经常令人困惑所以通常单独显式地使用 fetch 与 merge 命令会更好一些。

 ```


```git
Git 工具:
引用日志:
当你在工作时， Git 会在后台保存一个引用日志(reflog)，引用日志记录了最近几个月你的 HEAD 和分支引用所指向的历史。
注意: 引用日志只存在于本地仓库，一个记录你在你自己的仓库里做过什么的日志,其他人拷贝的仓库里的引用日志不会和你的相同；而你新克隆一个仓库的时候，引用日志是空的，因为你在仓库里还没有操作

git reflog

每当你的 HEAD 所指向的位置发生了变化，Git 就会将这个信息存储到引用日志这个历史记录里。 通过这些数据，你可以很方便地获取之前的提交历史。 如果你想查看仓库中 HEAD 在五次前的所指向的提交，你可以使用 @{n} 来引用 reflog 中输出的提交记录。

查看HEAD在五次前所指向的提交:
git show HEAD@{5} 

查看master分支在昨天的时候指向了哪个提交:
git show master@{yesterday}

git show HEAD^ 查看HEAD的上一个提交, 也就是HEAD 的父提交

提交区间:
  双点:
	这种语法可以让 Git 选出在一个分支中而不在另一个分支中的提交:
	git log master..voss
	显示 在voss 分支 而不在master 中的提交
	git log voss..master:
	显示 在master 分支上，而不在Voss中的提交.

  查看你即将推送到远端的内容：
	git log origin/master..HEAD
	（即显示在HEAD指针的提交，而不在远程origin/master 上的提交）

多点：
有时候你可能需要两个以上的分支才能确定你所需要的修订，比如查看哪些提交是被包含在某些分支中的一个，但是不在你当前的分支上。 Git 允许你在任意引用前加上 ^ 字符或者 --not 来指明你不希望提交被包含其中的分支

比如: 想查看
所有被 refA 或 refB 包含的但是不被 refC 包含的提交
下面的两个命令是等价的：
git log refA refB ^refC
git log refA refB --not refC

三点：
显示 被两个引用中的一个包含但又不被两者同时包含的提交：
git log master...experiment

log 命令的一个常用参数是 --left-right，它会显示每个提交到底处于哪一侧的分支
git log --left-right master...experiment

交互式暂存:
git add -i 
等价于: git add --interactive

当你修改一组文件后，希望这些改动能放到若干提交而不是混杂在一起成为一个提交时，这几个工具会非常有用。
即我同时修改了几个不同项目，但是我想做三个针对每个项目的提交，一种比较笨的方式是一个一个的git add ****
上面的命令就是简化这个操作的：
它将暂存的修改列在左侧，未暂存的修改列在右侧。
在这块区域后是命令区域。 在这里你可以做一些工作，包括暂存文件、取消暂存文件、暂存文件的一部分、添加未被追踪的文件、查看暂存内容的区别。

暂存与取消暂存文件:
 暂存文件:
   What now> 提示符后键入 2 或 u
	 要暂存 TODO 与 index.html 文件，可以输入数字: 
	 Update>> 1,2 表示想要暂存 第1和第3个文件
	 再按回车键
 取消暂存:
	  What now> 提示符后键入 3 或 r
		输入想要取消暂存的文件数字，如:1
		再按回车键，这样就取消了1文件的暂存
 exit 命令可以退出交互式暂存界面.
   
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