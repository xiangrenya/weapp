## 技术选型

`taro` + `taro-ui` + `react` + `mobx`

## 启动项目

``` bash
npm install -g @tarojs/cli
taro init myApp
npm run dev:weapp
```

## 注意事项

- 每次修改云函数，都要上传并部署，很麻烦。
- 云开发不支持本地断点调试，目前只能在代码里 `console.log` 打印出日志来观察。
- parseInt('2,2222') === 2

## 参考资料

- [小程序官方文档](https://developers.weixin.qq.com/miniprogram/dev/index.html)
- [Taro 介绍](https://nervjs.github.io/taro/docs/README.html)
- [taro-ui](https://taro-ui.aotu.io/)
- [Gitter - 高颜值GitHub小程序客户端诞生记](https://juejin.im/post/5c4c738ce51d4525211c129b)
- [github-trending-api](https://github.com/huchenme/github-trending-api)