import Taro from '@tarojs/taro';

export function toThousands(num) {
  if (typeof num === 'number') {
    num = num.toString();
  }
  let result = '';
  while (num.length > 3) {
    result = ',' + num.slice(-3) + result;
    num = num.slice(0, num.length - 3);
  }
  if (num) {
    result = num + result;
  }
  return result;
}

export function to(promise) {
  return promise
    .then(result => [null, result])
    .catch(err => {
      console.log(err);
      return [err, null];
    });
}

export function hasLogin() {
  return !!Taro.getStorageSync('authorization');
}
