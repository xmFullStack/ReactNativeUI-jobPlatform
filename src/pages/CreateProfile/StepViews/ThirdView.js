import React, {useEffect, useState} from 'react';
import {SafeAreaView, StyleSheet, ScrollView, View, Text} from 'react-native';

import Constants from '../../../utils/Constants';
import {
  OutlineButton,
  FillButton,
  PickerButton,
  CheckBox,
} from '../../../components/Buttons';
import {InputOutLine} from '../../../components/Inputs';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';

const ThirdView = ({
  hourlyRate = 0.0,
  onChangeHourlyRate,
  fee = 0.0,
  onChangeFee,
  receive = 0.0,
  onChangeReceive,
}) => {
  return (
    <View style={{alignItems: 'stretch', width: '100%'}}>
      <Text
        style={{fontSize: 13, color: Constants.greyWhite, marginVertical: 5}}>
        Designers will see this rate on your profile and in search results once
        you publish your profile. You can adjust your rate every time you submit
        proposal.
      </Text>
      <Text style={styles.caption}>Per Outfit</Text>
  
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <InputOutLine
          icon={
            <Feather name="dollar-sign" color={Constants.darkGold} size={15} />
          }
          style={{width: Constants.WINDOW_WIDTH * 0.5}}
          placeholder={''}
          placeholderTextColor={Constants.darkGold}
          onChangeText={(val) => {
            onChangeHourlyRate(val);
          }}
          value={'' + hourlyRate}
        />
       
      </View>

      {/* <Text style={styles.caption}>Per Photo</Text>
     
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <InputOutLine
          icon={
            <Feather name="dollar-sign" color={Constants.darkGold} size={15} />
          }
          style={{width: Constants.WINDOW_WIDTH * 0.5}}
          placeholder={''}
          placeholderTextColor={Constants.darkGold}
          onChangeText={(val) => {
            onChangeFee(val);
          }}
          value={'' + fee}
        />
      
      </View>

      <Text style={styles.caption}>Per Video</Text>
     
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <InputOutLine
          icon={
            <Feather name="dollar-sign" color={Constants.darkGold} size={15} />
          }
          style={{width: Constants.WINDOW_WIDTH * 0.5}}
          placeholder={''}
          placeholderTextColor={Constants.darkGold}
          onChangeText={(val) => {
            onChangeReceive(val);
          }}
          value={'' + receive}
        />
       
      </View> */}
    </View>
  );
};

const styles = StyleSheet.create({

  caption: {
    fontSize: 20,
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

export default ThirdView;
