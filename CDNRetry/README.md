# 关于 cdn 在 web 项目的使用

当我们在项目中引入公共 cdn 时,想要考虑一些东西,现在我把他描写一下

## 公共 cdn 的选择

> 这里只讨论免费的 cdn

1. BootCDN   
   https://www.bootcdn.cn/  
   - 库同步于 cdnjs
   - 支持海外节点,但是较慢
   - http/2
   - 国内大部分地区都可访问(部分地区可能缓慢)
    
2. 又拍云  
   http://jscdn.upai.com/  
   - 需要登录注册,申请
   - http/3
   - 支持海外节点
   - 国内与国外速度都是较快
   
3. CDNJS  
   https://cdnjs.com/  
   - 国内部分区域无法访问
   - 国外速度较快
   - http/2
    
4. jsDelivr  
   https://www.jsdelivr.com/  
   - 国内大部分地区较快
   - 国外速度稳定,较好 
   - http/2
   - 支持 UNPKG 的功能, 从 NPM 获得文件
   
5. UNPKG  
   https://unpkg.com/  
   - 国内速度较慢, 国外速度较快
   -  从 NPM 获得文件
   - HTTP2
   
6. 七牛  
   http://staticfile.org/
   - 国内大部分地区速度稳定,快速
   - 国外速度也很快
   - 库同步于 cdnjs
   - 暂不支持 HTTP2

7. 75cdn  
   https://cdn.baomitu.com/
   - 有国外节点可用,但是稍慢
   - 国内速度较稳定
   - 支持 HTTP2
   - 有 Google 字体库
   

较好用的,比较稳定的基本上就上述这些, 如果有问题可用此网站实时测试:
https://www.17ce.com/

## cdn 选择总结
如果项目一直运行在国内, 可以选择 BootCDN, 又拍云,jsDelivr,七牛,75cdn  
如果是海外项目, 可以选择: UNPKG,jsDelivr, CDNJS, 七牛  
如果想要兼容海内外,可以选择: jsDelivr, 七牛


## cdn 容错处理

cdn 虽然好,但是当我们引入 cdn 时,就将我们的生命周期绑定在一起,
一旦出现了什么问题,我们的那一段代码就无法使用了  
所以我们对于公共的 cdn 就要加上容错处理:


### 方案 1

```
<script src="http://cdn.staticfile.org/jquery/2.1.0/jquery.min.js">
<script>window.jQuery || document.write('<script src="/jquery.min.js">')</script>
```

在 cdn 的 script 后加入一句容错处理
这样的写法,如果不借用插件会显示比较麻烦, 如果 cdn 只有1,2 个的话还好, 如果有异步 cdn 引入就显得更麻烦了  
`document.write('<script src="/jquery.min.js">')` 可以使用本地的数据, 也可以使用另一个 cdn

### 方案 2

使用库来解决这个问题:
原库:
https://github.com/Nikaple/assets-retry  
可以监听 cdn, css , 图片(包括 css 背景图)的加载失败, 并且失败后找到预先设置的替代品

经过我修改的库:
https://github.com/Grewer/assets-retry  
只针对 js cdn 的加载失败进行监听  
虽然减少了功能,但是去除的都是用处较少的功能, 这样专精于 js cdn 并且体积也少了(因为要在项目一开始加载)  
使用哪个库,看自己的需要


说下原理:

1. 通过监听 error 事件, 来获取事件实例, 再判断是否是 script 的加载错误
2. 如果是 script 的错误, 则在已定义的规则中匹配
3. 匹配通过, 则使用替换的地址
4. 重新加载替换 cdn 地址

使用起来也较为方便, 如果项目里有 html 或者 ejs 文件可以直接复制代码到 script 里面
如果没有也可以通过插件来插入代码


最简单的使用例子:
```
    <script type="text/javascript">
        var assetsRetry=function(){"use strict";   // 代码的引用省略}();
    </script>
    <script type="text/javascript">
        var assetsRetryStatistics = window.assetsRetry({
            domain: {
                'https://cdn.jsdelivr.net/npm/video.js@7.10.22/dist/':
                    'https://cdn.bootcdn.net/ajax/libs/video.js/7.10.1/'
            }
        })
    </script>
    <script src="https://cdn.jsdelivr.net/npm/video.js@7.10.22/dist/video.js"></script>
    
    
```

在 `jsdelivr` 中我使用了 不存在的版本, 所以这一定不会被加载, 但我们检测到之后, 会使用 `https://cdn.bootcdn.net/ajax/libs/video.js/7.10.1/` 来替换, 使得加载可以成功

## 总结

在 web或者 h5 项目中, 使用 cdn 确实能加快首屏渲染并且减少网站流量  
并且通过这些方案可以有效减少出问题的概率, 十分值得推广

例子地址: https://github.com/Grewer/JsDemo/tree/master/CDNRetry
