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

import Constants from '../../../utils/Constants';
import {
  OutlineButton,
  FillButton,
  PickerButton,
  CheckBox,
} from '../../../components/Buttons';
import {InputOutLine} from '../../../components/Inputs';

const UserProfile = require('../../../../assets/default_avatar.png');
const logoImage = require('../../../../assets/logo.png');

const CompleteView = ({onSubmit}) => {





  return (
    <View style={{alignItems: 'stretch', width: '100%'}}>
      <Text style={styles.caption}>Preview profile</Text>
      <View
        style={{
          alignItems: 'center',
        }}>
        <Image style={styles.logoImage} source={logoImage} />
      </View>

      <Text style={styles.caption}>Looking good, XXxxxx!</Text>
      <Text style={styles.subTitle}>
        Make any necessary edits and then submit your profile. You can still
        edit it after you submit it.
      </Text>

      <FillButton
        title="Submit Profile"
        style={{marginVertical: 10}}
        onPress={() => {
          if(onSubmit){
            onSubmit()
          }
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  
  logoImage: {
    width: Constants.WINDOW_WIDTH * 0.5,
    height: Constants.WINDOW_WIDTH * 0.5,
    resizeMode: 'contain',
  },

 
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

export default CompleteView;
