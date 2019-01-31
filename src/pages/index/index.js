import Taro, { Component } from '@tarojs/taro';
import { View, Button, Text } from '@tarojs/components';
import { observer, inject } from '@tarojs/mobx';
import { AtTabs, AtTabsPane, AtSearchBar } from 'taro-ui';
import IndexList from '../../components/index/IndexList';
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
    this.props.trendingStore.init();
  }

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  render() {
    const {
      trendingStore: { current, since, repositories, handleSearch, handleSwitchTab }
    } = this.props;
    return (
      <View className="index">
        {/* <View className="search_bg" onClick={handleSearch}>
          <AtSearchBar disabled={true} placeholder="Search" actionName="" />
        </View> */}
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
      </View>
    );
  }
}

export default Index;
