# SHELL 语法以及实例

## 语言简介
> Bash，Unix shell的一种，在1987年由布莱恩·福克斯为了GNU计划而编写。
> 1989年发布第一个正式版本，原先是计划用在GNU操作系统上，但能运行于大多数类Unix系统的操作系统之上，包括Linux与Mac OS X v10.4起至macOS Mojave都将它作为默认shell，
> 而自macOS Catalina，默认Shell以zsh取代。  
> -- 来自于维基百科

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

```
name="foo"
```
注意，**变量名和等号之间不能有空格**，这可能和你熟悉的所有编程语言都不一样。  
同时，变量名的命名须遵循如下规则：

*   命名只能使用英文字母，数字和下划线，首个字符不能以数字开头。
*   中间不能有空格，可以使用下划线（\_）。
*   不能使用标点符号。
*   不能使用bash里的关键字（可用help命令查看保留关键字）。


#### 使用变量

使用只需要加上美元符号 `$` 即可

打印: `echo $name`  
打印结果: `foo`

如果不加美元符号, 则就是一个字符串:

打印: `echo name`  
打印结果: `name`

当然变量的两边也可以加上花括号:

```
name="foo"

echo "I am good at ${name} Script"
echo "I am good at $name Script"

// 这两句是等价的 花括号的优势在于空格
```

#### 定义只读变量

```
url="mo.fish"
readonly url

url="jandan.net"
```
再次赋值时,即会报错: `index.sh: line 14: url: readonly variable`

#### 删除变量
```
name="foo"
url="mo.fish"

unset url
unset name
```
注意: 只读变量是无法删除的, 报错: `index.sh: line 14: unset: url: cannot unset: readonly variable`

普通变量被删除后,打印结果为空

### 关于字符串

在 shell 中 尽量使用**双引号**
**因为单引号中,变量是无效的**, 这是很重要的一点

#### 字符串拼接
通过空格即可拼接:

```
name="foo"
url="mo.fish"

echo $name $url
```

#### 字符串长度
加上 `#` 即可

```
name="foo"
echo ${#name}
```

#### 字符串截取
使用冒号:
```
url="mo.fish"

echo ${url:1:3}
// 打印: o.f
// 从 0 开始  第一位至第三位
```

### 数组

#### 数组定义
用括号来表示数组，数组元素用"空格"符号分割开。

```
arr=($name $url)
echo ${arr[1]}

// echo ${arr} 等于 echo ${arr[0]}“
```
#### 打印所有数组

这一点是比较特殊的
```
arr=($name $url)
echo ${arr[@]}
```

#### 获取数组长度
和字符串类似:

```
length=${#arr[@]}
echo $length
```


### 函数

### 交互

### 常用 api

## 常用场景


## 结语

