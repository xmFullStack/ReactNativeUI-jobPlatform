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
import StyleListItem from './StyleListItem'

const StyleSelect = ({styleList, onSelectLocation}) => {
  const [style, setStyle] = useState(null);

  return (
    <View style={{flex: 1}}>
      <View
        style={{
          flexDirection: 'row',
          marginVertical: 10,
        }}>
        <Text style={styles.jobCaption}>Select Style</Text>
      </View>

      <View
        style={{
          flex: 1,
          width: '100%',
          flexDirection: 'column',
          alignItems: 'center',
        }}>
        <FlatList
          style={{
            width: '100%',
            paddingLeft: 10,
            paddingRight: 10,
          }}
          data={styleList}
          renderItem={({item}) => (
            <StyleListItem
              item={item}
              onStyleItemShow={(selectedItem) => {
                setStyle(selectedItem);
                if(onSelectLocation){
                    onSelectLocation(selectedItem)
                }
              }}
            />
          )}
          numColumns={1}
          keyExtractor={(_item, index) => index.toString()}
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
});

export default StyleSelect;
