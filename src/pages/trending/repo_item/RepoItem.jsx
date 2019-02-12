import Taro, { Component } from '@tarojs/taro';
import PropTypes from 'prop-types';
import { View, Navigator } from '@tarojs/components';
import { AtIcon } from 'taro-ui';
import { toThousands } from '../../../utils/index';
import './styles.less';

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
      daily: '今日',
      weekly: '本周',
      monthly: '本月'
    };
    const [author, repoName] = repo.title.split(' / ');
    const url = `/pages/repo/index?owner=${author}&repo=${repoName}`;
    return (
      <Navigator open-type="navigate" hover-class="none" url={url}>
      <View className="content">
        <View className="repo-title">
          {repoName}
          <View className="today-view">
            <View className="today-title">
              {mapSince[since] + ' ' + toThousands(repo.currentPeriodStars) + ' 个收藏'}
            </View>
          </View>
        </View>
        <View className="repo-desc">{repo.description}</View>
        <View className="number-info">
          {repo.lang.length > 0 && (
            <View className="number-item">
              <AtIcon
                prefixClass="fa"
                value="circle"
                size="12"
                color={repo.langColor}
              />
              <View className="number-title">{repo.lang}</View>
            </View>
          )}
          <View className="number-item">
            <AtIcon prefixClass="fa" value="star" size="12" color="#666666" />
            <View className="number-title">{toThousands(repo.stars)}</View>
          </View>
          <View className="number-item">
            <AtIcon
              prefixClass="fa"
              value="code-fork"
              size="14"
              color="#666666"
            />
            <View className="number-title">{toThousands(repo.forks)}</View>
          </View>
          <View className="number-item">
            <AtIcon prefixClass="fa" value="male" size="12" color="#666666" />
            <View className="number-title">{author}</View>
          </View>
        </View>
      </View>
      </Navigator>
    );
  }
}
