import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';

import Constants from '../../../utils/Constants';

const LevelView = ({title, subTitle, selected, level, onTapLevel}) => {
  return (
    <TouchableOpacity
      style={{
        borderRadius: 5,
        borderWidth: 0.8,
        width: '100%',
        borderColor: Constants.darkGold,
        padding: 10,
        justifyContent: 'center',
        marginVertical: 5,
      }}
      onPress={() => {
        onTapLevel(level);
      }}>
      <Text style={{fontSize: 15, color: Constants.darkGold}}>{title}</Text>
      <Text
        style={{fontSize: 13, color: Constants.greyWhite, marginVertical: 5}}>
        {subTitle}
      </Text>
      <View
        style={{
          position: 'absolute',
          top: 10,
          right: 10,
          width: 10,
          height: 10,
          borderRadius: 5,
          borderColor: Constants.darkGold,
          borderWidth: 1,
          backgroundColor: selected
            ? Constants.darkGold
            : Constants.transparent,
        }}></View>
    </TouchableOpacity>
  );
};

const FirstView = ({onChangeLevel}) => {
  const [level, setLevel] = useState();

  const onTapLevel = (level) => {
    setLevel(level);
    if (onChangeLevel) {
      onChangeLevel(level);
    }
  };

  return (
    <View style={{alignItems: 'stretch', width: '100%'}}>
      <Text style={styles.caption}>
        What is your level of expertise so far?
      </Text>
      <LevelView
        title={'Novice'}
        subTitle="I have basic knowledge and limited experience."
        level={1}
        selected={level == 1}
        onTapLevel={() => {
          onTapLevel(1);
        }}
      />

      <LevelView
        title={'Advanced'}
        subTitle="I have a good experience, and I can explain when difficult questions arise regarding this profession. "
        level={1}
        selected={level == 2}
        onTapLevel={() => {
          onTapLevel(2);
        }}
      />

      <LevelView
        title={'Expert'}
        subTitle="I am an expert in this sector. I can provide guidance, troubleshoot and answer questions related to this field of expertise."
        level={1}
        selected={level == 3}
        onTapLevel={() => {
          onTapLevel(3);
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  caption: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Constants.greyWhite,
    marginBottom: 10,
  },
  subTitle: {
    fontSize: 15,
    color: Constants.greyWhite,
    marginVertical: 10,
  },
});

export default FirstView;
