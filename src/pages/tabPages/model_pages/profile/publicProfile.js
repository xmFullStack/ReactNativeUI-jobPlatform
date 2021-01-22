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
import {fakeModel} from './index';

import {uploadsHostUrl} from '../../../../utils/RestAPI';
import {FillButton} from '../../../../components/Buttons';

const EditIcon = (
  <Feather name={'edit-2'} color={Constants.darkGold} size={15} />
);
const RightIcon = (
  <Feather name="chevron-right" size={20} color={Constants.darkGold} />
);
const LeftIcon = (
  <Feather name="chevron-left" size={20} color={Constants.darkGold} />
);

class PublicProfile extends React.Component {
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

  onGoBack = () => {
    const {navigation} = this.props;
    navigation.goBack();
  };

  onTapChat = () => {
    // Alert.alert('Updated', 'Updated your profile information.');
    const {navigation} = this.props;
    navigation.navigate('chat_dlg')
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
            // paddingTop: 60,
          }}>
          <ScrollView
            style={{flex: 1}}
            contentContainerStyle={{
              backgroundColor: Constants.black,
            }}>
            <View style={styles.imageContainer}>
              <Image
                source={require('../../../../../assets/city1.jpg')}
                resizeMode={'cover'}
                style={styles.imageView}
              />
            </View>
            <View
              style={{
                width: Constants.WINDOW_WIDTH,
                backgroundColor: Constants.secondBack,
                borderRadius: 30,
                paddingVertical: 10,
                paddingHorizontal: 15,
              }}>
              <View style={{marginVertical: 5}}>
                <Text style={{color: Constants.white, fontSize: 25}}>
                  Michel D
                </Text>
              </View>
              <View style={{marginVertical: 5}}>
                <Text style={{color: Constants.white, fontSize: 14}}>
                  This is description for model, This is description for model,
                  This is description for model,
                </Text>
              </View>
              <View style={styles.bodyRow}>
                <View style={{width: 30, alignItems: 'center'}}>
                  <FontAwesome5
                    name="ruler"
                    size={18}
                    color={Constants.white}
                  />
                </View>
                <Text style={{...styles.label, marginHorizontal: 5}}>
                  Height
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    flex:1,
                    marginLeft: 10,
                    alignItems: 'flex-end',
                  }}>
                  <Text style={styles.labelValue}>170 cm</Text>
                </View>
              </View>

              <View style={styles.bodyRow}>
                <View style={{width: 30, alignItems: 'center'}}>
                  <FontAwesome5
                    name="child"
                    size={18}
                    color={Constants.white}
                  />
                </View>

                <Text style={{...styles.label, marginHorizontal: 5}}>
                  Body type:
                </Text>
              </View>
              <View style={styles.bodyRow}>
                <View style={{width: 30, alignItems: 'center'}}></View>

                <Text style={{...styles.label, marginHorizontal: 5}}>
                  Waist:
                </Text>

                <View
                  style={{
                    flexDirection: 'row',
                    marginLeft: 10,
                    flex:1,
                    alignItems: 'flex-end',
                  }}>
                  <Text style={styles.labelValue}>100 cm</Text>
                </View>
              </View>
              <View style={styles.bodyRow}>
                <View style={{width: 30, alignItems: 'center'}}></View>

                <Text style={{...styles.label, marginHorizontal: 5}}>Hip:</Text>

                <View
                  style={{
                    flexDirection: 'row',
                    marginLeft: 10,
                    flex:1,
                    alignItems: 'flex-end',
                  }}>
                  <Text style={styles.labelValue}>100 cm</Text>
                </View>
              </View>

              <View style={styles.bodyRow}>
                <View style={{width: 30, alignItems: 'center'}}>
                  <FontAwesome5
                    name="language"
                    size={18}
                    color={Constants.white}
                  />
                </View>
                <Text style={{...styles.label, marginHorizontal: 5}}>
                  Language:
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    marginLeft: 10,
                    flex:1,
                    alignItems: 'flex-end',
                  }}>
                  <Text style={styles.labelValue}>Spanish</Text>
                </View>
              </View>
         
            </View>
            <View style={styles.imageContainer}>
              <Image
                source={require('../../../../../assets/style2.jpg')}
                resizeMode={'cover'}
                style={styles.imageView}
              />
            </View>
            <View style={styles.imageContainer}>
              <Image
                source={require('../../../../../assets/style1.jpg')}
                resizeMode={'cover'}
                style={styles.imageView}
              />
            </View>
            <View style={styles.imageContainer}>
              <Image
                source={require('../../../../../assets/style2.jpg')}
                resizeMode={'cover'}
                style={styles.imageView}
              />
            </View>
            <View style={styles.imageContainer}>
              <Image
                source={require('../../../../../assets/style1.jpg')}
                resizeMode={'cover'}
                style={styles.imageView}
              />
            </View>
            <View style={styles.imageContainer}>
              <Image
                source={require('../../../../../assets/style2.jpg')}
                resizeMode={'cover'}
                style={styles.imageView}
              />
            </View>
          </ScrollView>

          <TouchableOpacity
            style={{
              position: 'absolute',
              top: 20,
              left: 10,
              width: 50, height: 50,
              backgroundColor: Constants.opacityBlack,
              borderRadius: 25,
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onPress={() => {
              this.onGoBack();
            }}>
            <Feather
              name="chevron-left"
              size={20}
              color={Constants.lightGold}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              position: 'absolute',
              top: 20,
              right: 10,
              width: 50, height: 50,
              backgroundColor: Constants.opacityBlack,
              borderRadius: 25,
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onPress={() => {
                this.onTapChat()
            }}>
            <Feather
              name="message-square"
              size={20}
              color={Constants.lightGold}
            />
          </TouchableOpacity>
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
    <PublicProfile
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
  imageContainer: {
    width: Constants.WINDOW_WIDTH,
    height: Constants.WINDOW_HEIGHT - 80,
    borderRadius: 40,
  },
  imageView: {width: '100%', height: '100%', borderRadius: 30},
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
  bodyRow: {flexDirection: 'row', alignItems: 'center', marginVertical: 10, },
  moreCircleBtn: {
    position: 'absolute',
    right: 5,
    top: 3,
    backgroundColor: Constants.opacityBlack,
    borderRadius: 40,
  },
});
