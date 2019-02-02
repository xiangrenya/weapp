import Taro, { Component } from '@tarojs/taro';
import PropTypes from 'prop-types';
import { View } from '@tarojs/components';
import RepoItem from './RepoItem';

export default class IndexList extends Component {
  static propTypes = {
    type: PropTypes.number,
    list: PropTypes.array,
    since: PropTypes.string
  };

  static defaultProps = {
    type: 0,
    since: 'daily',
    list: []
  };

  render() {
    const { type, list, since } = this.props;
    const RepoList = (
      <View>
        {list.map((item, index) => {
          return (
            <View key={index}>
              <RepoItem repo={item} since={since} />
            </View>
          );
        })}
      </View>
    );
    const DeveloperList = <View>正在努力开发中。。。</View>;
    return type ? DeveloperList : RepoList;
  }
}
