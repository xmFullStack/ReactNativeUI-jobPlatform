import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Image,
} from 'react-native';

import Constants, {UserRole} from '../../../utils/Constants';
import {
  OutlineButton,
  FillButton,
  PickerButton,
  CheckBox,
} from '../../../components/Buttons';
import {InputOutLine} from '../../../components/Inputs';

import ActionSheet from '../../../components/ActionSheet';

const UserProfile = require('../../../../assets/default_avatar.png');
const DefaultImg = require('../../../../assets/default.jpg')


const FifthView = ({userRole, onChangeProfile}) => {
  const [title, setTitle] = useState('');
  const [professional, setProfessional] = useState('');

  const [isShowPicker, setIsShowPicker] = useState(false);

  const titleDesc = (userRole == UserRole.Designer
    ? 'Please upload the brand picture or your logo.'
    : 'Please upload the best picture for your profile.');

    const defLogo = userRole == UserRole.Designer ? DefaultImg : UserProfile
  
    const btnTitle = userRole == UserRole.Designer ? '+ Add Brand Picture' : '+ Add Profile Photo'

  return (
    <>
      <View style={{alignItems: 'stretch', width: '100%'}}>
        <Text style={styles.subTitle}>{titleDesc}</Text>
        <View
          style={{
            padding: 20,
            alignItems: 'center',
            justifyContent: 'center',
            height: 200,
          }}>
          <Image
            source={defLogo}
            resizeMode={'contain'}
            style={{flex: 1}}
          />
        </View>
        <OutlineButton
          title={btnTitle}
          style={{marginVertical: 10}}
          onPress={() => {
            setIsShowPicker(true);
          }}
        />
      </View>
      <ActionSheet
        title={'Pick photo from'}
        titleList={['Camera', 'Photo Library']}
        onTapItem={(index, title) => {
          setIsShowPicker(false);
        }}
        onCancel={() => {
          setIsShowPicker(false);
        }}
        isShow={isShowPicker}
      />
    </>
  );
};

const styles = StyleSheet.create({
  caption: {
    fontSize: 15,
    fontWeight: 'bold',
    color: Constants.greyWhite,
    marginVertical: 10,
  },
  subTitle: {
    fontSize: 15,
    color: Constants.greyWhite,
    marginVertical: 10,
  },
});

export default FifthView;
