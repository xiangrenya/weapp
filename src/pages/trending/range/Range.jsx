import Taro, { Component } from '@tarojs/taro';
import PropTypes from 'prop-types';
import { View } from '@tarojs/components';
import { AtIcon } from 'taro-ui';
import { dateRanges, languages } from '../../../utils/dict';
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

  state = {
    dateRange: {
      name: '今日',
      value: 'daily'
    },
    language: {
      name: '所有',
      urlParam: ''
    },
    range: [dateRanges, languages]
  };

  onChange = e => {
    const { range } = this.state;
    const [dateRanges, languages] = range;
    const [dateRangeIndex, languageIndex] = e.detail.value;
    const language = languages[languageIndex];
    const dateRange = dateRanges[dateRangeIndex];
    this.setState({
      language,
      dateRange
    });
    this.props.onChange(language.value, dateRange.value);
  };

  render() {
    const { range, dateRange, language } = this.state;
    return (
      <View>
        <Picker
          mode="multiSelector"
          range={range}
          rangeKey={'name'}
          onChange={this.onChange}
        >
          {/* <View className="filter">
            <Text className="date-range">{dateRange.name}</Text>
            <Text className="language">{language.name}</Text>
          </View> */}
          <View className="filter-wrap">
            <AtIcon prefixClass="fa" value="filter" size="16" color="#999999" />
          </View>
        </Picker>
      </View>
    );
  }
}
