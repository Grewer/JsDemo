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


在这个网站,你可以更加直接地看到 code 和 ast 的比较:
https://lihautan.com/babel-ast-explorer


### 参考资料
https://lihautan.com/step-by-step-guide-for-writing-a-babel-transformation/
