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
### 事件的分类

参考引用:
http://www.ruanyifeng.com/blog/2013/10/event_loop.html
https://segmentfault.com/a/1190000016278115
https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/EventLoop
