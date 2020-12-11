# todo 本地备忘录

> WARNNING: 鉴于目前 jq 的使用量不多同时编写 todos 的版本已经过于久远，目前已经没有什么参考价值了，故不再维护。

JQuery + store 实现本地存储.

## 原理实现

主要原理就是通过事件监听器给表单`.add-task`监控`submit`事件, 如果有表单提交, 检测是否有值, 有值就存入store中.`renderItem`渲染dom, `renderTask`负责渲染data模块和插入模板.
