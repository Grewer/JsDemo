# 关于 js 中 js 指向的问题

本文章通过代码的运行,得出 this 的指向结论

## 正常情况下 this 的指向:

### 直接打印 this
```
console.log(this) // window
```
直接在 console 里打印 this 可以发现 this 指向的是 window, 全局对象

### 在普通函数里
```
  function foo() {
    console.log(this)
  }

  foo() // 同样的, 也是 window
```
