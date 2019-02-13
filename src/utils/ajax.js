import Taro from '@tarojs/taro';

export default function ajax(options) {
  let opts = {
    method: 'GET',
    header: {
      Authorization: Taro.getStorageSync('authorization')
    }
  };
  options.url = 'https://api.github.com' + options.url;
  Object.assign(opts, options);
  return Taro.request(opts).then(res => {
    if (res.statusCode === 401) {
      Taro.navigateTo({
        url: '/pages/login/index'
      });
    } else if (res.statusCode === 403) {
      Taro.showToast({
        title: '调用接口频率超过限制，需要登录后才能继续访问',
        icon: 'none'
      });
    }
    return res;
  });
}
