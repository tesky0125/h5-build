# h5-build

基于 webpack 的构建封装.

----

## 特性

- 基于 webpack 实现
- 支持通过 `webpack.config.js` 进行扩展 webpack 的配置项
- 支持 stage-0, es2015, react

## 安装

```bash
$ npm i h5-build --save
```

## 使用

```bash
$ h5-build [options]
```

### 命令行参数

```bash
$ h5-build -h
  
  Usage: h5-build [options]
  
  Options:
  
    -h, --help                output usage information
    -v, --version             build version number
    -l, --library             build target is library or business project
    -d, --debug               release or debug mode
    -p, --port                debug port
    --outputPath          webpack output path
    --publicPath          webpack public path
    -w, --watch [delay]       watch file changes and rebuild
    --devtool <devtool>       sourcemap generate method, default is null
    --config <path>           custom config path, default is webpack.config.js
    --no-compress             build without compress 
```

### 配置扩展

如果需要对内置的 webpack 配置进行修改, 可在项目根目录新建 `webpack.config.js` 进行扩展.


让 `webpack.config.js` 输出 `Function`, 比如:

```javascript
var path = require("path");
module.exports = function(webpackConfig) {
  webpackConfig.output.path = path.join(__dirname, './public');
  return webpackConfig;
};
```

参数:

- `webpackConfig` -- 默认配置, 修改后返回新的配置



