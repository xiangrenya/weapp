import Taro, { Component } from '@tarojs/taro';
import { View, Button, Text } from '@tarojs/components';
import { observer, inject } from '@tarojs/mobx';
import { AtTabs, AtTabsPane, AtSearchBar } from 'taro-ui';
import TrendingList from './trending_list/TrendingList';
import Range from './range/Range';
import './index.less';

@inject('trendingStore')
@observer
class Index extends Component {
  config = {
    navigationBarTitleText: '排行',
    enablePullDownRefresh: true
  };

  componentDidMount() {
    this.props.trendingStore.initData('daily', 'all');
    Taro.navigateTo({
      url: '/pages/repo/index?owner=pomber&repo=git-history'
    });
  }

  onPullDownRefresh() {
    this.props.trendingStore.initData();
  }

  handlePickerChange = (language, since) => {
    this.props.trendingStore.refresh(language, since);
  };

  handleSwitchTab = value => {
    this.props.trendingStore.handleSwitchTab(value);
  };

  handleSearch = () => {
    Taro.navigateTo({
      url: '/pages/search/index'
    });
  };

  render() {
    const {
      trendingStore: { current, since, repositories, developers }
    } = this.props;
    return (
      <View className="index">
        <View className="trending-top">
          <View className="filter">
            <Range onChange={this.handlePickerChange} />
          </View>
          <View className="search-wrap">
            <AtSearchBar
              disabled={true}
              placeholder="Search"
              onClick={this.handleSearch}
            />
          </View>
        </View>
        <AtTabs
          swipeable={false}
          animated={true}
          current={current}
          tabList={[{ title: '项目' }, { title: '开发者' }]}
          onClick={this.handleSwitchTab}
        >
          <AtTabsPane current={current} index={0}>
            <TrendingList type={0} list={repositories.toJS()} since={since} />
          </AtTabsPane>
          <AtTabsPane current={current} index={1}>
            <TrendingList type={1} list={developers.toJS()} since={since} />
          </AtTabsPane>
        </AtTabs>
      </View>
    );
  }
}

export default Index;
