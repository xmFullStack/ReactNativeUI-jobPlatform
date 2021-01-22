import React, {useEffect} from 'react';
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

import {useNavigation, useRoute} from '@react-navigation/native';
import Constants, {UserRole} from '../../../../../utils/Constants';
import {
  OutlineButton,
  FillButton,
  PickerButton,
  CheckBox,
  ToggleButton,
} from '../../../../../components/Buttons';
import Divider from '../../../../../components/Divider';
import HeaderBar from '../../../../../components/HeaderBar';
import JobItem, {
  FakeJobClosed,
  FakeJobItem,
  FakeJobItemOpen,
  FakeJobItemProgress,
} from '../JobItem';
import Feather from 'react-native-vector-icons/Feather';
import EmptyItem from '../EmptyItem';

const DesignerIndex = ({}) => {
  const navigation = useNavigation();
  const route = useRoute();


  const onTapRehire = ()=>{
    navigation.navigate('rehire', {})
  }

  const onTapPost = ()=>{
    navigation.navigate('post', {})
  }

  const onTapPostingsItem = ()=>{
    navigation.navigate('project_manage', {})
  }

  return (
    <>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingVertical: 10,
        }}>
        <Text
          style={{
            color: Constants.greyWhite,
            fontSize: 20,
            fontWeight: 'bold',
          }}>
          Toly. H
        </Text>
      </View>
      <View
        style={{
          width: '100%',
          paddingVertical: 10,
        }}>
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            padding: 10,
            justifyContent: 'space-between',
            width: '100%',
          }}          
          onPress={onTapPostingsItem}>
          <Text
            style={{
              fontSize: 18,
              color: Constants.darkGold,
            }}>
            Postings (3)
          </Text>
          <Feather
            name={'chevron-right'}
            size={18}
            color={Constants.darkGold}
          />
        </TouchableOpacity>

        <View
          style={{
            flexDirection: 'row',
            padding: 10,
            justifyContent: 'space-between',
            width: '100%',
          }}>
          <OutlineButton
            title={'Rehire'}
            onPress={onTapRehire}
            style={{flex: 1, marginRight: 10}}
          />
          <FillButton
            title={'Post Project'}
            onPress={onTapPost}
            style={{flex: 1}}
          />
        </View>
      </View>
    </>
  );
};

export default DesignerIndex;
