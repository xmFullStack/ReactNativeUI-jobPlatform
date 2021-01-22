import React, {useEffect, useState} from 'react';
import {SafeAreaView, StyleSheet, ScrollView, View, Text} from 'react-native';

import Constants from '../../../utils/Constants';
import {
  OutlineButton,
  FillButton,
  PickerButton,
  CheckBox,
} from '../../../components/Buttons';

const SecondView = ({}) => {
  return (
    <View style={{alignItems: 'stretch', width: '100%'}}>
      <Text style={styles.caption}>
        To get noticed and outstand the competition
      </Text>
      <Text
        style={{fontSize: 13, color: Constants.greyWhite, marginVertical: 5}}>
        Connect your Instagram account with your profile to import your best
        pictures and to present a clear reflection of your experience.
      </Text>
      <OutlineButton
        title="+ Connect Instagram"
        style={{marginVertical: 10}}
        onPress={() => {}}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  caption: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Constants.greyWhite,
    marginBottom: 10,
  },
  subTitle: {
    fontSize: 15,
    color: Constants.greyWhite,
    marginVertical: 10,
  },
});

export default SecondView;
