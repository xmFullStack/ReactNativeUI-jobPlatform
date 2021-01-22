import React from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Text,
  FlatList,
  ScrollView,
  SafeAreaView,
  KeyboardAvoidingView,
  Alert,
} from 'react-native';

import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import {check, PERMISSIONS, RESULTS} from 'react-native-permissions';

import Constants, {StatusBarHeight, isIOS} from '../../../../utils/Constants';
import {HeaderBar} from '../../../../components/HeaderBar';
import ActionSheet from '../../../../components/ActionSheet';
import {
  NavigationContext,
  useNavigation,
  useRoute,
} from '@react-navigation/native';

import {
  OutlineButton,
  FillButton,
  PickerButton,
  CheckBox,
  ToggleButton,
} from '../../../../components/Buttons';

import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

import GradientButton from '../../../../components/GradientButton';
import {ModelPhotoItem} from './ModelProfilePage';

class OutfitScreenView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isKeyboardShowing: false,
      description: '',
      model: props.model,
      images: [],
      showPickerPhoto: false,
    };
  }

  componentDidMount() {}

  componentWillUnmount() {}

  checkCameraPermission = async () => {
    // const cameraPermission = await Permissions.getAsync(Permissions.CAMERA);
    // if (cameraPermission.status !== 'granted') {
    //   const askCameraPermission = await Permissions.askAsync(
    //     Permissions.CAMERA,
    //   );
    //   if (askCameraPermission.status != 'granted') {
    //     alertOk(
    //       'Fashion Army',
    //       'Fashion Army uses camera to take your photo.',
    //       () => {
    //         Permissions.askAsync(Permissions.CAMERA);
    //       },
    //       MsgTypes.warn,
    //     );
    //     this.setState({hasCameraPermission: false});
    //     return false;
    //   }
    // }
    // const cameraRollPermission = await Permissions.getAsync(
    //   Permissions.CAMERA_ROLL,
    // );
    // if (cameraRollPermission.status !== 'granted') {
    //   const askCameraRollPermission = await Permissions.askAsync(
    //     Permissions.CAMERA_ROLL,
    //   );
    //   if (askCameraRollPermission.status !== 'granted') {
    //     alertOk(
    //       'Fashion Army',
    //       'Fashion Army uses camera roll to take your photo.',
    //       () => {
    //         Permissions.askAsync(Permissions.CAMERA_ROLL);
    //       },
    //       MsgTypes.warn,
    //     );
    //     this.setState({hasCameraPermission: false});
    //     return false;
    //   }
    // }
    // this.setState({hasCameraPermission: true});
    // return true;
  };

  onTapPickImageFromCamera = async () => {
    // await this.checkCameraPermission();
    // let result = await ImagePicker.launchCameraAsync({
    //   mediaTypes: ImagePicker.MediaTypeOptions.Images,
    //   allowsEditing: true,
    //   aspect: [3, 4],
    //   quality: 1,
    // });
    // console.log(result);
    // if (!result.cancelled) {
    //   this.addPhotoList(result.uri);
    // }
  };

  onTapPickImageFromGallery = async () => {
    // await this.checkCameraPermission();
    // let result = await ImagePicker.launchImageLibraryAsync({
    //   mediaTypes: ImagePicker.MediaTypeOptions.Images,
    //   allowsEditing: true,
    //   aspect: [3, 4],
    //   quality: 1,
    // });
    // console.log(result);
    // if (!result.cancelled) {
    //   this.addPhotoList(result.uri);
    // }
  };

  addPhotoList = (uri) => {
    let images = [];
    Object.assign(images, this.state.images);
    if (images.length >= 5) {
      Alert.alert('Max Photos', 'You can only select 5 photos.');
      return;
    }

    images.push({id: this.state.images.length, src: {uri: uri}});

    this.setState(
      {
        images: images,
      },
      () => {
        this.onChange();
      },
    );
  };

  onTapTrashPhoto = (id) => {
    let images = [];

    this.state.images.forEach((one) => {
      if (one.id != id) {
        images.push(one);
      }
    });
    this.setState({
      images: images,
    });
  };

  validation = () => {
    const {model, images, description} = this.state;

    if (!model) {
      Alert.alert('Validation Error', 'Please select model.');
      return false;
    }
    if (!description) {
      Alert.alert('Validation Error', 'Please enter description.');
      return false;
    }
    return true;
  };

  onTapNext = () => {
    // if (!this.validation()) {
    //   return;
    // }

    if (this.props.onTapNext) {
      this.props.onTapNext(this.state.description, this.state.images);
    }
  };

  onChange = () => {
    if (this.props.onChange) {
      this.props.onChange(this.state.description, this.state.images);
    }
  };

  onTapBack = () => {
    if (this.props.onBack) {
      this.props.onBack();
    }
  };

  render() {
    return (
      <>
        <KeyboardAvoidingView
          style={styles.container}
          behavior={Platform.OS == 'ios' ? 'padding' : 'height'}>
          <ScrollView
            style={{
              flex: 1,
              backgroundColor: Constants.backColor,
              width: '100%',
            }}
            contentContainerStyle={{paddingBottom: 0,}}
            keyboardShouldPersistTaps={'always'}>
            <View
              style={{
                width: '100%',
                paddingTop: 10,
                paddingBottom: 110,
                flexDirection: 'column',
                alignItems: 'center',
              }}>
              <View
                style={{
                  width: '100%',
                }}>
                <Text style={styles.jobCaption}>Describe your project</Text>

                <View style={{flexDirection: 'row'}}>
                  <Text style={styles.jobDesc}>{'\u2B24'}</Text>
                  <Text style={{flex: 1, ...styles.jobDesc}}>
                    What is the goal
                  </Text>
                </View>
                <View style={{flexDirection: 'row'}}>
                  <Text style={styles.jobDesc}>{'\u2B24'}</Text>
                  <Text style={{flex: 1, ...styles.jobDesc}}>
                    Type and style of the model or the content creator you are
                    looking for
                  </Text>
                </View>
                <View style={{flexDirection: 'row'}}>
                  <Text style={styles.jobDesc}>{'\u2B24'}</Text>
                  <Text style={{flex: 1, ...styles.jobDesc}}>
                    What is unique about your content
                  </Text>
                </View>

                <TextInput
                  blurOnSubmit={false}
                  placeholder=""
                  placeholderTextColor={Constants.lightGold}
                  inputStyle={{
                    fontSize: 15,
                    textAlign: 'left',
                    color: 'white',
                  }}
                  style={{
                    borderColor: Constants.lightGold,
                    borderRadius: 10,
                    borderWidth: 1,
                    height: Constants.WINDOW_HEIGHT * 0.2,
                    padding: 10,
                    color: 'white',
                    marginTop: 10,
                    fontSize: 15,
                  }}
                  textAlignVertical={'top'}
                  multiline={true}
                  returnKeyType="done"
                  inputContainerStyle={{
                    height: Constants.WINDOW_HEIGHT * 0.3,
                    textAlign: 'left',
                    backgroundColor: 'rgba(255, 255, 255, 0.7)',
                  }}
                  keyboardType="default"
                  value={this.state.description}
                  onChangeText={(description) => {
                    this.setState({description}, () => {
                      this.onChange();
                    });
                  }}
                />
              </View>
              <View
                style={{
                  width: '100%',
                  marginTop: 10,
                  justifyContent: 'center',
                }}>
                <FillButton
                  title={'+ Upload your mood board ( optional )'}
                  onPress={() => {
                    this.setState({showPickerPhoto: true});
                  }}
                  style={{height: 35}}
                />

                {/* <View
                  style={{
                    flexDirection: 'row',
                    paddingVertical: 10,
                    justifyContent: 'space-between',
                  }}>
                  <View style={{flexDirection: 'row'}}>
                   
                    <Text
                      style={{
                        color: Constants.lightGold,
                        marginLeft: 10,
                        fontSize: 15,
                      }}>
                      Add mood board picture
                    </Text>
                  </View>
                  <View style={{flexDirection: 'row'}}>
                    <TouchableOpacity
                      style={{marginHorizontal: 5}}
                      onPress={this.onTapPickImageFromGallery}>
                      <Ionicons
                        name="ios-images"
                        size={30}
                        color={Constants.lightGold}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={{marginHorizontal: 5}}
                      onPress={this.onTapPickImageFromCamera}>
                      <FontAwesome5
                        name="camera-retro"
                        size={28}
                        color={Constants.lightGold}
                      />
                    </TouchableOpacity>
                  </View>
                </View> */}
                {/* {!(this.state.images && this.state.images.length > 0) && (
                  <Text
                    style={{
                      padding: 20,
                      color: Constants.lightGold,
                      fontSize: 15,
                      textAlign: 'center',
                    }}>
                    We recommend you to add a picture for your mood board for
                    customized specifications. Otherwise: the model has the
                    right to do it in her best way.
                  </Text>
                )} */}
                <FlatList
                  style={{
                    height: Constants.WINDOW_HEIGHT * 0.35,
                    paddingVertical: 10,
                  }}
                  horizontal={true}
                  renderItem={({item, index, separate}) => {
                    return (
                      <ModelPhotoItem
                        itemWidth={Constants.WINDOW_WIDTH * 0.4}
                        item={item}
                        onTapTrash={(id) => {
                          this.onTapTrashPhoto(id);
                        }}
                      />
                    );
                  }}
                  keyExtractor={(item) => item.id}
                  data={this.state.images}
                />
              </View>

              <View style={{height: 45, width: '100%', flexDirection: 'row'}}>
                <OutlineButton
                  title={'Back'}
                  style={{flex: 1}}
                  onPress={this.onTapBack}
                />
                <FillButton
                  title={'Next'}
                  style={{flex: 1, marginLeft: 10}}
                  onPress={this.onTapNext}
                />
              </View>
            </View>
          </ScrollView>

          <ActionSheet
            title={'Pick photo from'}
            titleList={['Camera', 'Photo Library']}
            onTapItem={(index, title) => {
              this.setState({showPickerPhoto: false});
            }}
            onCancel={() => {
              this.setState({showPickerPhoto: false});
            }}
            isShow={this.state.showPickerPhoto}
          />
        </KeyboardAvoidingView>
      </>
    );
  }
}

export default OutfitScreenView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    maxWidth: '100%',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Constants.backColor,
  },
  jobCaption: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 6,
    color: Constants.greyWhite,
  },
  jobDesc: {
    fontSize: 14,
    marginVertical: 3,
    color: Constants.greyWhite,
    paddingLeft: 5,
  },
  card: {
    paddingVertical: 10,
    marginVertical: 5,
    paddingHorizontal: 5,
  },
});
