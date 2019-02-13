import Taro, { Component } from '@tarojs/taro';
import PropTypes from 'prop-types';
import { View } from '@tarojs/components';
import { AtIcon } from 'taro-ui';
import { toThousands } from '../../../utils/index';
import ajax from '../../../utils/ajax';
import './styles.less';

export default class RepoItem extends Component {
  static propTypes = {
    repo: PropTypes.object
  };

  static defaultProps = {
    repo: null
  };

  state = {
    isStarred: false,
    isWatched: false,
    isForked: false
  };

  componentDidMount() {
    if (Taro.getStorageSync('user')) {
      this.checkStarred();
      this.checkWatched();
      this.checkForked();
    }
  }

  checkStarred = () => {
    const { repo } = this.props;
    ajax({
      method: 'get',
      url: `/user/starred/${repo.owner.login}/${repo.name}`
    }).then(res => {
      if (res.statusCode === 204) {
        this.setState({
          isStarred: true
        });
      }
    });
  };

  checkWatched = () => {
    const { repo } = this.props;
    ajax({
      method: 'get',
      url: `/user/subscriptions/${repo.owner.login}/${repo.name}`
    }).then(res => {
      if (res.statusCode === 204) {
        this.setState({
          isWatched: true
        });
      }
    });
  };

  checkForked = () => {
    const { owner, name } = this.props.repo;
    ajax({
      method: 'get',
      url: `/repos/${owner.login}/${name}/forks`
    }).then(res => {
      if (res.statusCode === 200) {
        const curUser = Taro.getStorageSync('user');
        if (res.data.some(item => item.owner.login === curUser.login)) {
          this.setState({
            isForked: true
          });
        }
      }
    });
  };

  handleClick = type => {
    const { repo } = this.props;
    const ownerName = repo.owner.login;
    const repoName = repo.name;
    switch (type) {
      case 'watch':
        this.watch(ownerName, repoName);
        break;
      case 'star':
        this.star(ownerName, repoName);
        break;
      case 'folk':
        this.folk(ownerName, repoName);
        break;
      default:
        break;
    }
  };

  watch = (owner, repo) => {
    const { isWatched } = this.state;
    const method = isWatched ? 'DELETE' : 'PUT';
    ajax({
      method,
      url: `/user/subscriptions/${owner}/${repo}`
    }).then(res => {
      if (res.statusCode === 204) {
        this.setState({
          isWatched: !this.state.isWatched
        });
        Taro.showToast({
          title: isWatched ? '取消关注' : '关注成功'
        });
      }
    });
  };

  star = (owner, repo) => {
    const { isStarred } = this.state;
    const method = isStarred ? 'DELETE' : 'PUT';
    ajax({
      method,
      url: `/user/starred/${owner}/${repo}`
    }).then(res => {
      if (res.statusCode === 204) {
        this.setState({
          isStarred: !this.state.isStarred
        });
        Taro.showToast({
          title: isStarred ? '取消收藏' : '收藏成功'
        });
      }
    });
  };

  folk = (owner, repo) => {
    const isForked = this.state.isForked;
    if (isForked) {
      Taro.showToast({
        title: '您之前复制过，请不要重复复制',
        icon: 'none'
      });
      return;
    }
    ajax({
      method: 'POST',
      url: `/repos/${owner}/${repo}/forks`
    }).then(res => {
      if (res.statusCode === 202) {
        this.setState({
          isForked: true
        });
        Taro.showToast({
          title: '复制成功'
        });
      }
    });
  };

  render() {
    if (!this.props.repo) {
      return null;
    }
    const { watchers_count, stargazers_count, forks_count } = this.props.repo;
    const { isStarred, isWatched, isForked } = this.state;
    const iconStar = isStarred ? 'star' : 'star-o';
    return (
      <View className="action-container">
        <View className="action-item" onClick={() => this.handleClick('watch')}>
          <AtIcon
            prefixClass="fa"
            value="eye"
            size="14"
            color={isWatched ? '#5c89e4' : '#999'}
          />
          <Text className="number">关注 {toThousands(watchers_count)}</Text>
        </View>
        <View className="action-item" onClick={() => this.handleClick('star')}>
          <AtIcon
            prefixClass="fa"
            value={iconStar}
            size="14"
            color={isStarred ? '#5c89e4' : '#999'}
          />
          <Text className="number">收藏 {toThousands(stargazers_count)}</Text>
        </View>
        <View className="action-item" onClick={() => this.handleClick('folk')}>
          <AtIcon
            prefixClass="fa"
            value="code-fork"
            size="14"
            color={isForked ? '#5c89e4' : '#999'}
          />
          <Text className="number">复制 {toThousands(forks_count)}</Text>
        </View>
        <View className="action-item">
          <Button type="primary" className="share" openType="share">
            <AtIcon
              prefixClass="fa"
              value="share-alt"
              size="14"
              color="#999999"
            />
            <Text className="number">分享</Text>
          </Button>
        </View>
      </View>
    );
  }
}
