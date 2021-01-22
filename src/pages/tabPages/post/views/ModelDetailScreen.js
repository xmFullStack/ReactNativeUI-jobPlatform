import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
  ScrollView,
} from 'react-native';

import EvilIcons from 'react-native-vector-icons/EvilIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Feather from 'react-native-vector-icons/Feather';
import VideoPlayer from 'react-native-video-player';
import Constants, {StatusBarHeight, isIOS} from '../../../../utils/Constants';

import ModelDetailView from './ModelDetailView';

import {
  NavigationContext,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import HeaderBar from '../../../../components/HeaderBar';

import VideoPlayerModal from '../../../../components/VideoPlayerModal';

import {uploadsHostUrl} from '../../../../utils/RestAPI';

const fakeModel = {
  id: 30,
  user_id: 59,
  location_id: 9,
  style_id: null,
  height: 7,
  waist: 8,
  hip: 8,
  bust: 7,
  experience: 7,
  description: 'Jd',
  created_at: '2020-11-18 14:19:47',
  updated_at: '2020-11-18 14:21:29',
  location: {
    id: 9,
    name: 'Tokyo',
    image: '/uploads/location_1604660958085.jpg',
    created_at: '2020-11-06 11:09:18',
    updated_at: '2020-11-06 11:09:18',
  },
  user: {
    id: 59,
    username: 'Pp',
    email: 'P@p.com',
    role: 2,
    mobile: '83904',
    address: 'Jfjf',
    passport_img: '/uploads/passport/id_1605709131954.jpeg',
    reset_token: null,
    active: 1,
    created_at: '2020-11-18 14:18:53',
    updated_at: '2020-11-18 14:21:57',
    videos: [
      {
        id: 83,
        user_id: 59,
        short_video: '/uploads/video/opt/video_1605709289618.mp4',
        created_at: '2020-11-18 14:21:29',
        updated_at: '2020-11-18 14:21:29',
      },
    ],
    images: [
      {
        id: 174,
        user_id: 59,
        image: '/uploads/model/model_1605709289823_7185.jpeg',
        created_at: '2020-11-18 14:21:31',
        updated_at: '2020-11-18 14:21:31',
      },
      {
        id: 175,
        user_id: 59,
        image: '/uploads/model/model_1605709289824_5135.jpeg',
        created_at: '2020-11-18 14:21:31',
        updated_at: '2020-11-18 14:21:31',
      },
    ],
    styles: [
      {
        id: 18,
        name: 'Chic',
        image: '/uploads/location_1604836049879.jpeg',
        created_at: '2020-11-08 11:47:31',
        updated_at: '2020-11-08 11:47:31',
        pivot: {
          style_id: 18,
          user_id: 59,
        },
      },
    ],
  },
};

class ModelDetailScreen extends React.Component {
  static contextType = NavigationContext;

  constructor(props) {
    super(props);

    const model = props.model;
    let images =
      model && model.user.images
        ? model.user.images.map((item, index) => {
            return {id: item.id, src: {uri: uploadsHostUrl + item.image}};
          })
        : null;

    this.state = {
      isKeyboardShowing: false,
      video: props.model.user.videos
        ? uploadsHostUrl + props.model.user.videos[0].short_video
        : null,
      photoList: images,
      pageIndex: 1,
    };
  }

  componentDidMount() {}

  componentWillUnmount() {}

  calcPageIndex = (event) => {
    let totalW = event.nativeEvent.contentSize.width;
    let pageW = event.nativeEvent.layoutMeasurement.width;
    let offsetX = event.nativeEvent.contentOffset.x;
    let pages = Math.ceil(offsetX / pageW) + 1;
    this.setState({pageIndex: pages});
    return pages;
  };

  onGoBack = () => {
    const {navigation} = this.props;
    navigation.goBack();
  };

  onTapNext = () => {
    const navigation = this.context;
    navigation.goBack();
  };

  onTapHire = ()=>{
    const navigation = this.context;
    navigation.goBack();
    navigation.navigate('post_job', {step: 5, model: fakeModel})
  }

  render() {
    const {model} = this.props;
    return (
      <>
        <SafeAreaView style={{flex: 0, backgroundColor: Constants.backColor}} />
        <SafeAreaView
          style={{
            flex: 1,
            backgroundColor: Constants.backColor,
            paddingHorizontal: 20,
            paddingTop: 60,
          }}>
          <HeaderBar
            title={'Model Profile'}
            isShowLeft={true}
            isShowRight={false}
            rightIcon={
              <Text
                style={{
                  color: Constants.lightGold,
                  fontSize: 15,
                  fontWeight: 'bold',
                }}>
                HIRE
              </Text>
            }
            isBackLeft={true}
            onLeftButton={this.onGoBack}
            onRightButton={this.onTapHire}
          />
          <ModelDetailView model={fakeModel} onTapHire={this.onTapHire} />
        </SafeAreaView>
      </>
    );
  }
}

export default function (props) {
  const route = useRoute();
  const navigation = useNavigation();
  // const model = route.params?.model;

  const model = fakeModel;

  const onlyShow = route.params?.onlyShow;
  return (
    <ModelDetailScreen
      {...props}
      navigation={navigation}
      route={route}
      model={model}
      onlyShow={onlyShow}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    borderStyle: 'solid',
    overflow: 'hidden',
    borderColor: 'black',
    width: '100%',
    backgroundColor: 'white',
  },

  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },

  container: {
    flex: 1,
    padding: 20,
    width: '100%',
    maxWidth: '100%',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000000',
  },

  textInput: {
    color: '#FFFFFF',
    width: '100%',
    fontSize: 13,
  },

  buttonContainer: {
    width: '100%',
    height: 50,
    paddingStart: 10,
    paddingEnd: 10,
    marginTop: 40,
  },

  borderButtonStyle: {
    width: '100%',
    height: 50,
    borderColor: '#2b8772',
    backgroundColor: '#2b8772',
    borderWidth: 0.7,
    borderRadius: 25,
    fontSize: 10,
    fontWeight: 'bold',
    textAlign: 'center',
  },

  borderButtonTitle: {
    fontSize: 14,
    color: '#ffffff',
  },

  buttonStyle: {
    width: '100%',
    height: 50,
    backgroundColor: '#122855',
    fontSize: 10,
    fontWeight: 'bold',
    textAlign: 'center',
  },

  buttonTitle: {
    fontSize: 18,
    color: '#DDDDDDDD',
  },

  forgotPassword: {
    width: '100%',
    alignItems: 'flex-end',
    marginBottom: 24,
  },

  backText: {
    textAlign: 'left',
    fontSize: 14,
    color: '#DDDDDDDD',
    marginTop: 20,
    paddingTop: 5,
    paddingBottom: 5,
  },
  signupText: {
    textAlign: 'right',
    fontSize: 14,
    color: '#DDDDDDDD',
    marginTop: 20,
    paddingTop: 5,
    paddingBottom: 5,
  },
  dashText: {
    textAlign: 'center',
    fontSize: 14,
    color: '#D4AF37',
    marginTop: 20,
    paddingTop: 5,
    paddingBottom: 5,
    marginStart: 20,
    marginEnd: 20,
  },

  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  label: {
    flex: 1,
    color: Constants.white,
    marginVertical: 2,
    fontSize: 15,
  },
  labelValue: {
    flex: 2,
    color: Constants.lightGold,
    fontSize: 20,
    textAlign: 'center',
  },
});
