import React, {useState, useEffect} from 'react';
import {Text, View, Dimensions, Image, TouchableOpacity} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';


import Entypo from 'react-native-vector-icons/Entypo';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';

import Constants from '../utils/Constants';

export const HeaderBar = ({
  title,
  onLeftButton,
  leftIcon,
  rightIcon,
  onRightButton,
  backgroundColor,
  leftIconColor,
  titleColor = Constants.lightGold,
  isBackLeft = false,
  isShowRight = true,
  isShowLeft = true,
  isTransparent = false,
}) => {
  const backButton = (
    <Entypo name="chevron-thin-left" size={20} color={Constants.lightGold} />
  );

  let [liveData, setLiveData] = useState('live data init value.');
  let [counter, setCounter] = useState(0);
  useEffect(() => {
    setCounter(counter + 1);
  }, [liveData]);
  global.setTestLiveData = setLiveData.bind(this);

  return (
    <View
      style={{
        flexDirection: 'row',
        width: Dimensions.get('screen').width,
        borderBottomColor: '#E7E7E7',
        borderBottomWidth: 0,
        height: 60,
        justifyContent: 'center',
        backgroundColor: Constants.backColor,
        alignItems: 'center',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 909009,
      }}>
      {/* <LinearGradient
                style={{
                    flex:1, 
                    paddingTop:10,
                    paddingBottom:10,
                    flexDirection: 'row',                 
                    width: '100%',                     
                    height: '100%',
                    justifyContent: 'center', 
                    alignItems: 'center',
                    paddingHorizontal: 10,
                }}
                colors={ backgroundColor ? [backgroundColor , backgroundColor] : ['#FFFF', '#FFFA', '#FFF1']}> */}

      {isShowLeft ? (
        <TouchableOpacity
          onPress={onLeftButton}
          style={{
            position: 'absolute',
            left: 5,
            top: 18,
            width: '12.5%',
            alignItems: 'center',
          }}>
          {leftIcon != null ? (
            leftIcon
          ) : isBackLeft ? (
            backButton
          ) : (
            <EvilIcons
              name="navicon"
              size={35}
              color={leftIconColor ? leftIconColor : '#6733bb'}
            />
          )}
        </TouchableOpacity>
      ) : null}
      <View
        style={{
          height: '100%',
          // flex:1,
          width: Dimensions.get('screen').width * 0.7,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text
          style={{
            fontSize: 19,
            paddingTop: 0,
            color: titleColor,
          }}>
          {title}
        </Text>
        {/* <Text> {counter}=>:{liveData}</Text> */}
      </View>

      {isShowRight ? (
        <TouchableOpacity
          onPress={onRightButton}
          style={{
            position: 'absolute',
            right: 10,
            top: 18,
            alignItems: 'center',
            width: '12.5%',
          }}>
          {rightIcon != null ? (
            rightIcon
          ) : (
            <SimpleLineIcons name="user" size={23} color="#6733bb" />
          )}
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

export default HeaderBar;
