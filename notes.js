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

