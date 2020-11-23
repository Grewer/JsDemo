## 写一个 loader 插件, 了解 webpack 机制

### 位置
> 首先我们要知道 loader 插件是写在哪里的

打开 `webpack.config.js`  文件, 在 `module.rules` 中加入我们的自定义 loader:

```
{
    test: /\.ts$/,
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

参数获取:
```
const options = getOptions(this);
```

传入的参数校检:
```
const schema = {
  type: 'object',
  properties: {
    test: {
      type: 'string'
    }
  }
} as const

validate(schema, options);
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
    // 假如我们要替换一些不想要的数据:
    
    const _source = source.replace(/alert\(1\)/, `console.log('grewer')`)
    
    console.log('_source', _source)
    
    return _source;
};
```

现在使用 typescript 的 API 来解析 ts 代码:

```
  const compiler = typescript

  let result = compiler.transpileModule(source, { compilerOptions: { module: typescript.ModuleKind.CommonJS } })

  console.log(result.outputText)

  return result.outputText;
```

关于 `transpileModule` 这个 API 需要查看文档:  
原文档:[https://github.com/Microsoft/TypeScript/wiki/Using-the-Compiler-API](https://github.com/Microsoft/TypeScript/wiki/Using-the-Compiler-API)  
翻译的中文文档: [https://zhuanlan.zhihu.com/p/141410800](https://zhuanlan.zhihu.com/p/141410800)

typescript 具有很多我们不经常使用的 api, 如果有兴趣可以自己查阅

### 结语

像这样 我们就能创建我们自己的 loader, 在里面对我们的源码进行不同的操作, 像是 vue-loader  
就是通过标签 分开三种(html,js,css) 系统的代码    再将其通过不同的剩余 loader 里面

本文中写的 loader: [https://github.com/Grewer/JsDemo/blob/master/webpackLoader/loader.ts](https://github.com/Grewer/JsDemo/blob/master/webpackLoader/loader.ts)
