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

const LangList = [
  'English',
  'Norwegian Bokmal',
  'Finnish',
  'German',
  'French',
  'Spanish',
  'Italian',
  'Portuguess',
];

const LangModal = ({
  isShow = false,

  initLang = '',

  onSubmit,
  onClose,
}) => {
  const [curLang, setCurLang] = React.useState(initLang);

  useEffect(() => {
    setCurLang(initLang);
  }, [initLang]);

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
          <View style={{marginVertical: 10}}>
            <Text style={{color: Constants.greyWhite, fontSize: 20}}>
              What languages do you speak?
            </Text>
          </View>

          <FlatList
            data={LangList}
            keyExtractor={(item, index) => '' + index}
            renderItem={({item, index, sep}) => {
              const isSel = curLang == item;
              const borderColor = isSel
                ? Constants.darkGold
                : Constants.transparent;

              return (
                <TouchableOpacity
                  style={{
                    width: Constants.WINDOW_WIDTH * 0.9,
                    height: 40,
                    borderColor: borderColor,
                    borderWidth: 1,
                    borderRadius: 4,
                    paddingHorizontal: 20, 
                    justifyContent:'center',
                  }}
                  onPress={() => {
                    setCurLang(item);
                  }}>
                  <Text style={{color: isSel ? Constants.darkGold : Constants.greyWhite}}>{item}</Text>
                </TouchableOpacity>
              );
            }}
          />

          <FillButton
            title={'Submit'}
            onPress={()=>{onSubmit(curLang)}}
            style={{marginVertical: 10}}
          />
        </View>
      </View>
    </Modal>
  );
};

export default LangModal;
