import Taro from '@tarojs/taro';
import { observable, action } from 'mobx';

class Trending {
  @observable current = 0;
  @observable repositories = [];
  @observable lang = 'javascript';
  @observable since = 'daily'; // 'daily, weekly, monthly'

  @action
  init = () => {
    Taro.showLoading({ title: 'loading...' });
    wx.cloud
      .callFunction({
        name: 'getTrending',
        data: {
          type: 'repositories',
          language: this.lang,
          since: this.since
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
        console.log(err);
      });
  };

  @action
  handleSearch = () => {
    console.log('searching');
  };

  @action
  handleSwitchTab = val => {
    this.current = val;
  };
}

export default new Trending();
