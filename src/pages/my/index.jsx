import Taro, { Component } from '@tarojs/taro';
import { View, Image, Button, Text } from '@tarojs/components';
import { observer, inject } from '@tarojs/mobx';
import { AtIcon, AtButton } from 'taro-ui';
import './index.less';

@observer
class Index extends Component {
  config = {
    navigationBarTitleText: '我的'
  };

  state = {
    user: {}
  };

  componentWillMount() {}

  componentWillReact() {
    console.log('componentWillReact');
  }

  componentDidMount() {
    const user = Taro.getStorageSync('user');
    if (!user) {
      Taro.navigateTo({
        url: '/pages/login/index'
      });
      return;
    }
    this.setState({
      user
    });
  }

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  render() {
    const { user } = this.state;
    const {
      avatar_url,
      name,
      followers,
      following,
      public_repos,
      public_gists
    } = user;
    return (
      <View className="my-container">
        <View className="my-header">
          <Image className="avatar" mode="aspectFill" src={avatar_url} />
          <View class="my-info">
            <View class="username">{name}</View>
            <View className="meta-wrap">
              <Text className="meta">
                关注 <Text className="num">{following}</Text>
              </Text>
              <Text className="meta">
                粉丝 <Text className="num">{followers}</Text>
              </Text>
            </View>
          </View>
          <Button type="primary" size="mini">
            关注
          </Button>
        </View>
        <View className="my-list">
          <View className="my-item">
            <Text class="title">我的动态</Text>
            <AtIcon
              prefixClass="fa"
              value="angle-right"
              size="14"
              color="#666666"
            />
          </View>
          <View className="my-item">
            <Text class="title">我的项目</Text>
            <AtIcon
              prefixClass="fa"
              value="angle-right"
              size="14"
              color="#666666"
            />
          </View>
          <View className="my-item">
            <Text class="title">我的收藏</Text>
            <AtIcon
              prefixClass="fa"
              value="angle-right"
              size="14"
              color="#666666"
            />
          </View>
          <View className="my-item">
            <Text class="title">代码片段</Text>
            <AtIcon
              prefixClass="fa"
              value="angle-right"
              size="14"
              color="#666666"
            />
          </View>
          <View className="my-item">
            <Text class="title">浏览历史</Text>
            <AtIcon
              prefixClass="fa"
              value="angle-right"
              size="14"
              color="#666666"
            />
          </View>
        </View>
        <View className="my-list">
          <View className="my-item">
            <Text class="title">系统设置</Text>
            <AtIcon
              prefixClass="fa"
              value="angle-right"
              size="14"
              color="#666666"
            />
          </View>
        </View>
      </View>
    );
  }
}

export default Index;
