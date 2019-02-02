import Taro, { Component } from '@tarojs/taro';
import PropTypes from 'prop-types';
import { View } from '@tarojs/components';
import RepoItem from '../repo_item/RepoItem';
import DevItem from '../dev_item/DevItem';

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
    const DevList = (
      <View>
        {list.map((item, index) => {
          return (
            <View key={index}>
              <DevItem dev={item} />
            </View>
          );
        })}
      </View>
    );
    return <View>{type ? DevList : RepoList}</View>;
  }
}
