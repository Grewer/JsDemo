## 什么是 babel

> Babel 是一个工具链，主要用于将 ECMAScript 2015+ 版本的代码转换为向后兼容的 JavaScript 语法，以便能够运行在当前和旧版本的浏览器或其他环境中。

## 什么是抽象语法树（AST）

> 在计算机科学中，抽象语法树（Abstract Syntax Tree，AST），或简称语法树（Syntax tree），是源代码语法结构的一种抽象表示。 它以树状的形式表现编程语言的语法结构，树上的每个节点都表示源代码中的一种结构。 之所以说语法是“抽象”的，是因为这里的语法并不会表示出真实语法中出现的每个细节。

对于 `AST` 的相关介绍:

推荐的介绍链接:
[Leveling Up One’s Parsing Game With ASTs](https://medium.com/basecs/leveling-up-ones-parsing-game-with-asts-d7a6fc2400ff)  
中文翻译: https://segmentfault.com/a/1190000038511186
  
维基百科里的介绍: https://en.wikipedia.org/wiki/Abstract_syntax_tree

## babel 的简单使用

相关 api 可以参考文档: https://babeljs.io/docs/en/babel-core#parse  

使用 babel 的 API 将代码解析成 ast:

```js
var babel = require("@babel/core");

const code = `const a = 1 + 2;`

// code 解析成 ast
const result = babel.transformSync(code, {ast: true});
console.log(result.ast)
```

当然 ast 也可以转换成代码:

```js
const { code } = babel.transformFromAstSync(result.ast, {
    presets: ["minify"],
    babelrc: false,
    configFile: false,
});

console.log(code)
```

在这个在线网站,你可以更加直接地看到 code 和 ast 的比较:
https://lihautan.com/babel-ast-explorer

`const n = 1` 的 ast:

```
-program:Program{
    sourceType:"module"
    -body:[
        -VariableDeclaration {
            -declarations:[
                -VariableDeclarator{
                    -id:Identifier{
                        name:"n"
                    }
                    -init:NumericLiteral{
                        -extra:{
                            rawValue:1
                            raw:"1"
                        }
                        value:1
                    }
                }
            ]
            kind:"const"
        }
    ]
    directives:[]
}
```

### babel 插件:
```js
var babel = require("@babel/core");

const code = 'const n = 1';

const output = babel.transformSync(code, {
    plugins: [
        function myCustomPlugin() {
            return {
                visitor: {
                    Identifier(path) {
                        // 在这个例子里我们将所有变量 `n` 变为 `x`
                        if (path.isIdentifier({ name: 'n' })) {
                            path.node.name = 'x';
                        }
                    },
                },
            };
        },
    ],
});

console.log(output.code);
// const x = 1;
```

通过 babel 的插件我们可以对代码进行随心所以的修改


关于 `visitor` 使用的是访问者模式, 在遍历阶段，babel会先进行深度优先遍历来访问AST的每一个节点。你可以为访问指定一个回调函数，然后每当访问某个节点的时候，babel会调用这个函数，并给函数传入当前访问的节点。

现在我们添加另一个函数: `NumericLiteral`, 在刚刚的 ast 中我们可以看到 `const n = 1` 是有 `NumericLiteral` 此节点的

```js
function myCustomPlugin() {
  return {
    visitor: {
      Identifier(path) {
        console.log('identifier');
      },
      NumericLiteral(path) {
        console.log('NumericLiteral');
      },
    },
  };
}
```

运行 `plugin.js`, 打印结果:

```
Identifier
NumericLiteral
const x = 1;
```
即在碰到此节点的时候 就会触发插件中对应节点的回调, 关于回调函数的 path 可以在此文档中查看: https://github.com/jamiebuilds/babel-handbook/blob/master/translations/en/plugin-handbook.md#paths


### 修改表达式
在插件方法 `NumericLiteral` 上添加操作:
```js
visitor: {
    // 省略其他方法
    NumericLiteral(path) {
        console.log('NumericLiteral');
        const newNode = babel.types.binaryExpression('+', babel.types.NumericLiteral(path.node.value), babel.types.NumericLiteral(10));
        path.replaceWith(newNode);

        path.skip();
        // 因为我们新增加了一个 NumericLiteral, 所以插件会检测到, 并且又会触发此回调,造成无限循环
        // skip 的作用就是跳过对当前路径子节点的访问
    }
}
```

这里我们新建了一个 binaryExpression, 将 `const x = 1` 转换为 `const x = 1 + 10`

这是关于 `babel.types` 的文件: https://www.babeljs.cn/docs/babel-types


本文代码记录: https://github.com/Grewer/JsDemo/tree/master/babel2AST

### 参考资料
https://lihautan.com/step-by-step-guide-for-writing-a-babel-transformation/
