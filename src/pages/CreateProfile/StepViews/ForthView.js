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

import {
  OutlineButton,
  FillButton,
  PickerButton,
  CheckBox,
} from '../../../components/Buttons';

import {InputOutLine} from '../../../components/Inputs';

const ForthView = ({userRole, onChangeTitle, onChangeProfessional}) => {
  const [title, setTitle] = useState('');
  const [professional, setProfessional] = useState('');

  let totalLen = userRole == UserRole.Model ? 5000 : 100;
  return (
    <View style={{alignItems: 'stretch', width: '100%'}}>
      {userRole == UserRole.Model && (
        <View
          style={{
            flexDirection: 'row',
          }}>
          <TouchableOpacity
            onPress={() => {}}
            style={{paddingTop: 5, marginRight: 10}}>
            <Text style={{color: Constants.lightGold}}>Learn more</Text>
          </TouchableOpacity>
          <Text
            style={{
              fontSize: 13,
              color: Constants.greyWhite,
              marginVertical: 5,
              justifyContent: 'center',
            }}>
            about writing a great profile.
          </Text>
        </View>
      )}

      {userRole == UserRole.Designer && (
        <>
          <Text style={styles.caption}>Brand Name</Text>
          <InputOutLine
            placeholder={''}
            placeholderTextColor={Constants.darkGold}
            onChangeText={(val) => {
              setTitle(val);
              onChangeTitle(val);
            }}
            value={title}
          />
        </>
      )}

      {userRole == UserRole.Model && (
        <>
          <Text style={styles.caption}>Professional Overview</Text>
          <InputOutLine
            placeholder={
              'Highlight your top skills, experience, and interests. This is one of the first things clients will see on your profile.'
            }
            placeholderTextColor={Constants.darkGold}
            onChangeText={(val) => {
              setProfessional(val);
              onChangeProfessional(val);
            }}
            value={professional}
            multiline={true}
            maxLength={5000}
            style={{
              height: 120,
            }}
            numberOfLines={10}
          />
        </>
      )}

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'flex-end',
          marginTop: 0,
        }}>
        <Text style={styles.subTitle}>
          {totalLen - professional.length} characters left
        </Text>
      </View>
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

export default ForthView;
