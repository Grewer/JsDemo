var babel = require("@babel/core");

const code = `const a = 1 + 2;`

// code 解析成 ast
const result = babel.transformSync(code, {ast: true});
console.log(result.ast)


// const { code } = babel.transformFromAstSync(result.ast, {
//     presets: ["minify"],
//     babelrc: false,
//     configFile: false,
// });
//
// console.log(code)
