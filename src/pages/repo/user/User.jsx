import Taro, { Component } from '@tarojs/taro';
import PropTypes from 'prop-types';
import { View } from '@tarojs/components';
import { AtAvatar, AtButton } from 'taro-ui';
import { toThousands } from '../../../utils/index';
import ajax from '../../../utils/ajax';
import './styles.less';

export default class RepoItem extends Component {
  static propTypes = {
    info: PropTypes.object
  };

  static defaultProps = {
    info: null
  };

  state = {
    isOpened: false,
    isBusy: false,
    isFollowed: false
  };

  componentDidMount() {
    if (Taro.getStorageSync('authorization')) {
      this.checkFollowed(this.props.info.login);
    }
  }

  handleFollow = () => {
    this.setState({
      isBusy: true
    });
    const isFollowed = this.state.isFollowed;
    const username = this.props.info.login;
    const method = isFollowed ? 'DELETE' : 'PUT';
    ajax({
      method,
      url: `/user/following/${username}`
    }).then(res => {
      if (res.statusCode === 401) {
        this.setState({
          isOpened: true
        });
      } else if (res.statusCode === 204) {
        this.setState({
          isFollowed: !isFollowed
        });
        Taro.showToast({
          title: isFollowed ? '取消关注' : '关注成功'
        });
      }
      this.setState({
        isBusy: false
      });
    });
  };

  checkFollowed = username => {
    ajax({
      url: `/user/following/${username}`
    }).then(res => {
      if (res.statusCode === 204) {
        this.setState({
          isFollowed: true
        });
      }
    });
  };

  render() {
    if (!this.props.info) {
      return null;
    }
    const { avatar_url, login, followers, following } = this.props.info;
    const { isFollowed, isBusy } = this.state;
    return (
      <View>
        <View className="repo-owner">
          <AtAvatar className="avatar" image={avatar_url} size="normal" />
          <View className="owner-text">
            <View className="owner-name">{login}</View>
            <View className="owner-meta">
              关注 <Text className="num">{toThousands(following)}</Text> 粉丝{' '}
              <Text class="num">{toThousands(followers)}</Text>
            </View>
          </View>
          <AtButton
            className="watch"
            type={isFollowed ? 'secondary' : 'primary'}
            size="small"
            loading={isBusy}
            disabled={isBusy}
            onClick={this.handleFollow}
          >
            {isFollowed ? '已关注' : '关注'}
          </AtButton>
        </View>
      </View>
    );
  }
}
