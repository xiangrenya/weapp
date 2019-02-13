import Taro, { Component } from '@tarojs/taro';
import { View, Image, Button, Text } from '@tarojs/components';
import { AtIcon, AtAvatar, AtButton } from 'taro-ui';
import Markdown from '../../components/markdown/Markdown';
import Action from './action/Action';
import base64 from '../../utils/base64';
import ajax from '../../utils/ajax';
import User from './user/User';
import './index.less';

class Index extends Component {
  config = {
    navigationBarTitleText: '项目详情'
  };

  state = {
    isOpend: false,
    repo: null,
    owner: {
      avatar_url: '',
      login: '',
      followers: 0,
      following: 0
    },
    baseUrl: '',
    md: ''
  };

  componentDidMount() {
    Taro.showLoading({
      title: '正在加载中'
    });
    const { owner, repo } = this.$router.params;

    this.getUser(owner);
    this.getRepo(owner, repo);
    this.getReadme(owner, repo);

    this.setState({
      baseUrl: `https://raw.githubusercontent.com/${owner}/${repo}/master/`
    });
  }

  onShareAppMessage(options) {
    const { owner, repo } = this.state;
    let path = `/pages/repo/index?owner=${owner}&repo=${repo}`;
    return {
      title: repo.name + (repo.description ? ` - ${repo.description}` : ''),
      path
    };
  }

  getUser = owner => {
    ajax({
      url: `/users/${owner}`
    }).then(res => {
      this.setState({
        owner: res.data
      });
    });
  };

  getRepo = (owner, repo) => {
    ajax({
      url: `/repos/${owner}/${repo}`
    }).then(res => {
      console.log('repo: ', res.data);
      this.setState({
        repo: res.data
      });
      Taro.hideLoading();
    });
  };

  getReadme = (owner, repo) => {
    ajax({
      url: `/repos/${owner}/${repo}/readme`
    }).then(res => {
      console.log('readme: ', res.data);
      this.setState({
        md: base64.decode(res.data.content)
      });
    });
  };

  render() {
    const { repo, owner, baseUrl, md, isOpened } = this.state;
    if (!repo) return null;
    return (
      <View className="repo-container">
        <User info={owner} />

        <View className="repo-header">
          <View className="repo-title">{repo.name}</View>
          <View className="repo-desc">{repo.description}</View>
        </View>

        <View className="repo-list">
          <View className="repo-item">
            <Text class="title">源码</Text>
            <AtIcon
              prefixClass="fa"
              value="angle-right"
              size="14"
              color="#666666"
            />
          </View>
          <View className="repo-item">
            <Text class="title">问题</Text>
            <AtIcon
              prefixClass="fa"
              value="angle-right"
              size="14"
              color="#666666"
            />
          </View>
          <View className="repo-item">
            <Text class="title">贡献者</Text>
            <AtIcon
              prefixClass="fa"
              value="angle-right"
              size="14"
              color="#666666"
            />
          </View>
        </View>

        <View className="markdown">
          <View className="md-title">README.md</View>
          <View className="repo-md">
            {md && <Markdown md={md} base={baseUrl} />}
          </View>
        </View>

        <Action repo={repo} />
      </View>
    );
  }
}

export default Index;
