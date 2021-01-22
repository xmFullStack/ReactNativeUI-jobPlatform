import React, {useEffect} from 'react';
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
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {useNavigation, useRoute} from '@react-navigation/native';

import Constants from '../utils/Constants';
const logoImage = require('../../assets/logo.png');
import Divider from '../components/Divider';
import HeaderBar from '../components/HeaderBar';
const googleLogo = require('../../assets/google_logo.png');
const fbLogo = require('../../assets/fb-logo.png');

export const CheckButton = ({
  title,
  style,
  onChange,
  isChecked = false,
  selColor = Constants.darkGold,
  defColor = Constants.greyWhite,
}) => {
  let height = style?.height ?? 40;

  let width = style?.width ?? '100%';
  let iconWidth = style?.iconWidth ?? 15;
  let fontSize = style?.fontSize ?? 15;
  let color = style?.color ?? Constants.greyWhite;

  let radius = iconWidth / 2;

  const [checked, setChecked] = React.useState(isChecked);

  React.useEffect(()=>{
    setChecked(isChecked)
  }, [isChecked])

  return (
    <TouchableOpacity
      style={{
        width: width,
        height: height,
        justifyContent: 'center',
        alignItems:'center',
        flexDirection: 'row',
        ...style,
      }}
      onPress={() => {
        onChange(!checked)
        setChecked(!checked);
      }}>
      {checked ? (
        <View
          style={{
            width: iconWidth,
            height: iconWidth,
            borderRadius: radius,
            backgroundColor: selColor,
            borderWidth: 2,
            borderColor: selColor,
          }}></View>
      ) : (
        <View
          style={{
            width: iconWidth,
            height: iconWidth,
            borderRadius: radius,
            borderWidth: 2,
            // backgroundColor: defColor,
            borderColor: Constants.greyWhite,
          }}></View>
      )}

      <Text
        style={{
          fontSize: fontSize,
          color: color,
          flex: 1,
          marginLeft: 10,
        }}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export const FillButton = ({title, style, onPress}) => {
  let height = style?.height ?? 40;

  let width = style?.width ?? '100%';
  let fontSize = style?.fontSize ?? 15;
  let color = style?.color ?? 'black';

  return (
    <TouchableOpacity
      style={{
        width: width,
        height: height,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Constants.darkGold,
        borderRadius: 5,
        ...style,
      }}
      onPress={onPress}>
      <Text
        style={{
          fontSize: fontSize,
          color: color,
        }}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export const OutlineButton = ({title, style, onPress}) => {
  let height = style?.height ?? 40;

  let width = style?.width ?? '100%';
  let fontSize = style?.fontSize ?? 15;
  let color = style?.color ?? Constants.darkGold;

  return (
    <TouchableOpacity
      style={{
        width: width,
        height: height,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: Constants.darkGold,
        borderWidth: 1,
        borderRadius: 5,
        ...style,
      }}
      onPress={onPress}>
      <Text
        style={{
          fontSize: fontSize,
          color: color,
        }}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export const AppleButton = ({onPress}) => {
  return (
    <TouchableOpacity style={styles.appleButton} onPress={onPress}>
      <Text style={styles.appleTitle}>
        <FontAwesome name="apple" size={18} color={Constants.black} />
        {'  '}
        Sign in with Apple
      </Text>
    </TouchableOpacity>
  );
};

export const GoogleButton = ({onPress}) => {
  return (
    <TouchableOpacity style={styles.googleButton} onPress={onPress}>
      <View
        style={{
          height: 36,
          width: 36,
          backgroundColor: Constants.white,
          position: 'absolute',
          left: 2,
          top: 2,
          borderRadius: 5,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Image source={googleLogo} style={{width: 30, height: 30}}></Image>
      </View>
      <Text style={styles.googleTitle}>Sign in with Google</Text>
    </TouchableOpacity>
  );
};

export const FBButton = ({onPress}) => {
  return (
    <TouchableOpacity style={styles.FBButton} onPress={onPress}>
      <View
        style={{
          height: 36,
          width: 36,
          // backgroundColor: Constants.white,
          position: 'absolute',
          left: 2,
          top: 2,
          borderRadius: 5,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Image source={fbLogo} style={{width: 30, height: 30}}></Image>
      </View>
      <Text style={styles.googleTitle}>Sign in with Facebook</Text>
    </TouchableOpacity>
  );
};

export const PickerButton = ({
  title,
  style,
  onPress,
  leftIcon,
  rightIcon,
  isOutline = false,
}) => {
  let height = style?.height ?? 40;

  let width = style?.width ?? '100%';
  let fontSize = style?.fontSize ?? 15;
  let color = style?.color ?? Constants.darkGold;

  let outlineStyle = {
    backgroundColor: Constants.darkGold,
  };

  if (isOutline) {
    outlineStyle = {
      borderColor: Constants.darkGold,
      borderWidth: 1,
    };
    color = style?.color ?? Constants.black;
  }

  return (
    <TouchableOpacity
      style={{
        flexDirection: 'row',

        width: width,
        height: height,
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        ...outlineStyle,
        borderRadius: 5,
        ...style,
      }}
      onPress={onPress}>
      {leftIcon}
      <Text
        style={{
          fontSize: fontSize,
          color: color,
          flex: 1,
          paddingHorizontal: 10,
        }}>
        {title}
      </Text>
      {rightIcon}
    </TouchableOpacity>
  );
};

export const CheckBox = ({
  title,
  style,
  checked,
  checkColor = Constants.black,
  onChange,
}) => {
  let width = style?.width ?? '100%';
  let fontSize = style?.fontSize ?? 15;
  let color = style?.color ?? Constants.darkGold;

  const CheckedIcon = (
    <FontAwesome name="check-square" size={20} color={checkColor} />
  );
  const emptyIcon = (
    <View
      style={{
        borderColor: checkColor,
        borderWidth: 2,
        borderRadius: 5,
        width: 20,
        height: 20,
      }}
    />
  );

  return (
    <TouchableOpacity
      style={{
        width: width,
        flexDirection: 'row',
        ...style,
      }}
      onPress={() => {
        if (onChange) {
          onChange(!checked);
        }
      }}>
      <View style={{marginTop: 5}}>{checked ? CheckedIcon : emptyIcon}</View>

      <Text
        style={{
          fontSize: fontSize,
          color: color,
          flex: 1,
          paddingHorizontal: 10,
        }}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export const ToggleButton = ({title, selected, style, onPress}) => {
  let height = style?.height ?? 40;

  let width = style?.width ?? '100%';
  let fontSize = style?.fontSize ?? 15;
  let color = style?.color ? 'black' : selected ? 'black' : Constants.darkGold;

  const backBorderStyle = selected
    ? {
        backgroundColor: Constants.darkGold,
      }
    : {
        borderColor: Constants.darkGold,
        borderWidth: 1,
      };

  return (
    <TouchableOpacity
      style={{
        width: width,
        height: height,
        alignItems: 'center',
        justifyContent: 'center',
        ...backBorderStyle,
        borderRadius: 3,
        ...style,
      }}
      onPress={onPress}>
      <Text
        style={{
          fontSize: fontSize,
          color: color,
        }}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Constants.backColor,
    paddingHorizontal: 30,
    alignItems: 'center',
  },
  logoImage: {
    width: Constants.WINDOW_WIDTH * 0.5,
    resizeMode: 'contain',
    marginTop: 60,
  },
  buttonView: {
    position: 'absolute',
    bottom: 40,
    width: '100%',
  },
  btnText: {
    fontSize: 18,
  },
  loginButton: {
    height: 40,
    backgroundColor: Constants.darkGold,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
  },
  googleButton: {
    height: 40,
    paddingVertical: 10,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Constants.googleColor,
    borderRadius: 5,
    marginVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },

  FBButton: {
    height: 40,
    paddingVertical: 10,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Constants.fbColor,
    borderRadius: 5,
    marginVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  appleButton: {
    height: 40,
    paddingVertical: 10,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    backgroundColor: Constants.white,
    marginVertical: 10,
  },
  signupTitle: {
    color: Constants.lightGold,
    fontSize: 15,
  },
  appleTitle: {
    color: Constants.black,
    fontSize: 15,
  },
  googleTitle: {
    color: Constants.white,
    fontSize: 15,
  },
  username: {
    borderStyle: 'solid',
    overflow: 'hidden',
    height: 45,
    borderColor: Constants.darkGold,
    width: '100%',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    color: Constants.lightGold,
    paddingHorizontal: 10,
    fontSize: 14,
  },
  scrollContainer: {
    flex: 1,
  },
  scrollContentContainer: {
    width: Constants.WINDOW_WIDTH - 60,
    height: Constants.WINDOW_HEIGHT - 50,
    alignItems: 'center',
  },
});
