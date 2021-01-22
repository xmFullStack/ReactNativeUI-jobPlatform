import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';

import Constants, {UserRole} from '../../../utils/Constants';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {
  OutlineButton,
  FillButton,
  PickerButton,
  CheckBox,
} from '../../../components/Buttons';
import PickerModal, {CountryList} from '../../../components/PickerModal';
import {InputOutLine} from '../../../components/Inputs';

const SixthView = ({}) => {
  const [title, setTitle] = useState('');
  const [addr, setAddr] = useState('');
  const [apt, setApt] = useState('');
  const [country, setCountry] = useState('');
  const [city, setCity] = useState('');
  const [postCode, setPostCode] = useState('');
  const [showCountryPicker, setShowCountryPicker] = useState('');

  const titleDesc =
    global.curUser.role == UserRole.Model
      ? 'We take your privacy very seriously. Only your city and country will be shown to designers.'
      : 'We take your privacy very seriously. Only your city and country will be shown to Models.';

  return (
    <View style={{alignItems: 'stretch', width: '100%'}}>
      <Text style={styles.caption}>Where are you based?</Text>
      <Text style={styles.subTitle}>{titleDesc}</Text>

      <Text style={styles.caption}>Country</Text>
      <PickerButton
        title={country}
        style={{
          color: Constants.lightGold,
          marginTop: 10,
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

      <Text style={styles.caption}>Street Address</Text>
      <InputOutLine
        placeholder={''}
        placeholderTextColor={Constants.darkGold}
        onChangeText={(val) => {
          setAddr(val);
        }}
        value={addr}
      />
      <InputOutLine
        placeholder={'Apt/Suit'}
        placeholderTextColor={Constants.darkGold}
        onChangeText={(val) => {
          setApt(val);
        }}
        value={apt}
      />

      <Text style={styles.caption}>City</Text>
      <InputOutLine
        icon={
          <FontAwesome name="search" size={13} color={Constants.darkGold} />
        }
        placeholder={''}
        placeholderTextColor={Constants.darkGold}
        onChangeText={(val) => {
          setCity(val);
        }}
        value={city}
      />

      <Text style={styles.caption}>Zip/Postal Code</Text>
      <InputOutLine
        placeholder={''}
        placeholderTextColor={Constants.darkGold}
        onChangeText={(val) => {
          setPostCode(val);
        }}
        value={postCode}
      />

      <PickerModal
        isShow={showCountryPicker}
        pickList={CountryList}
        onTapSelect={(index, val) => {
          setCountry(val);
          setShowCountryPicker(false);
        }}
        onTapClose={() => {
          setShowCountryPicker(false);
        }}
      />
    </View>
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

export default SixthView;
