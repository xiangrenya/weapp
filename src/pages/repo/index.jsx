import Taro, { Component } from '@tarojs/taro';
import { View, Image, Button, Text } from '@tarojs/components';
import { AtIcon, AtAvatar, AtButton } from 'taro-ui';
import Markdown from '../../components/markdown/Markdown';
import Action from './action/Action';
import base64 from '../../utils/base64';
import './index.less';

class Index extends Component {
  config = {
    navigationBarTitleText: '项目详情'
  };

  state = {
    repo: null,
    baseUrl: '',
    md: ''
  };

  componentDidMount() {
    Taro.showLoading({
      title: '正在加载中'
    });
    const { owner, repo } = this.$router.params;

    this.getRepo(owner, repo);
    this.getReadme(owner, repo);

    this.setState({
      baseUrl: `https://raw.githubusercontent.com/${owner}/${repo}/master/`
    });
  }

  getRepo = (owner, repo) => {
    Taro.request({
      url: `https://api.github.com/repos/${owner}/${repo}`,
      header: {
        Authorization: Taro.getStorageSync('authorization')
      }
    }).then(res => {
      console.log('repo: ', res.data);
      this.setState({
        repo: res.data
      });
      Taro.hideLoading();
    });
  };

  getReadme = (owner, repo) => {
    Taro.request({
      url: `https://api.github.com/repos/${owner}/${repo}/readme`,
      header: {
        Authorization: Taro.getStorageSync('authorization')
      }
    }).then(res => {
      console.log('readme: ', res.data);
      this.setState({
        md: base64.decode(res.data.content)
      });
    });
  };

  render() {
    const { repo, baseUrl, md } = this.state;
    if (!repo) return null;
    const { avatar_url, login } = repo.owner;
    return (
      <View className="repo-container">
        <View className="repo-owner">
          <AtAvatar className="avatar" image={avatar_url} size="normal" />
          <Text className="owner-name">{login}</Text>
          <AtButton className="watch" type="primary" size="small">
            + 关注
          </AtButton>
        </View>

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
