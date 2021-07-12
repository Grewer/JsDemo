同步 script 的重新加载主要依靠于两个 API:

1. 监听事件
 `document.addEventListener('error', errorHandler, true)`
   
2. 重写 API
 `document.write(newHtml)`
