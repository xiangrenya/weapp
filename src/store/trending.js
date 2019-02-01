import Taro from '@tarojs/taro';
import { observable, action } from 'mobx';

class Trending {
  @observable current = 0;
  @observable repositories = [];
  @observable since = 'daily';
  @action
  initData = (since, language) => {
    this.since = since;
    Taro.showLoading({ title: 'loading...' });
    wx.cloud
      .callFunction({
        name: 'getTrending',
        data: {
          type: 'repositories',
          language: language,
          since: since
        }
      })
      .then(
        action(res => {
          this.repositories = res.result;
          Taro.hideLoading();
        })
      )
      .catch(err => {
        Taro.hideLoading();
        console.log('错误：调用 getTrending 云函数失败', err);
      });
  };

  @action
  handleSwitchTab = val => {
    this.current = val;
  };
}

export default new Trending();
