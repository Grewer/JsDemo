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

// 也可以同时插入多个数据
// users.insert([{ name: 'Thor', age: 35}, { name: 'Loki', age: 30}]);

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

##### find
```
// 通过 coll 直接获取
const results4 = coll.find({'age': {'$aeq': 15}});
console.log('获取数据 4',results4)

// 可使用不同的指令:
// 指令名 作用
// $eq  ===
// $ne  !==
// $aeq  ==
// $dteq 时间上的相等
// $gt  >
// $gte >=
// $lt  <
// $lte  <=
// $between   介于 2 个数之间

// 如果不希望使用二进制索引，并且希望简单的javascript比较是可以接受的，我们提供以下操作，由于它们的简化比较，它们可以提供更好的执行速度。

// $gt -> $jgt
// $gte -> $jgte
// $lt -> $jlt
// $lte -> $jlte
// $between -> $jbetween
// $regex 使用正则

```


##### applyFind
```
const dv = coll.addDynamicView('test');

dv.applyFind({ 'name' : 'odin' });
const results = dv.data();
```

##### applyWhere
```

dv2.applyWhere(function(obj) { return obj.name === 'oliver'; });
// 作用与上述方法相同
```

##### applySimpleSort
```
// 根据年龄进行排序
const dv3 = coll.addDynamicView('test3');

dv3.applySimpleSort("age");

const results3 = dv3.data();

console.log(results3)
```

##### findOne
```
const results5 = coll.findOne({'age': {'$aeq': 31}});
// 获取到的是对象  而不是一个数组
console.log('获取数据 5',results5)
```

##### findObject

```
const results6 = coll.findObject({'age': 38});
// 使用的结果和 findOne 类似
console.log('获取数据 6',results6)
```

##### findObjects
```
const results7 = coll.findObjects({'age': 31});
// 返回的是一个数组
console.log('获取数据 7',results7)
```

比较推荐的是使用 `addDynamicView` 的方式来筛选,而不是通过 `collection` 直接获取

需要注意的是 `DynamicView` 是一个数据格式,他可以 add  可以 get 也可以 remove

#### 方法 2 的筛选:
```
// 简单的筛选
const resultsLine2 = coll.chain().find({ 'name' : 'odin' }).data();

// 排序:
const resultsLine3 = coll.chain().simplesort('age').data();
```

当然 chain 里还有其他操作,如: limit, map, findAnd, eqJoin, count等等,  
我是更推荐使用第一种方法,这里的几种使用方案我就不详细举例了

还有不建议使用 chain 的 update,remove 等操作,因为监听器里面会监听不到事件,
这个问题不知道是故意这么做 还是 bug


## 修改数据:

##### update
与 insert 同理:

```
// 要修改 就需要先获取要修改的东西是什么 
const item = coll.findOne({'age': {'$aeq': 31}});

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

##### findAndUpdate

```
coll.findAndUpdate({'age': {'$aeq': 25}}, data => {
    // 原名"thor"
    data.name = 'grewer'
    return data
})

// 获取并且修改 集中在同一个方法里面
console.log('修改结果 2', coll.chain().data())
```
##### updateWhere
```

coll.updateWhere(data => {
    return data.name === 'grewer';
}, data => {
    data.age = '999'
    return data
})

// 与上面的类似,但是更加自由,而且还可以是用 `{'age': {'$aeq': 15}}` 这种方法来获取

```
## 删除数据:

##### remove
删除数据也是非常简单的(与更新类似):
```
const item2 = coll.findOne({'age': {'$aeq': 31}});

coll.remove(item2);

console.log(coll.chain().data())
```

##### findAndRemove

```
coll.findAndRemove({'age': {'$aeq': 15}})
// 同 findAndUpdate, 集中了 find 和 remove
console.log('修改结果 2', coll.chain().data())
```

##### removeWhere
```
// 同 updateWhere
coll.removeWhere((value,index)=>{
    return index === 1
})

console.log('删除结果 3', coll.chain().data())
```

## 添加操作的监听:



官方文档地址:

http://techfort.github.io/LokiJS/
