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


## 增加数据

针对 loki 里的 `Collection` 如果了解数据库,可以将它当成 `表` 这种结构

想要添加数据,需要先获取 `collection` 对象

可以在添加 `collection` 的时候获取:

```
const users = db.addCollection('users', {indices: ['email']});
```

可以直接获取:
```
const coll = db.getCollection('users')
```

注意 `addCollection` 有 2 个参数可以传递:

- 第一个参数是 name 是 collection 的名称

- 第二个是可选项参数,它拥有很多参数:

|名称 |类型| 属性 |默认值| 描述|
| --- | --- | --- | --- | --- |
| `unique` |数组| <可选>|  [] |属性名称数组，用于定义唯一约束 |
| `exact` |数组 | <可选>| [] |属性名称数组，用于定义确切的约束 |
| `indices` |数组| <可选>|  [] |用于定义二进制索引的数组属性名称 |
| `adaptiveBinaryIndices` |布尔值| <可选>|true|收集索引将被重新建立而不是懒加载 |
| `asyncListeners` |布尔值| <可选>|false|侦听器是否异步调用 |
| `disableMeta` |布尔值| <可选>|false|设置为true以禁用文档的元属性 |
| `disableChangesApi` |布尔值| <可选>|true|设置为false以启用Changes API |
| `disableDeltaChangesApi` |布尔值| <可选>|true|设置为false以启用Delta更改API（需要更改API，强制克隆） |
| `autoupdate` |布尔值| <可选>|false|使用Object.observe自动更新对象 |
| `clone` |布尔值| <可选>|false|指定是否向用户插入或从用户克隆查询 |
| `serializableIndices` |布尔值| <可选>|true[] |将二进制索引属性上的日期值转换为纪元时间 |
| `cloneMethod` |字符串| <可选>| 'parse-stringify'  | 'parse-stringify', 'jquery-extend-deep', 'shallow', 'shallow-assign' |
| `ttl` | int | <可选>| |文件被认为是陈旧/过时之前的文件时间（以毫秒为单位）。|
| `ttlInterval` | int | <可选>| |清除“陈旧”文件的时间间隔；默认情况下未设置。|


### 使用 inert 添加数据

```
const coll = db.getCollection('users')
var odin = users.insert({name: 'odin', email: 'odin.soap@lokijs.org', age: 38});
var thor = users.insert({name: 'thor', email: 'thor.soap@lokijs.org', age: 25});
var stan = users.insert({name: 'stan', email: 'stan.soap@lokijs.org', age: 29});
```

这里要注意的是: 分清楚数据的存储状态, 当我们不使用自动保存和手动保存的时候 insert, 会将数据插入 collection 中, 但是当我们刷新页面的时候,数据会重置会原来的数据,
如果我们要将数据全部存下来(即使刷新也会存在的话), 就需要保存:
```
// var db = new loki('Example'); 这是 db 的由来
db.saveDatabase(error => {
  console.log('保存数据')
  error && console.log(error)
})
```

## 获取数据:
获取数据是比较灵活的,我这里说两种方法:
#### 方法一:
```

const dv = coll.addDynamicView('test');

const results = dv.data();

console.log(results)
// 这是results打印结果
// 0: {name: "odin", email: "odin.soap@lokijs.org", age: 38, meta: {…}, $loki: 1}
// 1: {name: "thor", email: "thor.soap@lokijs.org", age: 25, meta: {…}, $loki: 2}
// 2: {name: "stan", email: "stan.soap@lokijs.org", age: 29, meta: {…}, $loki: 3}
// 3: {name: "oliver", email: "oliver.soap@lokijs.org", age: 31, meta: {…}, $loki: 4}
// 4: {name: "hector", email: "hector.soap@lokijs.org", age: 15, meta: {…}, $loki: 5}
// 5: {name: "achilles", email: "achilles.soap@lokijs.org", age: 31, meta: {…}, $loki: 6}
```

#### 方法二:
```
const resultsLine = coll.chain().data();

console.log(resultsLine)
// 结果与方法一相同
```

### 获取数据时筛选想要的数据:
#### 方法 1 的筛选:
```
const dv = coll.addDynamicView('test');

dv.applyFind({ 'name' : 'odin' });
// 使用方法于 数组的 find 函数
const results = dv.data();
// 打印结果:
// [{
//   $loki: 1
//   age: 38
//   email: "odin.soap@lokijs.org"
//   meta: {revision: 0, created: 1597304111206, version: 0}
//   name: "odin"
// }]


dv2.applyWhere(function(obj) { return obj.name === 'oliver'; });
// 作用与上述方法相同


// 根据年龄进行排序
const dv3 = coll.addDynamicView('test3');

dv3.applySimpleSort("age");

const results3 = dv3.data();

console.log(results3)

```
#### 方法 2 的筛选:
```
// 简单的筛选
const resultsLine2 = coll.chain().find({ 'name' : 'odin' }).data();

// 排序:
const resultsLine3 = coll.chain().simplesort('age').data();
```

## 修改数据:
与 insert 同理:

```
// 要修改 就需要先获取要修改的东西是什么 
const resultsLine2 = coll.chain().find({ 'name' : 'odin' }).data();
const item = resultsLine2[0]

item.age = 18
coll.update(item);

console.log(coll.chain().data())
// 打印发现名字为 odin 的年龄已经改成了 18

// 当然想要持久化就得保存数据库:
db.saveDatabase(error => {
  console.log('保存数据')
  error && console.log(error)
})
```




官方文档地址:

http://techfort.github.io/LokiJS/
