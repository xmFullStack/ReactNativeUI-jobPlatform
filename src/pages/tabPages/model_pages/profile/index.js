import React, {useState, useEffect, useRef} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
  ScrollView,
  Image,
  Modal,
  Alert,
} from 'react-native';
import Slider from '@react-native-community/slider';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Feather from 'react-native-vector-icons/Feather';
import VideoPlayer from 'react-native-video-player';
import Constants, {
  StatusBarHeight,
  isIOS,
  UserRole,
} from '../../../../utils/Constants';
import {InputOutLine} from '../../../../components/Inputs';
import ModelDetailView from '../../post/views/ModelDetailView';
import {Provider, connect, useDispatch, useSelector} from 'react-redux';
const defaultAvatar = require('../../../../../assets/default_avatar.png');

import {
  NavigationContext,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import HeaderBar from '../../../../components/HeaderBar';

import VideoPlayerModal from '../../../../components/VideoPlayerModal';
import ActionSheet from '../../../../components/ActionSheet';

import {uploadsHostUrl} from '../../../../utils/RestAPI';
import {FillButton} from '../../../../components/Buttons';

import SliderEditModal from './views/SliderEditModal';
import EditModal from './views/EditModal';
import BodyTypeModal from './views/BodyTypeModal';
import LangModal from './views/LangModal';

const EditIcon = (
  <Feather name={'edit-2'} color={Constants.darkGold} size={15} />
);
const RightIcon = (
  <Feather name="chevron-right" size={20} color={Constants.darkGold} />
);
const LeftIcon = (
  <Feather name="chevron-left" size={20} color={Constants.darkGold} />
);

export const fakeModel = {
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

const ProfileView = ({model}) => {
  const [videoFullShow, setVideoFullShow] = useState(false);

  const [showEdit, setShowEdit] = useState(false);
  const [editLabel, setEditLabel] = useState('');
  const [multiLine, setMultiLine] = useState(false);
  const [maxLen, setMaxLen] = useState(1400);
  const [editText, setEditText] = useState('');

  const [showSliderEdit, setShowSliderEdit] = useState(false);
  const [sliderMin, setSliderMin] = useState(0);
  const [sliderMax, setSliderMax] = useState(100);
  const [sliderStep, setSliderStep] = useState(1);
  const [curSliderVal, setCurSliderVal] = useState(1);

  const [editPhoto, setEditPhoto] = useState(false);
  const [isShowPicker, setIsShowPicker] = useState(false);
  const [showVideoPicker, setShowVideoPicker] = useState(false);

  const [showBodyType, setShowBodyTypeModal] = useState(false);

  const [showLangModal, setShowLangModal] = useState(false);

  const FullWidth = Constants.WINDOW_WIDTH - 15;
  const imgW = FullWidth * 0.3;

  const onTapEditAbout = () => {
    setEditText(
      'this is description for model, this is description for model this is description for model',
    );
    setEditLabel('About me');
    setMultiLine(true);
    setMaxLen(1500);
    setShowEdit(true);
  };

  const onTapEditWork = () => {
    setEditText(
      'this is description for model, this is description for model this is description for model',
    );
    setEditLabel('Work and Education');
    setMultiLine(true);
    setMaxLen(1500);
    setShowEdit(true);
  };

  const onTapExperience = () => {
    setEditText('7');
    setEditLabel('How many years do you have experiences?');
    setMultiLine(false);
    setMaxLen(100);
    setShowEdit(true);
  };

  const onTapEditName = () => {
    setEditText('Michel D.');
    setEditLabel('Enter You Name');
    setMultiLine(false);
    setMaxLen(100);
    setShowEdit(true);
  };

  const onTapSubmitPhotoVideo = () => {
    if (editPhoto) {
      Alert.alert('Confirm', 'Are you sure to submit these photos and video?', [
        {
          text: 'Yes',
          style: 'default',
          onPress: () => {
            Alert.alert('Success', 'Successfully submitted video and photos.');
          },
        },
        {
          text: 'No',
          style: 'cancel',
          onPress: () => {},
        },
      ]);
    } else {
    }
    setEditPhoto(!editPhoto);
  };

  return (
    <View>
      <View style={{}}>
        <Text style={styles.label}>Michel D.</Text>
        <Text style={styles.description}>zxc@x.com</Text>
        <TouchableOpacity
          style={{position: 'absolute', right: 5, top: 3}}
          onPress={onTapEditName}>
          {EditIcon}
        </TouchableOpacity>
      </View>

      <View style={{flexDirection: 'row', marginTop: 5}}>
        <View
          style={{
            flex: 2,
            height: Constants.WINDOW_WIDTH * 0.6 + 10,
            borderRadius: 5,
          }}
          // onPress={() => {
          //   if (editPhoto) {
          //     setShowVideoPicker(true);
          //   } else {
          //     setVideoFullShow(true);
          //   }
          // }}
          >
          <Image
            style={{
              width: '100%',
              height: Constants.WINDOW_WIDTH * 0.6,
              borderRadius: 5,
            }}
            resizeMode={'cover'}
            source={require('../../../../../assets/city1.jpg')}
          />
           {editPhoto && (
              <TouchableOpacity
                style={styles.moreCircleBtn}
                onPress={() => {
                  setIsShowPicker(true);
                }}>
                <Feather name="camera" size={20} color={Constants.darkGold} />
              </TouchableOpacity>
            )}
        </View>
        <View style={{flex: 1, marginLeft: 5}}>
          <View
            style={{
              width: '100%',
              height: Constants.WINDOW_WIDTH * 0.3,
              marginBottom: 5,
              borderRadius: 5,
            }}>
            <Image
              style={{
                width: '100%',
                height: Constants.WINDOW_WIDTH * 0.3,
              }}
              resizeMode={'cover'}
              source={require('../../../../../assets/style2.jpg')}
            />
            {editPhoto && (
              <TouchableOpacity
                style={styles.moreCircleBtn}
                onPress={() => {
                  setIsShowPicker(true);
                }}>
                <Feather name="camera" size={20} color={Constants.darkGold} />
              </TouchableOpacity>
            )}
          </View>

          <View
            style={{
              width: '100%',
              height: Constants.WINDOW_WIDTH * 0.3,
              marginBottom: 5,
              borderRadius: 5,
            }}>
            <Image
              style={{
                width: '100%',
                height: Constants.WINDOW_WIDTH * 0.3,
              }}
              resizeMode={'cover'}
              source={require('../../../../../assets/style3.jpg')}
            />
            {editPhoto && (
              <TouchableOpacity
                style={styles.moreCircleBtn}
                onPress={() => {
                  setIsShowPicker(true);
                }}>
                <Feather name="camera" size={20} color={Constants.darkGold} />
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
      <View
        style={{
          flexDirection: 'row',
          marginTop: 5,
          justifyContent: 'space-between',
        }}>
        <View
          style={{
            flex: 1,
            height: imgW,
            marginBottom: 5,
            borderRadius: 5,
            marginRight: 5,
          }}>
          <Image
            style={{
              width: '100%',
              height: imgW,
            }}
            resizeMode={'cover'}
            source={require('../../../../../assets/style2.jpg')}
          />
          {editPhoto && (
            <TouchableOpacity
              style={styles.moreCircleBtn}
              onPress={() => {
                setIsShowPicker(true);
              }}>
              <Feather name="camera" size={20} color={Constants.darkGold} />
            </TouchableOpacity>
          )}
        </View>
        <View
          style={{
            flex: 1,
            height: imgW,
            borderRadius: 5,
            marginRight: 5,
          }}>
          <Image
            style={{
              width: '100%',
              height: imgW,
            }}
            resizeMode={'cover'}
            source={require('../../../../../assets/style2.jpg')}
          />
          {editPhoto && (
            <TouchableOpacity
              style={styles.moreCircleBtn}
              onPress={() => {
                setIsShowPicker(true);
              }}>
              <Feather name="camera" size={20} color={Constants.darkGold} />
            </TouchableOpacity>
          )}
        </View>
        <View
          style={{
            flex: 1,
            height: imgW,
            marginBottom: 5,
            borderRadius: 5,
          }}>
          <Image
            style={{
              width: '100%',
              height: imgW,
            }}
            resizeMode={'cover'}
            source={require('../../../../../assets/style2.jpg')}
          />
          {editPhoto && (
            <TouchableOpacity
              style={styles.moreCircleBtn}
              onPress={() => {
                setIsShowPicker(true);
              }}>
              <Feather name="camera" size={20} color={Constants.darkGold} />
            </TouchableOpacity>
          )}
        </View>
      </View>
      <FillButton
        title={editPhoto ? 'Submit' : 'Add Photos'}
        onPress={onTapSubmitPhotoVideo}
        style={{marginTop: 10}}
      />
      <View
        style={{
          marginBottom: 10,
          marginTop: 10,
          width: '100%',
        }}>
        <View style={{marginVertical: 5}}>
          <Text style={{...styles.description, paddingRight: 10}}>
            This is description for model, this is description for model this is
            description for model
          </Text>
          <TouchableOpacity
            style={{position: 'absolute', top: 3, right: 5}}
            onPress={onTapEditAbout}>
            {EditIcon}
          </TouchableOpacity>
        </View>

        <View
          style={{
            marginVertical: 5,
            paddingRight: 10,
            paddingLeft: 5,
          }}>
          <View style={styles.bodyRow}>
            <View style={{width: 30, alignItems: 'center'}}>
              <FontAwesome5 name="ruler" size={18} color={Constants.white} />
            </View>
            <Text style={{...styles.label, marginHorizontal: 5}}>Height</Text>
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                marginLeft: 10,
                alignItems: 'flex-end',
              }}
              onPress={() => {
                // setEditText(model?.height);
                setEditLabel('How tall are you?');
                // setMultiLine(false);
                // setMaxLen(10);
                // setShowEdit(true);
                setShowSliderEdit(true);
                setSliderMin(150);
                setSliderMax(250);
                setCurSliderVal(150);
              }}>
              {RightIcon}
            </TouchableOpacity>
          </View>

          <View style={styles.bodyRow}>
            <View style={{width: 30, alignItems: 'center'}}>
              <FontAwesome5 name="child" size={18} color={Constants.white} />
            </View>

            <Text style={{...styles.label, marginHorizontal: 5}}>
              Body type:
            </Text>

            <TouchableOpacity
              style={{
                flexDirection: 'row',
                marginLeft: 10,
                alignItems: 'flex-end',
              }}
              onPress={() => {
                setShowBodyTypeModal(true);
              }}>
              {RightIcon}
            </TouchableOpacity>
          </View>

          <View style={styles.bodyRow}>
            <View style={{width: 30, alignItems: 'center'}}>
              <FontAwesome5 name="language" size={18} color={Constants.white} />
            </View>
            <Text style={{...styles.label, marginHorizontal: 5}}>
              Language:
            </Text>

            <TouchableOpacity
              style={{
                flexDirection: 'row',
                marginLeft: 10,
                alignItems: 'flex-end',
              }}
              onPress={() => {
                setShowLangModal(true);
              }}>
              {RightIcon}
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <VideoPlayerModal
        uri={
          model?.user?.videos
            ? uploadsHostUrl + model.user.videos[0].short_video
            : null
        }
        // height={this.state.videoSize?.height}
        // width={this.state.videoSize?.width}
        onTapClose={() => {
          setVideoFullShow(false);
        }}
        isShow={videoFullShow}
      />
      <EditModal
        isShow={showEdit}
        label={editLabel}
        oldText={editText}
        maxLength={maxLen}
        multiLine={multiLine}
        onSubmitted={() => {
          setShowEdit(false);
        }}
        onClose={() => {
          setShowEdit(false);
        }}
      />
      <SliderEditModal
        isShow={showSliderEdit}
        label={editLabel}
        minVal={sliderMin}
        maxVal={sliderMax}
        initVal={curSliderVal}
        sliderStep={sliderStep}
        onSubmit={() => {
          setShowSliderEdit(false);
        }}
        onClose={() => {
          setShowSliderEdit(false);
        }}
      />
      <BodyTypeModal
        isShow={showBodyType}
        initHip={100}
        initWaist={100}
        onSubmit={() => {
          setShowBodyTypeModal(false);
        }}
        onClose={() => {
          setShowBodyTypeModal(false);
        }}
      />
      <LangModal
        isShow={showLangModal}
        initLang={'English'}
        onSubmit={() => {
          setShowLangModal(false);
        }}
        onClose={() => {
          setShowLangModal(false);
        }}
      />
      <ActionSheet
        title={'Pick Image From'}
        titleList={['Camera', 'Photo Library', 'Connect Instagram']}
        onTapItem={(index, title) => {
          setIsShowPicker(false);
        }}
        onCancel={() => {
          setIsShowPicker(false);
        }}
        isShow={isShowPicker}
      />
      <ActionSheet
        title={'Pick Video From'}
        titleList={['Camera', 'Video Library']}
        onTapItem={(index, title) => {
          setShowVideoPicker(false);
        }}
        onCancel={() => {
          setShowVideoPicker(false);
        }}
        isShow={showVideoPicker}
      />
    </View>
  );
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

  onTapPublic = () => {
    // Alert.alert('Updated', 'Updated your profile information.');
    const {navigation} = this.props;
    navigation.navigate('model_public_profile');
  };
  onTapNext = () => {
    const navigation = this.context;
    navigation.goBack();
  };

  render() {
    const {model, curRole} = this.props;
    const title = 'Model Profile123';

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
            title={title}
            isShowLeft={true}
            isShowRight={true}
            rightIcon={
              // <Feather name="eye" size={25} color={Constants.lightGold} />
              <Text style={{color: Constants.lightGold, fontSize: 14}}>
                Public
              </Text>
            }
            isBackLeft={true}
            onLeftButton={this.onGoBack}
            onRightButton={this.onTapPublic}
          />
          <ScrollView
            style={{flex: 1}}
            contentContainerStyle={{paddingBottom: 20}}>
            <ProfileView model={fakeModel} onTapHire={this.onTapHire} />
          </ScrollView>
        </SafeAreaView>
      </>
    );
  }
}

export default function (props) {
  const route = useRoute();
  const navigation = useNavigation();
  // const model = route.params?.model;
  const dispatch = useDispatch();
  const curRole = useSelector((state) => state.role.curRole);

  const model = fakeModel;

  const onlyShow = route.params?.onlyShow;
  return (
    <ModelDetailScreen
      {...props}
      navigation={navigation}
      route={route}
      model={model}
      onlyShow={onlyShow}
      curRole={curRole}
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
    flex: 1,
    color: Constants.lightGold,
    fontSize: 20,
    textAlign: 'right',
  },
  description: {
    color: Constants.greyWhite,
    fontSize: 15,
    // textAlign: 'center',
  },
  editIcon: {width: 30, marginLeft: 10, alignItems: 'flex-end'},
  bodyRow: {flexDirection: 'row', alignItems: 'center', marginVertical: 10},
  moreCircleBtn: {
    position: 'absolute',
    right: 5,
    top: 3,
    backgroundColor: Constants.opacityBlack,
    borderRadius: 20,
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
