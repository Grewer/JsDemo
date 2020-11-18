## 写一个 loader 插件, 了解 webpack 机制

### 位置
> 首先我们要知道 loader 插件是写在哪里的

打开 `webpack.config.js`  文件, 在 `module.rules` 中加入我们的自定义 loader:

```
{
    test: /\.js$/,
    use: [
      {
        loader: path.resolve(__dirname, './build/loader.js'),
        options: {
          foo: true,
        }
      }
    ]
}
```

而我们创建对应路径的 loader.ts  这里我们使用 ts 来写 loader: 

loader.ts:  
```
import {getOptions} from 'loader-utils';
import {validate} from 'schema-utils';

const schema = {
  type: 'object',
  properties: {
    test: {
      type: 'string'
    }
  }
} as const
// 用来验证参数的工具

export default function (source) {
  //  通过工具函数 getOptions 来获取参数
  const options = getOptions(this);
  
  // 使用工具参数来验证, 如果不通过验证则抛出 Error 
  validate(schema, options);
   
  // 打印代码
  console.log('source', source)
  
  // 在这里我们可以对代码进行一系列的操作

  return source;

};
```
