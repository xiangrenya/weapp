import Taro, { Component } from '@tarojs/taro';
import PropTypes from 'prop-types';
import { View } from '@tarojs/components';
import { AtIcon } from 'taro-ui';
import { toThousands } from '../../../utils/index';
import './styles.less';

export default class RepoItem extends Component {
  static propTypes = {
    repo: PropTypes.object
  };

  static defaultProps = {
    repo: null
  };

  state = {};

  render() {
    if (!this.props.repo) {
      return null;
    }
    const { watchers_count, stargazers_count, forks_count } = this.props.repo;
    return (
      <View className="action-container">
        <View className="action-item">
          <AtIcon prefixClass="fa" value="eye" size="14" color="#999999" />
          <Text className="number">关注 {toThousands(watchers_count)}</Text>
        </View>
        <View className="action-item">
          <AtIcon prefixClass="fa" value="star-o" size="14" color="#999999" />
          <Text className="number">收藏 {toThousands(stargazers_count)}</Text>
        </View>
        <View className="action-item">
          <AtIcon prefixClass="fa" value="code-fork" size="14" color="#999999" />
          <Text className="number">复制 {toThousands(forks_count)}</Text>
        </View>
        <View className="action-item">
          <AtIcon prefixClass="fa" value="share-alt" size="14" color="#999999" />
          <Text className="number">分享</Text>
        </View>
      </View>
    );
  }
}
