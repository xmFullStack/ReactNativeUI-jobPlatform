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
import PropTypes from 'prop-types';
import Constants from '../utils/Constants';

export const InputOutLine = ({
  placeholder,
  placeholderTextColor,
  errorMessage,
  warningMessage,
  infoMessage,
  successMessage,
  icon,
  style,
  value,
  onChangeText,
  onSubmitEditing,
  multiline = false,
  maxLength = 10000,
  numberOfLines = 1,
  keyboardType = 'default',
}) => {
  let placeholderColor = placeholderTextColor ?? Constants.darkGold;

  let height = style?.height ?? 40;

  return (
    <View style={{paddingVertical: 5, ...style}}>
      <View style={{height: height, ...styles.textIcon}}>
        {icon}
        <TextInput
          style={{...styles.username, height: height, textAlignVertical: 'top'}}
          placeholder={placeholder}
          placeholderTextColor={placeholderColor}
          value={value}
          onChangeText={(val) => {
            onChangeText(val);
          }}
          multiline={multiline}
          maxLength={maxLength}
          numberOfLines={numberOfLines}
          keyboardType={keyboardType}
          onSubmitEditing={onSubmitEditing}
        />
      </View>
      {!!errorMessage && (
        <Text style={{color: 'red', fontSize: 12, paddingHorizontal: 10}}>
          {errorMessage}
        </Text>
      )}
      {!!infoMessage && (
        <Text
          style={{
            color: Constants.blueColor,
            fontSize: 12,
            paddingHorizontal: 10,
          }}>
          {infoMessage}
        </Text>
      )}
      {!!warningMessage && (
        <Text
          style={{
            color: Constants.lightGold,
            fontSize: 12,
            paddingHorizontal: 10,
          }}>
          {warningMessage}
        </Text>
      )}
      {!!successMessage && (
        <Text
          style={{color: Constants.green, fontSize: 12, paddingHorizontal: 10}}>
          {successMessage}
        </Text>
      )}
    </View>
  );
};

InputOutLine.propTypes = {
  placeholder: PropTypes.string,
  placeholderTextColor: PropTypes.string,
  errorMessage: PropTypes.string,
  warningMessage: PropTypes.string,
  infoMessage: PropTypes.string,
  successMessage: PropTypes.string,
  icon: PropTypes.func,
  style: PropTypes.object,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChangeText: PropTypes.func,
  multiline: PropTypes.bool,
  maxLength: PropTypes.number,
  numberOfLines: PropTypes.number,
  keyboardType: PropTypes.oneOf([
    'default',
    'email-address',
    'numeric',
    'phone-pad',
    'number-pad',
    'decimal-pad',
  ]),
};

InputOutLine.defaultProps = {
 
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Constants.backColor,
    paddingHorizontal: 30,
    alignItems: 'center',
    paddingTop: 60,
  },
  logoImage: {
    width: Constants.WINDOW_WIDTH * 0.5,
    height: Constants.WINDOW_WIDTH * 0.5,
    resizeMode: 'contain',
  },
  buttonView: {
    //   position: 'absolute',
    //   bottom: 40,
    marginTop: 80,
    width: '100%',
    alignItems: 'center',
  },
  btnText: {
    fontSize: 15,
  },
  loginButton: {
    height: 40,
    backgroundColor: Constants.darkGold,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    width: '100%',
  },
  googleButton: {
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
    flex: 1,
    borderStyle: 'solid',
    overflow: 'hidden',
    justifyContent: 'flex-start',
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
  caption: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Constants.darkGold,
  },
  textIcon: {
    borderColor: Constants.darkGold,
    borderWidth: 1,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    marginBottom: 2,
  },
});
