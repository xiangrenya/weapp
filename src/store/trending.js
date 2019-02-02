import Taro from '@tarojs/taro';
import { observable, action, computed } from 'mobx';
import { to } from '../utils/index';
// support es7 async/await
const regeneratorRuntime = require('../utils/runtime');

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
  initData = async () => {
    Taro.showLoading({ title: 'loading...' });

    const [err, res] = await to(
      wx.cloud.callFunction({
        name: 'getTrending',
        data: {
          type: this.type,
          language: this.language,
          since: this.since
        }
      })
    );

    Taro.hideLoading();
    Taro.stopPullDownRefresh();

    if (err) return console.log('错误：调用 getTrending 云函数失败', err);

    if (this.type === 'repositories') {
      this.repositories = res.result;
    } else {
      this.developers = res.result;
    }
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
