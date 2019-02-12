import Taro, { Component } from '@tarojs/taro';
import PropTypes from 'prop-types';
import { View, Text } from '@tarojs/components';
import { AtActivityIndicator } from 'taro-ui';

import Towxml from '../towxml/main';
import './styles.less';

const towxml = new Towxml();

export default class Markdown extends Component {
  static propTypes = {
    md: PropTypes.string,
    base: PropTypes.string
  };

  static defaultProps = {
    md: null,
    base: null
  };

  constructor(props) {
    super(props);
    this.state = {
      data: null
    };
  }

  componentDidMount() {
    this.parseReadme();
  }

  parseReadme = () => {
    const { md, base } = this.props;
    wx.cloud
      .callFunction({
        name: 'parse',
        data: {
          content: md
        }
      })
      .then(res => {
        let data = res.result;
        data = towxml.initData(data, { base: base, app: this.$scope });
        this.setState({
          fail: false,
          data
        });
      });
  };

  onTap(e) {
    if (e.currentTarget.dataset._el.tag === 'image') {
      Taro.previewImage({
        urls: [e.currentTarget.dataset._el.attr.src]
      });
    }
  }

  render() {
    const { data } = this.state;
    return (
      <View>
        {data ? (
          <View>
            <import src="../towxml/entry.wxml" />
            <template is="entry" data="{{...data}}" />
          </View>
        ) : (
          <View className="loading">
            <AtActivityIndicator
              size={20}
              color="#2d8cf0"
              content="loading..."
            />
          </View>
        )}
      </View>
    );
  }
}
