import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  ImageBackgroundComponent,
} from 'react-native';
import Constants from '../utils/Constants';

const ProgressStep = ({style, totalCount, value}) => {
  let width = style?.width ?? '100%';
  let height = style?.height ?? 3;

  let arr = new Array(totalCount).fill(1);

  return (
    <View
      style={{
        flexDirection: 'row',
        width: width,
        height: height,
        ...style,
      }}>
      {arr.map((one, index) => {
        let backColor =
          index < value ? Constants.lightGold : Constants.darkGold;

        return (
          <View
            key={'' + index}
            style={{
              flex: 1,
              height: height,
              backgroundColor: backColor,
            }}></View>
        );
      })}
    </View>
  );
};

export default ProgressStep;
