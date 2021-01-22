import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Image,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {useNavigation, useRoute} from '@react-navigation/native';

import Constants, {UserRole} from '../utils/Constants';
const logoImage = require('../../assets/logo.png');
import Divider from './Divider';
import HeaderBar from './HeaderBar';
import {
  OutlineButton,
  FillButton,
  PickerButton,
  CheckBox,
} from './Buttons';

import {InputOutLine} from './Inputs';
import PickerModal, {CountryList} from './PickerModal';

const CountryPicker = ({style={}, onChangeCountry, initVal = CountryList[0]}) => {

  const [country, setCountry] = useState(initVal);
  const [showCountryPicker, setShowCountryPicker] = useState(false);

  return (
    <>
      <PickerButton
        title={country}
        style={{
          color: Constants.darkGold,
          marginTop: 10,
          ...style
        }}
        onPress={() => {
          setShowCountryPicker(true);
        }}
        leftIcon={
          <FontAwesome name={'globe'} size={18} color={Constants.darkGold} />
        }
        rightIcon={
          <FontAwesome
            name={'caret-down'}
            size={13}
            color={Constants.darkGold}
          />
        }
        isOutline={true}
      />
      <PickerModal
        isShow={showCountryPicker}
        pickList={CountryList}
        onTapSelect={(index, val) => {
          setCountry(val)
          setShowCountryPicker(false)
          onChangeCountry(val)
        }}
        onTapClose={() => {
          setShowCountryPicker(false)         
        }}
      />
    </>
  );
};


export default CountryPicker;