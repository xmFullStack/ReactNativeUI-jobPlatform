import React, {useEffect, useState, useRef} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';

import Constants, { UserRole } from '../../../utils/Constants';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {
  OutlineButton,
  FillButton,
  PickerButton,
  CheckBox,
} from '../../../components/Buttons';

import {InputOutLine} from '../../../components/Inputs';
import PhoneInput from 'react-native-phone-input';

const SeventhView = ({}) => {
  const phoneRef = useRef();

  const [phone, setPhone] = useState('');
  const [countryCode, setCountryCode] = useState('');

  useEffect(()=>{

      setPhone('+'+countryCode)
  }, [countryCode])

  const desc = global.curUser.role == UserRole.Model ? ' Your phone number will not be shared with designers.' : ' Your phone number will not be shared with others. It is only for the faster reach in urgent situations.'
  return (
    <View style={{alignItems: 'stretch', width: '100%'}}>
      <Text style={styles.caption}>Add your phone number</Text>

      <View
        style={{
          borderRadius: 5,
          borderWidth: 1,
          borderColor: Constants.darkGold,
          padding: 10,
          marginBottom: 10,
        }}>
        <PhoneInput
          ref={phoneRef}
          textStyle={{color: Constants.lightGold}}
          value={phone}
          onSelectCountry={(iso2)=>{
            
            setCountryCode(phoneRef.current.getCountryCode())

          }}
          onChangePhoneNumber={(number)=>{
            setPhone(number)
            
          }}
        />
      </View>
      <Text style={styles.subTitle}>
       {desc}
      </Text>
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

export default SeventhView;
