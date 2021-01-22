import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  Image,
  StatusBar,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import {useNavigation, useRoute} from '@react-navigation/native';
import Constants from '../../../../utils/Constants';
import Utils from '../../../../utils/Utils';
import {
  OutlineButton,
  FillButton,
  PickerButton,
  CheckBox,
  ToggleButton,
} from '../../../../components/Buttons';
import Divider from '../../../../components/Divider';
import HeaderBar from '../../../../components/HeaderBar';

import PropTypes from 'prop-types';

import {InputOutLine} from '../../../../components/Inputs';
import LocationListItem from './LocationListItem';

import CountryPicker from '../../../../components/CountryPicker';
import PickerModal, {CountryList} from '../../../../components/PickerModal';

const NameProject = ({onBack, onNext}) => {
  const [name, setName] = useState(null);
  const [country, setCountry] = useState(CountryList[0]);

  const onTapSubmit = () => {};

  const onTapBack= ()=>{

    if(onBack){
      onBack()
    }
  }

  const onTapNext = ()=>{

    if(onNext){
      onNext(name, country)      
    }
  }

  return (
    <View style={{flex: 1, width: '100%'}}>
      <View style={{flex: 1}}>
        <View
          style={{
            flexDirection: 'row',
            marginVertical: 10,
          }}>
          <Text style={styles.jobCaption}>Name your project</Text>
        </View>
        <InputOutLine
          placeholder={''}
          onChangeText={(val) => {
            setName(val);
          }}
          value={name ?? ''}
          style={{}}
          onSubmitEditing={onTapSubmit}
        />

        <Text style={styles.jobCaption}>Here are some good examples.</Text>
        <Text style={styles.jobDesc}>
          {'\u2B24'}{'  '}I needed a professional contact creator.
        </Text>
        <Text style={styles.jobDesc}>
          {'\u2B24'}{'  '}Looking for a talented model for my collections.
        </Text>

        <View
          style={{
            flexDirection: 'row',
            marginVertical: 10,
          }}>
          <Text style={styles.jobCaption}>Country</Text>
        </View>
        <CountryPicker
          style={{}}
          onChangeCountry={(val) => {setCountry(val)}}
          initVal={CountryList[0]}
        />
      </View>

      <View style={{height: 45, width: '100%', flexDirection: 'row'}}>
        <OutlineButton
          title={'Back'}
          style={{flex: 1}}
          onPress={onTapBack}
        />
        <FillButton
          title={'Next'}
          style={{flex: 1, marginLeft: 10}}
          onPress={onTapNext}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  jobCaption: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 6,
    color: Constants.greyWhite,
  },
  jobDesc: {
    fontSize: 14,
    marginVertical: 6,
    color: Constants.greyWhite,
    paddingLeft: 10,
  },
  card: {
    paddingVertical: 10,
    marginVertical: 5,
    paddingHorizontal: 5,
  },
});

export default NameProject;
