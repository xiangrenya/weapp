import Taro, { Component } from '@tarojs/taro';
import { Form, Input, Button, View, Text } from '@tarojs/components';
import { observer, inject } from '@tarojs/mobx';
import { AtIcon, AtButton } from 'taro-ui';
import base64 from '../../utils/base64';
import './index.less';

@observer
class Index extends Component {
  config = {
    navigationBarTitleText: '用户登录'
  };

  state = {
    isBusy: false
  };

  onSubmit = e => {
    const formData = e.detail.value;
    console.log('formData: ', formData);
    const { username, password } = formData;

    // 验证表单是否填写完整
    if (!username.trim()) {
      Taro.showToast({
        title: '请输入用户名',
        icon: 'none'
      });
      return;
    }
    if (!password.trim()) {
      Taro.showToast({
        title: '请输入密码',
        icon: 'none'
      });
      return;
    }

    this.setState({
      isBusy: true
    });

    // 本地存储 authorization
    const authorization = 'Basic ' + base64.encode(`${username}:${password}`);
    console.log('authorization: ', authorization);
    Taro.setStorageSync('authorization', authorization);

    // 验证用户名和密码是否正确
    Taro.request({
      url: 'https://api.github.com/user',
      header: {
        Authorization: authorization
      }
    }).then(res => {
      console.log(res);
      if (res.statusCode === 401) {
        Taro.showToast({
          title: '用户名或密码错误',
          icon: 'none'
        });
      } else {
        Taro.setStorageSync('user', res.data);
        Taro.switchTab({
          url: '/pages/my/index'
        });
      }
      this.setState({
        isBusy: false
      });
    });
  };

  render() {
    const { isBusy } = this.state;
    return (
      <View className="login-container">
        <AtIcon prefixClass="fa" value="github" size="60" />
        <Form onSubmit={this.onSubmit} className="login-form">
          <Input name="username" placeholder="用户名" autoFocus={true} />
          <Input name="password" type="password" placeholder="密码" />
          <Button
            form-type="submit"
            type="primary"
            disabled={isBusy}
            loading={isBusy}
          >
            登录
          </Button>
        </Form>
      </View>
    );
  }
}

export default Index;
