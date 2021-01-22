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

import {useNavigation, useRoute} from '@react-navigation/native';

import {
  OutlineButton,
  FillButton,
  PickerButton,
  CheckBox,
  ToggleButton,
} from './Buttons';

import PropTypes from 'prop-types';

const SegViews = ({curIndex, titleList, onTapItem}) => {
  const [curItemIndex, setCurItemIndex] = useState(curIndex);

  useEffect(() => {
    setCurItemIndex(curIndex);
  }, [curIndex]);
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'center',
        width: '100%',
        height: 40,
      }}>
      {titleList.map((one, index) => {
        let itemStyle = {};
        if (index == 0) {
          itemStyle = {
            borderTopRightRadius: 0,
            borderBottomRightRadius: 0,
            borderRightWidth: 0,
          };
        } else if (index == titleList.length - 1) {
          itemStyle = {
            borderTopLeftRadius: 0,
            borderBottomLeftRadius: 0,
          };
        } else {
          itemStyle = {
            borderRadius: 0,
            borderRightWidth: 0,
          };
        }

        return (
          <ToggleButton
            key={'' + index}
            title={one}
            selected={curItemIndex == index}
            style={{flex: 1, height: 35, ...itemStyle}}
            onPress={() => {
              setCurItemIndex(index);

              if (onTapItem) {
                onTapItem(one, index);
              }
            }}
          />
        );
      })}
    </View>
  );
};

SegViews.propTypes = {
  curIndex: PropTypes.number,
  titleList: PropTypes.array,
  onTapItem: PropTypes.func,
};

SegViews.defaultProps = {
  curIndex: 0,
  titleList: [],
  onTapItem: (item, index) => {},
};

export default SegViews;
