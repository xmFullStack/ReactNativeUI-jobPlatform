import React, {useEffect, useState, useRef} from 'react';
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
import Feather from 'react-native-vector-icons/Feather';
import {useNavigation, useRoute} from '@react-navigation/native';
import ActionSheet from '../../../../components/ActionSheet';
import Constants from '../../../../utils/Constants';

import {
    OutlineButton,
    FillButton,
    PickerButton,
    CheckBox,
    ToggleButton,
  } from '../../../../components/Buttons';

const EmptyItem = ({description, onPress, buttonTitle}) => {
  return (
    <View style={styles.itemContainer}>
      <Feather name="shopping-bag" size={55} color={Constants.greyWhite} />
      <Text style={styles.description}>{description}</Text>

      <FillButton title={buttonTitle} onPress={onPress}/>
    </View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    paddingHorizontal: 8,
    paddingVertical: 5,
    marginVertical: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },

  description: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginVertical: 6,
    alignItems: 'center',
    justifyContent: 'center',
    color: Constants.greyWhite,
    fontSize: 16,
    textAlign:'center'
  },
});

export default EmptyItem;
