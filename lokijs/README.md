## loki 数据库详解

## 介绍


LokiJS是一个面向文档的javascript数据库，与MongoDB有点相似。

它支持索引，查询和过滤数据集合。 LokiJS还支持更高级的功能，例如mapReduce，事务，并允许您实现自定义远程同步以将数据保存到服务器（或移动设备上的本地文件）。
磁盘的持久性已经在诸如nodejs之类的CommonJS环境中实现，  
在移动设备上，您只需要请求文件系统并将lokijs的serialize（）作为内容传递即可。

## 创建

创建一个 db:

```
var db = new loki('Example');
```


除了 `Example` 这个数据库的名称外, 还可以传递一个选项参数:
```
interface LokiConfigOptions {
    adapter: LokiPersistenceAdapter | null;
    autoload: boolean;
    autoloadCallback: (err: any) => void;
    autosave: boolean;
    autosaveCallback: (err?: any) => void;
    autosaveInterval: string | number;
    persistenceMethod: "fs" | "localStorage" | "memory" | null;
    destructureDelimiter: string;
    serializationMethod: "normal" | "pretty" | "destructured" | null;
    throttledSaves: boolean;
}
```

关于参数: persistenceMethod 需要注意的点:
- "fs": 只能在 node 环境中使用(包括 electron)
- "localStorage" : web 中可以使用,并且数据会存在 `localStorage` 中,进行持久存储
- "memory": 只是简单的存在内容中,如果刷新页面,数据就不存在了


在不同的环境中, 他创建的持久层是不同的, 比如
在浏览器中, 是基于 web 数据库或者 `localStorage`(默认) 的    
在 node 环境中, 可以基于 fs, 创建文件数据库  
关于他们的变化是需要一个 `option.adapter` 来进行协助  

在 web 中, 如果想要将数据存到 web 数据库中,
那么就需要 `option.adapter` 了(当传递了 `adapter` 参数时, 'persistenceMethod' 参数就会被无效)
但是如果使用了 `option.adapter`,那么只能使用自动加载数据库和字段保存数据库的方案
