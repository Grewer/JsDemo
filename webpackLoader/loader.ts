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


export default function (source) {
  // @ts-ignore
  const options = getOptions(this);

  validate(schema, options);

  console.log('run', source)

  // return `export default ${JSON.stringify(source) }`;
  // return JSON.stringify(source) ;
  return source;
};

// module.exports = function (source) {
//   // source 为 compiler 传递给 Loader 的一个文件的原内容
//   // 该函数需要返回处理后的内容，这里简单起见，直接把原内容返回了，相当于该 Loader 没有做任何转换
//   const options = getOptions(this)
//   console.log(':loader', source, options, options.foo)
//   return source;
// };
//

