import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  Dimensions,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { initialWindowSafeAreaInsets } from 'react-native-safe-area-context';
import Constants from '../utils/Constants';

export default function Divider({title, style, color}) {


  let lineStyle = {...styles.line, backgroundColor: color ?? Constants.darkGold};


  return (
    <View style={{...styles.container, ...style}}>
      <View style={lineStyle}></View>
      {title && <Text style={styles.text}>{title}</Text>}

      <View style={lineStyle}></View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Constants.backColor,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  line: {
    flex: 1,
    height: 0.5,
    
  },
  text: {
    color: Constants.darkGold,
    fontSize: 15,
    fontStyle: 'italic',
    paddingHorizontal: 10,
  },
});
