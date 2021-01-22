import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Image,
  FlatList,
  ScrollView,
} from 'react-native';

import EvilIcons from 'react-native-vector-icons/EvilIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import VideoPlayer from 'react-native-video-player';
import Constants, {StatusBarHeight, isIOS} from '../../../../utils/Constants';
import {ModelItemView} from '../../browse/index';
import {ModelPhotoItem} from './ModelProfilePage';
import PropTypes from 'prop-types';

import {
  OutlineButton,
  FillButton,
  PickerButton,
  CheckBox,
  ToggleButton,
} from '../../../../components/Buttons';
import SegViews from '../../../../components/SegView';

import VideoPlayerModal from '../../../../components/VideoPlayerModal';

import {uploadsHostUrl} from '../../../../utils/RestAPI';

import ProfileView from './ProfileView'
import ReviewsView from './ReviewsView'

class ModelDetailView extends React.Component {
  constructor(props) {
    super(props);

    const {model} = props;
    console.log('props.model', model);
    let images =
      model && model.user.images
        ? model.user.images.map((item, index) => {
            return {id: item.id, src: {uri: uploadsHostUrl + item.image}};
          })
        : null;

    this.state = {
      isKeyboardShowing: false,
      video: model?.user?.videos
        ? uploadsHostUrl + model.user.videos[0].short_video
        : null,
      photoList: images,
      pageIndex: 1,
      segIndex: 0,
    };
  }

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidUpdate(prevProps) {}

  calcPageIndex = (event) => {
    let totalW = event.nativeEvent.contentSize.width;
    let pageW = event.nativeEvent.layoutMeasurement.width;
    let offsetX = event.nativeEvent.contentOffset.x;
    let pages = Math.ceil(offsetX / pageW) + 1;
    this.setState({pageIndex: pages});
    return pages;
  };

  onGoBack = () => {
    if (this.props.onClose) {
      this.props.onClose();
    }
  };

  onTapNext = () => {
    if (this.props.onNext) {
      this.props.onNext();
    }
  };

  onTapHire = () => {
    if (this.props.onTapHire) {
      this.props.onTapHire();
    }
  };

  render() {
    const {model} = this.props;

    return (
      <>
        <View
          style={{
            // marginTop: isIOS() ? StatusBarHeight : 0,
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View style={{flex: 1, width: '100%', flexDirection: 'column'}}>
            <ScrollView
              style={{
                height: '100%',
                backgroundColor: 'black',
                paddingTop: 20,
              }}
              contentContainerStyle={{
                paddingBottom: 80,
              }}>
              <ModelItemView
                username={model?.user?.username}
                country={'Norway'}
                point={3.5}
                reviews={321}
                isTouchable={false}
              />
              <View style={{marginVertical: 10}}>
                <SegViews
                  curIndex={this.state.segIndex}
                  titleList={['Profile', 'Reviews']}
                  onTapItem={(one, index) => {
                    this.setState({segIndex: index});
                  }}
                />
              </View>

              {this.state.segIndex == 0 && <ProfileView model={model} />}
              {this.state.segIndex == 1 && <ReviewsView/>}
            </ScrollView>
          </View>
        </View>
        <View
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            width: Constants.WINDOW_WIDTH,
            backgroundColor: Constants.secondBack,
          }}>
          <FillButton
            title={'Hire ' + model?.user.username}
            onPress={this.onTapHire}
          />
        </View>
      
      </>
    );
  }
}

export default ModelDetailView;

