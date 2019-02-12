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
    isStarred: false
  };

  componentDidMount() {
    this.checkStarred();
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

  handleClick = type => {
    const { repo } = this.props;
    if (type === 'watch') {
    } else if (type === 'star') {
      const { isStarred } = this.state;
      const method = isStarred ? 'DELETE' : 'PUT';
      ajax({
        method,
        url: `/user/starred/${repo.owner.login}/${repo.name}`
      }).then(res => {
        if (res.statusCode === 204) {
          this.setState({
            isStarred: !this.state.isStarred
          });
        }
        Taro.atMessage({
          message: isStarred ? '取消收藏成功' : '收藏成功',
          type: 'success'
        });
      });
    }
  };

  render() {
    if (!this.props.repo) {
      return null;
    }
    const { watchers_count, stargazers_count, forks_count } = this.props.repo;
    const { isStarred } = this.state;
    const iconStar = isStarred ? 'star' : 'star-o';
    return (
      <View className="action-container">
        <View className="action-item" onClick={() => this.handleClick('watch')}>
          <AtIcon prefixClass="fa" value="eye" size="14" color="#999999" />
          <Text className="number">关注 {toThousands(watchers_count)}</Text>
        </View>
        <View className="action-item" onClick={() => this.handleClick('star')}>
          <AtIcon prefixClass="fa" value={iconStar} size="14" color="#999999" />
          <Text className="number">收藏 {toThousands(stargazers_count)}</Text>
        </View>
        <View className="action-item" onClick={() => this.handleClick('folk')}>
          <AtIcon
            prefixClass="fa"
            value="code-fork"
            size="14"
            color="#999999"
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
