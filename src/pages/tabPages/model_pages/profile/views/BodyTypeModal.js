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
} from '../../../../../utils/Constants';
import {InputOutLine} from '../../../../../components/Inputs';
import ModelDetailView from '../../../post/views/ModelDetailView';
import {Provider, connect, useDispatch, useSelector} from 'react-redux';
const defaultAvatar = require('../../../../../../assets/default_avatar.png');

import {
  NavigationContext,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import HeaderBar from '../../../../../components/HeaderBar';

import VideoPlayerModal from '../../../../../components/VideoPlayerModal';
import ActionSheet from '../../../../../components/ActionSheet';

import {uploadsHostUrl} from '../../../../../utils/RestAPI';
import {FillButton} from '../../../../../components/Buttons';

const EditIcon = (
  <Feather name={'edit-2'} color={Constants.darkGold} size={15} />
);
const RightIcon = (
  <Feather name="chevron-right" size={20} color={Constants.darkGold} />
);
const LeftIcon = (
  <Feather name="chevron-left" size={20} color={Constants.darkGold} />
);

const BodyTypeModal = ({
  isShow = false,

  initHip = 100,
  initWaist = 100,
  onSubmit,
  onClose,
}) => {
  const [hip, setHip] = useState(initHip);
  const [waist, setWaist] = useState(initWaist);

  useEffect(() => {
    setWaist(initWaist);
  }, [initWaist]);

  useEffect(() => {
    setHip(initHip);
  }, [initHip]);

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
          title={''}
          isShowLeft={false}
          isShowRight={true}
          rightIcon={
            <Feather name={'x'} size={20} color={Constants.darkGold} />
          }
          onRightButton={onClose}
        />
        <View
          style={{paddingHorizontal: 15, width: '100%', alignItems: 'stretch'}}>
          <View style={{marginVertical: 20}}>
            <Text style={{color: Constants.greyWhite, fontSize: 25}}>
              How about your body type?
            </Text>
          </View>

          <Text style={{color: Constants.greyWhite, fontSize: 20}}>Waist</Text>
          <View
            style={{
              width: '100%',
              paddingLeft: 10,
              marginTop: 20,
              marginBottom: 15,
            }}>
            <Text style={{color: Constants.darkGold, fontSize: 20}}>
              {waist + ' '} inch
            </Text>
          </View>

          <Slider
            style={{width: '100%', height: 40}}
            minimumValue={50}
            maximumValue={200}
            thumbTintColor={Constants.white}
            minimumTrackTintColor={Constants.darkGold}
            maximumTrackTintColor={Constants.lightGold}
            step={1}
            value={waist}
            onValueChange={(val) => {
              setWaist(val);
            }}
          />

          <Text style={{color: Constants.greyWhite, fontSize: 20}}>Hip</Text>
          <View
            style={{
              width: '100%',
              paddingLeft: 10,
              marginTop: 20,
              marginBottom: 15,
            }}>
            <Text style={{color: Constants.darkGold, fontSize: 20}}>
              {hip + ' '} inch
            </Text>
          </View>

          <Slider
            style={{width: '100%', height: 40}}
            minimumValue={50}
            maximumValue={200}
            thumbTintColor={Constants.white}
            minimumTrackTintColor={Constants.darkGold}
            maximumTrackTintColor={Constants.lightGold}
            step={1}
            value={hip}
            onValueChange={(val) => {
              setHip(val);
            }}
          />

          <FillButton
            title={'Submit'}
            onPress={() => {
              if (onSubmit) {
                onSubmit(hip, waist);
              }
            }}
            style={{marginVertical: 10, paddingHorizontal: 10}}
          />
        </View>
      </View>
    </Modal>
  );
};

export default BodyTypeModal;
