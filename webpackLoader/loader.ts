import {getOptions} from 'loader-utils';
import {validate} from 'schema-utils';
import * as typescript from 'typescript'


// compiler: typeof typescript
//const babel = require("@babel/core");
//const transform = promisify(babel.transform);
const schema = {
  type: 'object',
  properties: {
    test: {
      type: 'string'
    }
  }
} as const

export default function (source: string) {
  const options = getOptions(this);

  validate(schema, options);

  // console.log('source', source)

  // const _source = source.replace(/alert\(1\)/, `console.log('grewer')`)
  //
  // console.log('_source', _source)

  // const callback = this.async()
  // 对于异步加载程序，this.async用于检索回调函数
  // 参考: https://webpack.js.org/api/loaders/#asynchronous-loaders
  //
  // console.log('callback', callback)

  // const rawFilePath = path.normalize(this.resourcePath)


  // 关于 ts 的 API 可以参考这篇文章:
  // 使用 TypeScript complier API:  https://zhuanlan.zhihu.com/p/141410800
  const compiler = typescript

  let result = compiler.transpileModule(source, { compilerOptions: { module: typescript.ModuleKind.CommonJS } })

  console.log(result.outputText)

  return result.outputText;
};
