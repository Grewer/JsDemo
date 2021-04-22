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

### 流程控制

#### if else

if 和 其他语言有些不太相同:
```
if [ $name=="foo" ]
then
  echo "name 是 foo"
fi
// fi 表示结束  因为不像其他语言 没有 {}
```

而 else 和 if else 的话 这样写:

```
if [ $name != "foo" ]
then
  echo "name 是 foo"
else
  echo "不符合"
fi

```

``` 
if [ $name == "bar" ] ;then
  echo "name 是 bar"
elif [ $name == "foo" ]; then
  echo "name 是 foo"
else
  echo "不符合"
fi
```
这种使用 `; then` 的写法 可能更加符合我们的直觉

#### for

```
for loop in 1 2 3 4 5
do
    echo "The value is: $loop"
done
```

#### while
```
int=1
while(( $int<=5 ))
do
    echo $int
    let "int++"
done
```
for 和 while 都只用一个简单例子

### 函数

#### 定义
``` 
GrewerFn(){
    echo "这是我的第一个 shell 函数!"
}
```
#### 执行
执行是一个简单的操作:
```
GrewerFn(){
    echo "这是我的第一个 shell 函数!"
}

GrewerFn
```
只需写上函数名称 即可调用

#### 参数

```
GrewerFn(){
    echo "第一个参数为 $1 !"
    echo "第二个参数为 $2 !"
    echo "打印所有参数 $@ !"
}

GrewerFn 1 "qwer" "zxc"
```

通过这样的方法能够传递参数

而里面 `$1`, `$2` 这样的参数处理可以参数下面的表格:

| 参数处理 | 说明 |
| --- | --- |
| $# | 传递到脚本或函数的参数个数 |
| $\* | 以一个单字符串显示所有向脚本传递的参数 |
| $$ | 脚本运行的当前进程ID号 |
| $! | 后台运行的最后一个进程的ID号 |
| $@ | 与$\*相同，但是使用时加引号，并在引号中返回每个参数。 |
| $\- | 显示Shell使用的当前选项，与set命令功能相同。 |
| $? | 显示最后命令的退出状态。0表示没有错误，其他任何值表明有错误。 |

### 交互

#### 获取用户输入

##### read
使用的方法很简单:
```
read yourName
echo "you name is $yourName"
```

后面还能加参数, 如
-p 参数，允许在 read 命令行中直接指定一个提示。
```
    read -p "输入网站名:" website
    echo "你输入的网站名是 $website"
```

限定字符:
``` 
read -n1 -p "Do you want to continue [Y/N]?" answer
case $answer in
Y | y)
      echo "fine ,continue";;
N | n)
      echo "ok,good bye";;
*)
     echo "error choice";;
esac
```

##### select

```
PS3='Please enter your choice: '
options=("Option 1" "Option 2" "Option 3" "Quit")
select opt in "${options[@]}"
do
    case $opt in
        "Option 1")
            echo "you chose choice 1"
            ;;
        "Option 2")
            echo "you chose choice 2"
            ;;
        "Option 3")
            echo "you chose choice $REPLY which is $opt"
            ;;
        "Quit")
            break
            ;;
        *) echo "invalid option $REPLY";;
    esac
done
```


#### 小补充
PS1——默认提示符
PS2——再谈提示符
PS3——Shell脚本中使用select时的提示符
PS4——PS4-“set -x"用来修改跟踪输出的前缀

具体参考: https://os.51cto.com/art/201205/334954.htm


#### 其他
还有一个比较热门的 expect ,这里就不多说了, 需要下载, 有些嵌入式环境不支持


## 常用场景

- Linux 上的自动脚本: 如使用 crontab 执行定时任务, 读取修改文件

- 登录脚本等等, 可以省略很多麻烦的过程  
    当然相较于其他语言, 都是可以这样做, shell 的优势就在于原生支持

-  初始化环境, 使用脚本一键初始化整个 linux 环境,  如果接触过 cli 的话应该知道他的作用

## 结语

shell 作为 linux 官方的语言, 他附带了很多功能, 给我们提供了很多便利      
在没有环境的时候, 也可以直接运行, 学会此语言, 可以帮助你在服务器领域大展拳脚


以上部分例子来源于 https://www.runoob.com/linux/linux-tutorial.html
