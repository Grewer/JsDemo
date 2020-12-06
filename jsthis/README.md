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
```
var getIns = obj.get.bind(obj)
getIns() // 2
```
套用情景 5 this 丢失的场景, 可以看到, 现在打印的是我们想要的值了

### 场景八:
```
var o3 = {
    text: 'o3',
    fn: function () {
        var fn = o1.fn
        return fn.call(this)
    }
}

console.log('情景 8  o3 丢失 this 的情况修改', o3.fn()) // undefined
```
该场景使用 call/apply
这两个函数的作用是一样的,唯一不一样在于传参:
`call(this,1,2,3)`  
`apply(this, [1,2,3])`

#### apply 这些函数特殊的地方:
```
var array = ['a', 'b'];
var elements = [0, 1, 2];
array.push.apply(array, elements);
console.log(array); // ["a", "b", 0, 1, 2]
```
通过 apply 直接 push 了多个参数  
在 es6 之后 也快使用这种方式: `array.push(...elements)`

### 场景九:
```
class Foo {
    name = "mike"

    say() {
        console.log(this.a)
    }

}

var FooIns = new Foo()
FooIns.say() // undefined
```
class 中的函数, 这也属于一种 this 丢失的场景
熟悉 react 的人应该就知道这个场景

## new 绑定

这里说的new 绑定和情景 9 是不一样, 说的是构造函数的绑定:

### 场景十
```
// es5代码
function Foo2() {
    this.bar = "LiLz"
}

const Foo2Ins = new Foo2()
console.log(Foo2Ins.bar) // LiLz
```
在上面情景一中 this 指向的是 window, 在场景 10 中, 通过 new 成功将 this 绑定在了 Foo2Ins 上

### 场景十一
```
class Foo3 {
    constructor() {
        this.bar = 'lisa'
    }
}

var Foo3Ins = new Foo3()
console.log(Foo3Ins.bar) // lisa
```
从这里可以看到 new 的作用, 虽然改变指向只是他的一部分功能

## 特殊情况-严格模式

### 场景十二
```js
function foo2() {
    'use strict'
    console.log('严格模式下的 this', this)
}

foo2() // undefined

```

可以看到在严格模式下 普通的 this 指向就是会丢失

## 特殊情况-箭头函数
我们来看看箭头函数对应的 this 有什么区别

### 场景十三
```
const bar = () => {
    'use strict'
    console.log('箭头函数', this)
}
bar() // windows

```
即使在严格模式下 箭头函数中的 this 也不会是 undefined


### 场景十四
```
const get2 = () => {
    console.log(this, this.a);
}

var obj3 = {
    a: 2,
    get2
}

obj3.get2() // window, undefined
```
隐式调用无法改变其指向

### 场景十五
```js
obj3.get2.bind(obj3)() // 同场景 14
obj3.get2.call(obj3) // 场景 14
```

### 结论四
这里可以得出结论, 隐式/显示调用都不能改变箭头函数的指向

### 场景十六
```js

const  Foo4 = () => {
    this.bar = "LiLz"
}

const Foo4Ins = new Foo4()
console.log(Foo4Ins.bar) // TypeError: Foo4 is not a constructor
```
遇到 new 时, 可以看到箭头函数,他是无法被作为构造函数的

### 场景十七
```
class Foo5 {
    name = "mike"

    say = () => {
        console.log(this.name)
    }

}

var Foo5Ins = new Foo5()
Foo5Ins.say() // mike
```
### 结论五
至此可以得出 this 改变的权重:  箭头函数 = new  > bind/apply/call > 函数调用
