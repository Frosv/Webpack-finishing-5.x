# Webpack 原理分析

## 发展历史

最早我们会基于文件划分的方式实现模块化，也就是 Web 最原始的模块系统。

* 文件划分方式
* 命名空间方式
* IIFE
* IIFE 依赖参数

CommonJS > AMD > es modules

### CommonJS

Node.js 执行机制是在启动时加载模块，执行过程中只是使用模块，但是如果要在浏览器端使用同步的加载模式，就会引起大量的同步模式请求，导致应用运行效率低下

## loader

use 是从后往前执行。

## Plugin

钩子机制

### run => compiler

在开始读取 records 之前调用。

### entryOption => content,entry

读取配置文件

### make => compilation

非常重要的一个过程

### emit => compilation

输出 asset 到 output 目录之前执行。

### done => stats

在 compilation 完成时执行。

## Code Splitting

## 动态导入

在vue route中使用 import 就可以自动动态导入

## 魔法注释

``` js
/* webpackChunkName: 'posts' */
```
