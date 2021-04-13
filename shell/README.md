# SHELL 语法以及实例

## 语言简介
> Bash，Unix shell的一种，在1987年由布莱恩·福克斯为了GNU计划而编写。
> 1989年发布第一个正式版本，原先是计划用在GNU操作系统上，但能运行于大多数类Unix系统的操作系统之上，包括Linux与Mac OS X v10.4起至macOS Mojave都将它作为默认shell，
> 而自macOS Catalina，默认Shell以zsh取代。  
> -- 

## 语法与特性
bash的命令语法是Bourne shell命令语法的超集。  
数量庞大的Bourne shell脚本大多不经修改即可以在bash中执行，只有那些引用了Bourne特殊变量或使用了Bourne的内置命令的脚本才需要修改。  
bash的命令语法很多来自Korn shell（ksh）和C shell（csh），例如命令行编辑，命令历史，目录栈，$RANDOM和$PPID变量，以及POSIX的命令置换语法：$(...)。  
作为一个交互式的shell，按下TAB键即可自动补全已部分输入的程序名，文件名，变量名等等。

使用'function'关键字时，Bash的函数声明与Bourne/Korn/POSIX脚本不兼容（Korn shell 有同样的问题）。  
不过Bash也接受Bourne/Korn/POSIX的函数声明语法。  
因为许多不同，Bash脚本很少能在Bourne或Korn解释器中运行，除非编写脚本时刻意保持兼容性。  
然而，随着Linux的普及，这种方式正变得越来越少。不过在POSIX模式下，Bash更加符合POSIX。

## 语法

### 变量定义

### 函数

### 表达式

### 交互

### 常用 api

## 常用场景


## 结语

