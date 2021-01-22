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

const EditIcon = (
  <Feather name={'edit-2'} color={Constants.darkGold} size={15} />
);

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

export const EditModal = ({
  isShow = false,
  label = '',
  oldText,
  multiLine = false,
  maxLength = 1500,
  onSubmitted,
  onClose,
}) => {
  const [text, setText] = React.useState(oldText);

  useEffect(() => {
    setText(oldText);
  }, [oldText]);

  const onSubmit = () => {
    if (onSubmitted) {
      onSubmitted();
    }
  };
  return (
    <Modal animationType={'fade'} transparent={true} visible={isShow}>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          width: Constants.WINDOW_WIDTH,
          height: Constants.WINDOW_HEIGHT,
          backgroundColor: 'rgba(13,13,13,0.95)',
          paddingTop: 60,
        }}>
        <HeaderBar
          title={'Place a Bid'}
          isShowLeft={false}
          isShowRight={true}
          rightIcon={
            <Feather name={'x'} size={20} color={Constants.darkGold} />
          }
          onRightButton={onClose}
        />
        <View
          style={{paddingHorizontal: 15, width: '100%', alignItems: 'stretch'}}>
          <Text style={{color: Constants.greyWhite, fontSize: 15}}>
            {label}
          </Text>
          <InputOutLine
            onChangeText={(val) => {
              setText(val);
            }}
            value={text}
            style={{
              height: Constants.WINDOW_WIDTH * 0.6,
            }}
            multiline={multiLine}
            maxLength={maxLength}
          />
          {multiLine && (
            <Text
              style={{
                color: Constants.greyWhite,
                fontSize: 13,
                textAlign: 'right',
                marginTop: 5,
              }}>
              Remain {maxLength - text.length} Characters
            </Text>
          )}

          <FillButton
            title={'Submit'}
            onPress={onSubmit}
            style={{marginVertical: 10}}
          />
        </View>
      </View>
    </Modal>
  );
};

export const DesignerProfileView = ({}) => {
  const logoSize = 100;

  const onTapLogo = ()=>{

  }

  return (
    <View>
      <View style={{}}>
        <Text style={styles.label}>Michel D.</Text>
        <Text style={styles.description}>zxc@x.com</Text>
      </View>

      <View style={{width: '100%', alignItems: 'center'}}>
        <Image
          source={defaultAvatar}
          resizeMode={'cover'}
          style={{width: logoSize, height: logoSize}}
        />
        <TouchableOpacity
          style={{position: 'absolute', top: 10, right: 10}}
          onPress={onTapLogo}>
          <Feather name={'camera'} size={20} color={Constants.darkGold} />
        </TouchableOpacity>
      </View>

      <View style={{marginVertical: 5}}>
        <Text style={styles.label}>Toly. H</Text>
        <Text style={styles.description}>Toly. H - Designer</Text>
      </View>

      <View style={{marginVertical: 5}}>
        <Text style={styles.label}>Email</Text>
        <Text style={styles.description}>tolyh@gmail.com</Text>
      </View>
    </View>
  );
};

