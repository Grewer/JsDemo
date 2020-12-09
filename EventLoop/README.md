# js 中的 EventLoop

## 起始
### EventLoop 是什么
> JavaScript有一个基于事件循环(EventLoop)的并发模型，事件循环负责执行代码、收集和处理事件以及执行队列中的子任务。  
> 浏览器和NodeJS基于不同的技术实现了各自的Event Loop。

### 事件循环
之所以称之为 事件循环，是因为它经常按照类似如下的方式来被实现：
```js
while (queue.waitForMessage()) {
  queue.processNextMessage();
}
```
queue.waitForMessage() 会同步地等待消息到达(如果当前没有任何消息等待被处理)。

## 事件
### 同步任务和异步任务
Javascript单线程任务被分为同步任务和异步任务，同步任务会在调用栈中按照顺序等待主线程依次执行，异步任务会在异步任务有了结果后，将注册的回调函数放入任务队列中等待主线程空闲的时候（调用栈被清空），被读取到栈内等待主线程的执行。

![图片](syncAndasync.jpg)
从图中可以看出, js 的指向都是会先指向同步代码,碰到异步代码都是存入队列中, 等同步代码执行完毕之后再按照一定的规则执行

### 异步任务的分类
#### 宏任务
macrotask，也叫tasks。 一些异步任务的回调会依次进入macro task queue，等待后续被调用，这些异步任务包括
- setTimeout
- setInterval
- setImmediate (Node独有)
- requestAnimationFrame (浏览器独有)
- I/O
- UI rendering (浏览器独有)
#### 微任务
microtask，也叫jobs。 另一些异步任务的回调会依次进入micro task queue，等待后续被调用，这些异步任务包括：

- process.nextTick (Node独有)
- Promise
- Object.observe
- MutationObserver

这里只针对浏览器和NodeJS

## 运行

运行原理:
1. 运行同步任务, 微任务加入队列, 等待同步任务执行完毕
2. 查看是否有微任务, 若有则执行, 按照先进先出的规则进行
3. 微任务结束后执行宏任务, 执行完**每一个**宏任务之后都会再次进入第 2 步流程
4. 微任务和宏任务都执行完毕

### 例子1:
```
console.log('script start');

setTimeout(function() {
  console.log('setTimeout');
}, 0);

Promise.resolve().then(function() {
  console.log('promise1');
}).then(function() {
  console.log('promise2');
});
console.log('script end');
```
执行结果:
```
script start
script end
promise1
promise2
setTimeout
```
分析一下执行的过程:
1. 执行了同步代码 `console.log('script start');` 和 `console.log('script end');`
2. 执行微任务 `Promise` ,打印 `promise`
3. 执行宏任务 `setTimeout`
4. 清空队列和栈堆


### 例子 2:
```
console.log(1);

setTimeout(() => {
  console.log(2);
  Promise.resolve().then(() => {
    console.log(3)
  });
});

new Promise((resolve, reject) => {
  console.log(4)
  resolve(5)
}).then((data) => {
  console.log(data);
})

setTimeout(() => {
  console.log(6);
})

console.log(7);
```
结果:
```
1
4
7
5
2
3
6
```
执行过程:
1. 首先自然是执行同步代码: 几个 console, 关于 `new Promise` 需要注意的是, 他 `new`
   的时候, 并不是异步的,回调函数才是异步任务, 所以打印的是: 1,4,7
2. 执行微任务, promise 里的几个 then 回调函数, 所以打印 5
3. 微任务暂时执行完毕, 执行宏任务, setTimeout, 打印 2, 这个时候又出现了一个微任务加入了微任务的队列
4. 一个宏任务执行完毕了, 发现了新的同步任务和微任务,开始执行, 打印 3, 微任务执行完毕
5. 执行下一个宏任务, 打印 6
6. 全部执行完毕, 打印顺序是: 1,4,7,5,2,3,6

**在执行微队列microtask queue中任务的时候，如果又产生了microtask，那么会继续添加到队列的末尾，也会在这个周期执行，直到microtask queue为空停止。**   
当然如果你在microtask中不断的产生microtask，那么其他宏任务macrotask就无法执行了，但是这个操作也不是无限的，拿NodeJS中的微任务process.nextTick()来说，它的上限是1000个;


参考引用:
https://segmentfault.com/a/1190000016278115
https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/EventLoop
https://zhuanlan.zhihu.com/p/55511602
