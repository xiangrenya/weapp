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
  return Taro.request(opts);
}
