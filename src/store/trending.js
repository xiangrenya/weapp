import Taro from '@tarojs/taro';
import { observable, action, computed } from 'mobx';

class Trending {
  @observable type = 'repositories';
  @observable language = 'all';
  @observable since = 'daily';
  @observable repositories = [];
  @observable developers = [];

  @computed get current() {
    return this.type === 'repositories' ? 0 : 1;
  }

  @action
  initData = () => {
    Taro.showLoading({ title: 'loading...' });
    wx.cloud
      .callFunction({
        name: 'getTrending',
        data: {
          type: this.type,
          language: this.language,
          since: this.since
        }
      })
      .then(
        action(res => {
          if (this.type === 'repositories') {
            this.repositories = res.result;
          } else {
            this.developers = res.result;
          }
          Taro.hideLoading();
        })
      )
      .catch(err => {
        Taro.hideLoading();
        console.log('错误：调用 getTrending 云函数失败', err);
      });
  };

  @action refresh(language, since) {
    this.language = language;
    this.since = since;
    this.initData();
  }

  @action
  handleSwitchTab = val => {
    this.type = val ? 'developers' : 'repositories';
    this.initData();
  };
}

export default new Trending();
