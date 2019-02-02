import Taro, { Component } from '@tarojs/taro';
import { View, Button, Text } from '@tarojs/components';
import { observer, inject } from '@tarojs/mobx';
import { AtTabs, AtTabsPane } from 'taro-ui';
import TrendingList from './trending_list/TrendingList';
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

  handlePickerChange = (language, since) => {
    this.props.trendingStore.refresh(language, since);
  };

  handleSwitchTab = value => {
    this.props.trendingStore.handleSwitchTab(value);
  };

  render() {
    const {
      trendingStore: { current, since, repositories, developers }
    } = this.props;
    return (
      <View className="index">
        <AtTabs
          swipeable={false}
          animated={true}
          current={current}
          tabList={[{ title: 'Repositories' }, { title: 'Developers' }]}
          onClick={this.handleSwitchTab}
        >
          <AtTabsPane current={current} index={0}>
            <TrendingList type={0} list={repositories.toJS()} since={since} />
          </AtTabsPane>
          <AtTabsPane current={current} index={1}>
            <TrendingList type={1} list={developers.toJS()} since={since} />
          </AtTabsPane>
        </AtTabs>
        <Range onChange={this.handlePickerChange} />
      </View>
    );
  }
}

export default Index;
