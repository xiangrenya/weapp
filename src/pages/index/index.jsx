import Taro, { Component } from '@tarojs/taro';
import { View, Button, Text } from '@tarojs/components';
import { observer, inject } from '@tarojs/mobx';
import { AtTabs, AtTabsPane } from 'taro-ui';
import IndexList from './index_list/IndexList';
import Range from './range/Range';
import './index.less';

@inject('trendingStore')
@observer
class Index extends Component {
  config = {
    navigationBarTitleText: 'Trending',
    enablePullDownRefresh: true
  };

  componentWillMount() {}

  componentWillReact() {
    console.log('componentWillReact');
  }

  componentDidMount() {
    wx.cloud.init();
    this.props.trendingStore.initData('daily', 'all');
  }

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  handlePickerChange = (since, language) => {
    this.props.trendingStore.initData(since, language);
  };

  render() {
    const {
      trendingStore: {
        current,
        since,
        repositories,
        handleSwitchTab
      }
    } = this.props;
    return (
      <View className="index">
        <AtTabs
          swipeable={false}
          animated={true}
          current={current}
          tabList={[{ title: 'Repositories' }, { title: 'Developers' }]}
          onClick={handleSwitchTab}
        >
          <AtTabsPane current={current} index={0}>
            <IndexList type={0} list={repositories.toJS()} since={since} />
          </AtTabsPane>
          <AtTabsPane current={current} index={1}>
            {<IndexList type={1} list={[]} since={since} />}
          </AtTabsPane>
        </AtTabs>
        <Range onChange={this.handlePickerChange} />
      </View>
    );
  }
}

export default Index;
