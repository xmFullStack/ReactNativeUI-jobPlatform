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
import {useNavigation, useRoute} from '@react-navigation/native';
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

const ProfileView = ({model}) => {
  const [videoFullShow, setVideoFullShow] = useState(false);
  const navigation = useNavigation();

  const onTapPublicView = () => {
    navigation.navigate('model_public_profile');
  };

  return (
    <View>
      <View style={{flexDirection: 'row', marginTop: 5}}>
        <TouchableOpacity
          style={{
            width: Constants.WINDOW_WIDTH * 0.6 + 5,
            height: Constants.WINDOW_WIDTH * 0.6 + 5,
          }}
          onPress={() => {
            onTapPublicView(true);
          }}>
          <Image
            style={{
              width: '100%',
              height: Constants.WINDOW_WIDTH * 0.6,
              marginBottom: 5,
              borderRadius: 5,
            }}
            resizeMode={'cover'}
            source={require('../../../../../assets/style3.jpg')}
          />
        </TouchableOpacity>
        <View style={{flex: 1, marginLeft: 5}}>
          <Image
            style={{
              width: '100%',
              height: Constants.WINDOW_WIDTH * 0.3,
              marginBottom: 5,
              borderRadius: 5,
            }}
            resizeMode={'cover'}
            source={require('../../../../../assets/style2.jpg')}
          />
          <Image
            style={{
              width: '100%',
              height: Constants.WINDOW_WIDTH * 0.3,
              borderRadius: 5,
            }}
            resizeMode={'cover'}
            source={require('../../../../../assets/style2.jpg')}
          />
        </View>
      </View>
      <View style={{flexDirection: 'row', marginTop: 5}}>
        <Image
          style={{
            width: Constants.WINDOW_WIDTH * 0.3,
            height: Constants.WINDOW_WIDTH * 0.3,
            marginBottom: 5,
            borderRadius: 5,
            marginRight: 5,
          }}
          resizeMode={'cover'}
          source={require('../../../../../assets/style2.jpg')}
        />
        <Image
          style={{
            width: Constants.WINDOW_WIDTH * 0.3,
            height: Constants.WINDOW_WIDTH * 0.3,
            borderRadius: 5,
            marginRight: 5,
          }}
          resizeMode={'cover'}
          source={require('../../../../../assets/style2.jpg')}
        />
        <Image
          style={{
            width: Constants.WINDOW_WIDTH * 0.3,
            height: Constants.WINDOW_WIDTH * 0.3,
            marginBottom: 5,
            borderRadius: 5,
          }}
          resizeMode={'cover'}
          source={require('../../../../../assets/style2.jpg')}
        />
      </View>

      <View
        style={{
          marginBottom: 10,
          marginTop: 10,
          width: '100%',
        }}>
        {/* <View style={{marginVertical: 5}}>

          <Text style={styles.description}>
            this is description for model, this is description for model this is
            description for model
          </Text>
        </View> */}
        {/* <View style={{marginVertical: 5}}>
          <Text style={styles.label}>Work and Education</Text>
          <Text style={styles.description}>
            this is description for model, this is description for model this is
            description for model
          </Text>
        </View> */}
        {/* <View style={{marginVertical: 5}}>
          <Text style={styles.label}>
            Experience:{' '}
            <Text style={styles.labelValue}>{model?.experience} years</Text>
          </Text>
        </View> */}
        {/* <View
          style={{
            flexDirection: 'row',
            marginVertical: 5,
          }}> */}
          {/* <View style={{flex: 1}}>
            <View style={{flexDirection: 'row'}}>
              <Text style={styles.label}>Height:</Text>
              <Text style={styles.labelValue}>{model?.height} in</Text>
            </View>

            <View style={{flexDirection: 'row'}}>
              <Text style={styles.label}>Waist:</Text>
              <Text style={styles.labelValue}>{model?.waist} in</Text>
            </View>
          </View>
          <View style={{flex: 1}}>
            <View style={{flexDirection: 'row'}}>
              <Text style={styles.label}>Hip:</Text>
              <Text style={styles.labelValue}>{model?.hip} in</Text>
            </View>

            <View style={{flexDirection: 'row'}}>
              <Text style={styles.label}>Bust: </Text>
              <Text style={styles.labelValue}>{model?.bust} in</Text>
            </View>
          </View> */}
          <View style={{marginVertical: 5}}>
            <Text style={{color: Constants.greyWhite, fontSize: 14}}>
              This is description for model, This is description for model, This
              is description for model,
            </Text>
          </View>
          <View style={styles.bodyRow}>
            <View style={{width: 30, alignItems: 'center'}}>
              <FontAwesome5 name="ruler" size={18} color={Constants.white} />
            </View>
            <Text style={{...styles.label, marginHorizontal: 5}}>Height</Text>
            <View
              style={{
                flexDirection: 'row',
                flex: 1,
                marginLeft: 10,
                alignItems: 'flex-end',
              }}>
              <Text style={styles.labelValue}>170 cm</Text>
            </View>
          </View>

          <View style={styles.bodyRow}>
            <View style={{width: 30, alignItems: 'center'}}>
              <FontAwesome5 name="child" size={18} color={Constants.white} />
            </View>

            <Text style={{...styles.label, marginHorizontal: 5}}>
              Body type:
            </Text>
          </View>
          <View style={styles.bodyRow}>
            <View style={{width: 30, alignItems: 'center'}}></View>

            <Text style={{...styles.label, marginHorizontal: 5}}>Waist:</Text>

            <View
              style={{
                flexDirection: 'row',
                marginLeft: 10,
                flex: 1,
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
                flex: 1,
                alignItems: 'flex-end',
              }}>
              <Text style={styles.labelValue}>100 cm</Text>
            </View>
          </View>

          <View style={styles.bodyRow}>
            <View style={{width: 30, alignItems: 'center'}}>
              <FontAwesome5 name="language" size={18} color={Constants.white} />
            </View>
            <Text style={{...styles.label, marginHorizontal: 5}}>
              Language:
            </Text>
            <View
              style={{
                flexDirection: 'row',
                marginLeft: 10,
                flex: 1,
                alignItems: 'flex-end',
              }}>
              <Text style={styles.labelValue}>Spanish</Text>
            </View>
          </View>
        {/* </View> */}
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
    </View>
  );
};

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
  bodyRow: {flexDirection: 'row', alignItems: 'center', marginVertical: 10},
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
    color: Constants.greyWhite,
    marginVertical: 2,
    fontSize: 16,
    fontWeight: 'bold',
  },
  description: {
    color: Constants.greyWhite,
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

export default ProfileView;
