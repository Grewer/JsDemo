var babel = require("@babel/core");

const code = 'const n = 1';

const output = babel.transformSync(code, {
    plugins: [
        // 你的第一个插件 ??
        function myCustomPlugin() {
            return {
                visitor: {
                    Identifier(path) {
                        console.log('Identifier')
                        // 在这个例子里我们将所有变量 `n` 变为 `x`
                        if (path.isIdentifier({name: 'n'})) {
                            path.node.name = 'x';
                        }
                    },
                    NumericLiteral(path) {
                        console.log('NumericLiteral');
                        const newNode = babel.types.binaryExpression('+', babel.types.NumericLiteral(path.node.value), babel.types.NumericLiteral(10));
                        console.log(newNode)
                        path.replaceWith(newNode);

                        path.skip();
                        // 因为我们新增加了一个 NumericLiteral, 所以插件会检测到, 并且又会触发此回调,造成无限循环
                        // skip 的作用就是跳过对当前路径子节点的访问
                    },
                },
            };
        },
    ],
});

console.log(output.code);
