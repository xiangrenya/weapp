import Taro, { Component } from '@tarojs/taro';
import PropTypes from 'prop-types';
import { View } from '@tarojs/components';
import { AtIcon, AtAvatar } from 'taro-ui';
import './styles.less';

export default class devdev extends Component {
  static propTypes = {
    dev: PropTypes.object
  };

  static defaultProps = {
    dev: null
  };

  render() {
    const { dev } = this.props;
    if (!dev) return null;
    return (
      <View className="content">
        <AtAvatar  size="large" image={dev.avatar} />
        <View className="user-info">
          <View className="user-name">{dev.username}</View>
          <View className="repo">
            <AtIcon prefixClass="fa" value="folder-o" size="12" color="#666" />
            <View className="repo-title">{dev.repo.name}</View>
          </View>
          <View className="repo-desc">{dev.repo.description}</View>
        </View>
      </View>
    );
  }
}
