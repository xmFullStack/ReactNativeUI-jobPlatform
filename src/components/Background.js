import React, { memo } from 'react';
import {
  ImageBackground,
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView,
} from 'react-native';
import Constants from '../utils/Constants';

const Background = ({ children }) => (
  <ImageBackground
    source={require('../../assets/splash.png')}
    resizeMode='cover'
    style={styles.background}
    >
    <KeyboardAvoidingView style={styles.container} behavior="padding">
       {children}
    </KeyboardAvoidingView>

  </ImageBackground>
);

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    color: Constants.backColor
  },
  
  container: {
    flex: 1,
    padding: 20,
    width: '100%',
    maxWidth: '100%',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default memo(Background);
