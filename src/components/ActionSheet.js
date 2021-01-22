import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  Modal,
} from 'react-native';
import Constants from '../utils/Constants';

export default function ActionSheet({
  title = 'Select Option',
  titleList = [],
  isShow = false,
  onTapItem,
  onCancel,
}) {
  const backColor = Constants.secondBack;
  const btnTitleColor = Constants.darkGold;

  return (
    <Modal animationType={'slide'} transparent={true} visible={isShow}>
      <TouchableOpacity
        style={{
          flex: 1,
          justifyContent: 'flex-end',
          alignItems: 'center',
          width: Constants.WINDOW_WIDTH,
          height: Constants.WINDOW_HEIGHT,
          backgroundColor: 'rgba(13,13,13,0.4)',
        }}
        activeOpacity={1}
        onPress={() => {
          if (onCancel) {
            onCancel();
          }
        }}>
        <View
          style={{
            width: Constants.WINDOW_WIDTH * 0.9,
            paddingHorizontal: 10,
            paddingVertical: 10,
            backgroundColor: backColor,
            zIndex: 9999999,
            borderRadius: 10,
          }}>
          <Text style={{color: 'gray', fontSize: 13}}>{title}</Text>
          {titleList.map((one, index) => {
            const isLast = index == titleList.length - 1;
            return (
              <TouchableOpacity
                style={{
                  height: 40,
                  borderBottomWidth: !isLast ? 0.5 : 0,
                  borderBottomColor: 'gray',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                key={'item_' + index.toString()}
                onPress={() => {
                  if (onTapItem) {
                    onTapItem(index, one);
                  }
                }}>
                <Text style={{color: btnTitleColor, fontSize: 15}}>{one}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
        <TouchableOpacity
          style={{
            height: 45,
            backgroundColor: backColor,
            marginVertical: 10,
            alignItems: 'center',
            justifyContent: 'center',
            width: Constants.WINDOW_WIDTH * 0.9,
            zIndex: 9999999,
            borderRadius: 10,
          }}
          onPress={() => {
            if (onCancel) {
              onCancel();
            }
          }}>
          <Text style={{color: Constants.googleColor, fontSize: 15}}>
            Cancel
          </Text>
        </TouchableOpacity>
      </TouchableOpacity>
    </Modal>
  );
}