const ProfileView = ({model}) => {
  const [videoFullShow, setVideoFullShow] = useState(false);

  const [showEdit, setShowEdit] = useState(false);
  const [editLabel, setEditLabel] = useState('');
  const [multiLine, setMultiLine] = useState(false);
  const [maxLen, setMaxLen] = useState(1400);
  const [editText, setEditText] = useState('');

  const [editPhoto, setEditPhoto] = useState(false);
  const [isShowPicker, setIsShowPicker] = useState(false);
  const [showVideoPicker, setShowVideoPicker] = useState(false);

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

  if (global.curUser.role == UserRole.Designer) {
    return <DesignerProfileView />;
  }

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
        <TouchableOpacity
          style={{
            flex: 2,
            height: Constants.WINDOW_WIDTH * 0.6 + 10,
            borderRadius: 5,
          }}
          onPress={() => {
            if (editPhoto) {
              setShowVideoPicker(true);
            } else {
              setVideoFullShow(true);
            }
          }}>
          <Image
            style={{
              width: '100%',
              height: Constants.WINDOW_WIDTH * 0.6,
              borderRadius: 5,
            }}
            resizeMode={'cover'}
            source={require('../../../../../assets/city1.jpg')}
          />
          {/* <VideoPlayer
            resizeMode={'cover'}
            video={{
              uri: model?.user?.videos
                ? uploadsHostUrl + model.user.videos[0].short_video
                : null,
            }}
            videoWidth={Constants.WINDOW_WIDTH * 0.6}
            videoHeight={Constants.WINDOW_WIDTH * 0.6 + 10}
            thumbnail={require('../../../../../assets/city1.jpg')}
          /> */}
          {/* <View
            style={{
              position: 'absolute',
              left: 0,
              top: 0,
              width: '100%',
              height: '100%',
              backgroundColor: Constants.opacityBlack,
            }}></View> */}
        </TouchableOpacity>
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
                <Feather
                  name="more-vertical"
                  size={20}
                  color={Constants.darkGold}
                />
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
                <Feather
                  name="more-vertical"
                  size={20}
                  color={Constants.darkGold}
                />
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
              <Feather
                name="more-vertical"
                size={20}
                color={Constants.darkGold}
              />
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
              <Feather
                name="more-vertical"
                size={20}
                color={Constants.darkGold}
              />
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
              <Feather
                name="more-vertical"
                size={20}
                color={Constants.darkGold}
              />
            </TouchableOpacity>
          )}
        </View>
      </View>
      <FillButton
        title={editPhoto ? 'Submit' : 'Edit Photos and Video'}
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
          <Text style={styles.label}>About</Text>
          <Text style={styles.description}>
            this is description for model, this is description for model this is
            description for model
          </Text>
          <TouchableOpacity
            style={{position: 'absolute', top: 3, right: 5}}
            onPress={onTapEditAbout}>
            {EditIcon}
          </TouchableOpacity>
        </View>
        <View style={{marginVertical: 5}}>
          <Text style={styles.label}>Work and Education</Text>
          <Text style={styles.description}>
            this is description for model, this is description for model this is
            description for model
          </Text>
          <TouchableOpacity
            style={{position: 'absolute', top: 3, right: 5}}
            onPress={onTapEditWork}>
            {EditIcon}
          </TouchableOpacity>
        </View>
        <View style={{marginVertical: 5}}>
          <Text style={styles.label}>
            Experience:{' '}
            <Text style={styles.labelValue}>{model?.experience} years</Text>
          </Text>
          <TouchableOpacity
            style={{position: 'absolute', top: 3, right: 5}}
            onPress={onTapExperience}>
            {EditIcon}
          </TouchableOpacity>
        </View>
        <View
          style={{
            marginVertical: 5,
            paddingRight: 10,
            paddingLeft: 5,
          }}>
          {/*  <View style={{flex: 1}}> */}
          <View style={styles.bodyRow}>
            <Text style={styles.label}>Height:</Text>
            <Text style={styles.labelValue}>{model?.height} in</Text>
            <TouchableOpacity
              style={styles.editIcon}
              onPress={() => {
                setEditText(model?.height);
                setEditLabel('Height');
                setMultiLine(false);
                setMaxLen(10);
                setShowEdit(true);
              }}>
              {EditIcon}
            </TouchableOpacity>
          </View>

          <View style={styles.bodyRow}>
            <Text style={styles.label}>Waist:</Text>
            <Text style={styles.labelValue}>{model?.waist} in</Text>
            <TouchableOpacity
              style={styles.editIcon}
              onPress={() => {
                setEditText(model?.waist);
                setEditLabel('Waist');
                setMultiLine(false);
                setMaxLen(10);
                setShowEdit(true);
              }}>
              {EditIcon}
            </TouchableOpacity>
          </View>
          {/* </View> */}
          {/* <View style={{flex: 1}}> */}
          <View style={styles.bodyRow}>
            <Text style={styles.label}>Hip:</Text>
            <Text style={styles.labelValue}>{model?.hip} in</Text>
            <TouchableOpacity
              style={styles.editIcon}
              onPress={() => {
                setEditText(model?.hip);
                setEditLabel('Hip');
                setMultiLine(false);
                setMaxLen(10);
                setShowEdit(true);
              }}>
              {EditIcon}
            </TouchableOpacity>
          </View>

          <View style={styles.bodyRow}>
            <Text style={styles.label}>Bust: </Text>
            <Text style={styles.labelValue}>{model?.bust} in</Text>
            <TouchableOpacity
              style={styles.editIcon}
              onPress={() => {
                setEditText(model?.bust);
                setEditLabel('Bust');
                setMultiLine(false);
                setMaxLen(10);
                setShowEdit(true);
              }}>
              {EditIcon}
            </TouchableOpacity>
          </View>
          {/* </View> */}
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
      <ActionSheet
        title={'Pick Image From'}
        titleList={['Camera', 'Photo Library']}
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

  onTapApply = () => {
    Alert.alert('Updated', 'Updated your profile information.');
  };
  onTapNext = () => {
    const navigation = this.context;
    navigation.goBack();
  };


  
  
  render() {
    const {model} = this.props;
    const title = global.curUser.role == UserRole.Designer ? 'Designer Profile' : 'Model Profile edit'

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
              <Feather name="check" size={25} color={Constants.lightGold} />
            }
            isBackLeft={true}
            onLeftButton={this.onGoBack}
            onRightButton={this.onTapApply}
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
  bodyRow: {flexDirection: 'row', alignItems: 'center', marginVertical: 5},
  moreCircleBtn: {
    position: 'absolute',
    right: 5,
    top: 3,
    backgroundColor: Constants.opacityBlack,
    borderRadius: 40,
  },
});
