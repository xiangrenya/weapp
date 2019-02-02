import Taro, { Component } from '@tarojs/taro';
import { Provider } from '@tarojs/mobx';
import Index from './pages/index';

import trendingStore from './store/trending';

import './app.less';
import './assets/css/font-awesome.min.css';

// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5')  {
//   require('nerv-devtools')
// }

const store = {
  trendingStore
};

class App extends Component {
  config = {
    pages: ['pages/trending/index', 'pages/activity/index', 'pages/me/index'],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: 'WeChat',
      navigationBarTextStyle: 'black'
    },
    tabBar: {
      list: [
        {
          pagePath: 'pages/trending/index',
          text: 'Trending',
          iconPath: './assets/images/tab_trending.png',
          selectedIconPath: './assets/images/tab_trending_selected.png'
        },
        {
          pagePath: 'pages/activity/index',
          text: 'Activity',
          iconPath: './assets/images/tab_activity.png',
          selectedIconPath: './assets/images/tab_activity_selected.png'
        },
        {
          pagePath: 'pages/me/index',
          text: 'Me',
          iconPath: './assets/images/tab_me.png',
          selectedIconPath: './assets/images/tab_me_selected.png'
        }
      ],
      color: '#8a8a8a',
      selectedColor: '#2d8cf0',
      backgroundColor: '#ffffff',
      borderStyle: 'white'
    }
  };

  componentDidMount() {}

  componentDidShow() {}

  componentDidHide() {}

  componentDidCatchError() {}

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render() {
    return (
      <Provider store={store}>
        <Index />
      </Provider>
    );
  }
}

Taro.render(<App />, document.getElementById('app'));
