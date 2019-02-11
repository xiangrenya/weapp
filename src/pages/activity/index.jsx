import Taro, { Component } from '@tarojs/taro';
import { View, Button, Text } from '@tarojs/components';
import { observer, inject } from '@tarojs/mobx';
import { AtIcon, AtButton } from 'taro-ui';
import './index.less';

@observer
class Index extends Component {
  config = {
    navigationBarTitleText: '动态',
    enablePullDownRefresh: true
  };

  componentWillMount() {}

  componentWillReact() {
    console.log('componentWillReact');
  }

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  render() {
    return (
      <View className="login-wrap">
        正在努力开发中。。。
      </View>
    );
  }
}

export default Index;
