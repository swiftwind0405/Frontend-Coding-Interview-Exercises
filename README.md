# Frontend-Coding-Interview-Exercises

前端编程面试题，包含各类测试用例

## 使用说明

安装依赖：

```bash
npm install
```

- 想要自己尝试某道题，直接把相应文件删除即可，比如说想自己试试实现深拷贝，那么直接清空 `deepCopy.js` 即可。
- 别忘了代码的最后一定要导出你写的方法：`module.exports = deepCopy`，否则无法正常跑测试用例。
- 然后跑这道题的测试用例，可在根目录下执行 `Jest` 命令，例如：

```bash
npx jest ./exercises/deepCopy.test.js
```

运行以下命令可测试所有编码题：

```bash
npm run test
```

如果想清除所有的代码，自己重新编写，只需要执行以下命令，即可把所有的文件删除：

```bash
npm run remove
```

## 题目

| 题目                                 | 位置                          | 难度   |
| ------------------------------------ | ----------------------------- | ------ |
| 解析一个 url 的参数                  | [parseUrl](./exercises/parseUrl.js) | Low    |
| 实现一个发布订阅模式 (eventBus 类似) | [PubSub](./exercises/PubSub.js)   | Low    |
| 实现一个深拷贝                       | [deepCopy](./exercises/deepCopy.js) | Low    |
| 实现防抖函数                         | [debounce](./exercises/debounce.js) | Medium |
| 实现节流函数                         | [throttle](./exercises/throttle.js) | Low    |
| 实现柯里化函数                       | [curry](./exercises/curry.js)    | Low    |
