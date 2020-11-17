## 写一个 loader 插件, 了解 webpack 机制

### 位置
> 首先我们要知道 loader 插件是写在哪里的

打开 `webpack.config.js`  文件, 在 `module.rules` 中加入我们的自定义 loader:

```
{
    test: /\.js$/,
    use: [
      {
        loader: path.resolve(__dirname, './loader.js'),
        options: {/* ... */}
      }
    ]
}
```

而我们创建对应路径的 loader: 

loader:  
```

```
