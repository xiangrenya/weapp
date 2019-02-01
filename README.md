## 技术选型

`taro` + `taro-ui` + `react` + `mobx`

## 启动项目

```bash
npm install -g @tarojs/cli
taro init myApp
npm run dev:weapp
```

## Async/await 的异常处理

```javascript
// 示例
function to(promise) {
  return promise
    .then(result => [null, result])
    .catch(err => {
      console.log(err);
      return [err, null];
    });
};
// 用法
function async fun(){
    const [err, data] = await getSomeThing();
    if(err) return console.log('我错了')；
    return data;
}
```

## 云函数

云函数可以理解为简化的"接口", 没有 Request, Response 对象，用来业务逻辑和数据处理，小程序客户端可以通过 `wx.cloud.callFunction()` 调用云函数，实现数据的传输。

下面是一个简单的示例：

```javascript
// functions/add/index.js
const cloud = require('wx-server-sdk');
cloud.init();
const db = cloud.database();
// 云函数入口函数
exports.main = async (event, context) => {
  // 这里获取到的 openId 和 appId 是可信的
  const { OPENID, APPID } = cloud.getWXContext();
  const { a, b } = event
  const sum = a + b;
  return {
    sum,
    OPENID,
    APPID
  }
});
// pages/index/index.js
wx.cloud.callFunction({
  name: 'add',
  data: {
    a: 1,
    b: 2,
  })
  .then(res => console.log(res.result.sum))
  .catch(err => console.log(err));
```

## 注意事项

- 每次修改云函数，都要上传并部署，这一点上，开发体验不够好。
- 云开发不支持本地断点调试，目前只能在代码里 `console.log` 打印出日志来观察，最好所有异常都要做处理。
- parseInt('2,2222') === 2

## 参考资料

- [小程序官方文档](https://developers.weixin.qq.com/miniprogram/dev/index.html)
- [Taro 介绍](https://nervjs.github.io/taro/docs/README.html)
- [taro-ui](https://taro-ui.aotu.io/)
- [Gitter - 高颜值 GitHub 小程序客户端诞生记](https://juejin.im/post/5c4c738ce51d4525211c129b)
- [github-trending-api](https://github.com/huchenme/github-trending-api)
