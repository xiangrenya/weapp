import Taro, { Component } from '@tarojs/taro';
import PropTypes from 'prop-types';
import { View } from '@tarojs/components';
import { AtIcon } from 'taro-ui';
import { toThousands } from '../../utils/index';
import './repo.less';

export default class RepoItem extends Component {
  static propTypes = {
    repo: PropTypes.object,
    since: PropTypes.string
  };

  static defaultProps = {
    repo: null,
    since: 'daily'
  };

  render() {
    const { repo, since } = this.props;
    if (!repo) return null;
    const mapSince = {
      daily: 'today',
      weekly: 'this week',
      monthly: 'this month'
    };
    return (
      <View className="content">
        <View className="repo-title">{repo.title}</View>
        <View className="repo-desc">{repo.description}</View>
        <View className="number-info">
          {repo.lang.length > 0 && (
            <View className="number-item">
              <AtIcon
                prefixClass="fa"
                value="circle"
                size="14"
                color={repo.langColor}
              />
              <View className="number-title">{repo.lang}</View>
            </View>
          )}
          <View className="number-item">
            <AtIcon prefixClass="fa" value="star" size="14" color="#666666" />
            <View className="number-title">{toThousands(repo.stars)}</View>
          </View>
          <View className="number-item">
            <AtIcon
              prefixClass="fa"
              value="share-alt"
              size="14"
              color="#666666"
            />
            <View className="number-title">{toThousands(repo.forks)}</View>
          </View>
        </View>
        <View className="today-view">
          <AtIcon prefixClass="fa" value="star" size="14" color="#66666" />
          <View className="today-title">
            {toThousands(repo.currentPeriodStars) + ` ${mapSince[since]}`}
          </View>
        </View>
      </View>
    );
  }
}
