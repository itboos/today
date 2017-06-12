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


