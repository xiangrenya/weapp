import Taro, { Component } from '@tarojs/taro';
import { View, Image, Button, Text } from '@tarojs/components';
import { observer, inject } from '@tarojs/mobx';
import { AtIcon, AtButton, AtModal } from 'taro-ui';
import './index.less';

@observer
class Index extends Component {
  config = {
    navigationBarTitleText: '我的'
  };

  state = {
    user: null,
    isLoggedIn: false
  };

  componentDidMount() {
    if (Taro.getStorageSync('authorization')) {
      this.setState({
        isLoggedIn: true,
        user: Taro.getStorageSync('user')
      });
    }
  }

  componentDidShow() {
    if (!this.state.isLoggedIn && Taro.getStorageSync('authorization')) {
      this.setState({
        isLoggedIn: true,
        user: Taro.getStorageSync('user')
      });
    }
  }

  refresh = () => {
    this.setState({
      isLoggedIn: !!Taro.getStorageSync('authorization'),
      user: Taro.getStorageSync('user')
    });
  };

  handleExit = () => {
    Taro.clearStorage({
      success: () => {
        this.refresh();
      }
    });
  };

  handleConfirm = () => {
    Taro.navigateTo({
      url: '/pages/login/index'
    });
  };

  render() {
    const { user, isLoggedIn } = this.state;
    if (!isLoggedIn)
      return (
        <View className="modal-wrap">
          <AtModal
            isOpened
            confirmText="确认"
            onConfirm={this.handleConfirm}
            content="请您先登录，才能看到个人信息"
          />
        </View>
      );
    if (!user) return null;
    const { avatar_url, name, followers, following } = user;
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
          <AtButton type="primary" size="small">
            关注
          </AtButton>
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
          <View className="my-item" onClick={this.handleExit}>
            <Text class="title">退出登录</Text>
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
