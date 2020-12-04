# 关于 js 中 js 指向的问题

本文章通过代码的运行,得出 this 的指向结论

下面通过一些场景来描述 this 的具体指向:

## 默认绑定

### 场景一:
```
console.log('普通情况', this) // window
```
在普通状态下, this 指向的是全局变量 window

### 场景二:
```
function foo() {
    console.log('普通函数体', this)
}

foo() // window
```
在函数体内, this 也是指向全局变量 window

### 结论一:
在正常,无任何调用的情况下, this 是指向全局变量 window 的

## 隐式绑定:

### 场景三:
```
function get() {
    console.log(this.a);
}

var obj = {
    a: 2,
    get
}

obj.get() // 2
```
在 obj.get 调用下, get 中 this 指向的就是 obj 这个对象

### 场景四:
```
var obj2 = {
    obj,
    a: 1
}

obj2.obj.get() // 2
```
可以看到,尽管有二层调用, this 指向的还是最近一层中的 this

### 结论二

从而得出, this 他所在的函数被调用了,那么他就会指向该函数, 并且会指向他最近的一个调用对象

## this 丢失的情况:
此种情况是针对 `结论二` 的不足所作出的补充

### 场景五:
```
function get() {
    console.log(this.a);
}

var obj = {
    a: 2,
    get
}

// 更换调用方式:
var getIns = obj.get
getIns() // undefined
```

如果调用对象被赋值, 在指向之后他其实是并没有调用对象的, 当然他也不会指向 window, 所以 this 指向的是 unde

### 场景六:
```
var o1 = {
    text: 'o1',
    fn: function () {
        return this.text
    }
}

var o3 = {
    text: 'o3',
    fn: function () {
        console.log('o3', this)
        var fn = o1.fn
        return fn()
    }
}

console.log('o3 丢失 this 的情况', o3.fn())  // undefined
```

可以看到 即使在 o3 中的 fn 里被调用, this 依旧是处于空的指向
此场景是为了加强场景五所作出的验证

### 结论三:
如果调用对象被赋值后调用,如果没有绑定 this, 那么他的指向将会丢失

#### 为什么会丢失
原因的话,等你看完这篇文件,大抵可以明白了: http://www.ruanyifeng.com/blog/2018/06/javascript-this.html


## 显示绑定
### 场景七:
