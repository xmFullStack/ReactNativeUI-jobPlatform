import React, {useState, useRef} from 'react';
import {StyleSheet, TouchableOpacity, Image, View, Text} from 'react-native';
import Constants from '../../../../utils/Constants';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {uploadsHostUrl} from '../../../../utils/RestAPI';

const ModelListItem = ({
  item,
  showInfoIcon = true,
  onModelVideo,
  // onModelImagesShow,
  onTapItem,
}) => {
  let [value, setValue] = useState(false);

  const onTapMovie = () => {
    if (onModelVideo) {
      onModelVideo(item);
    }
  };

  // const onTapImages = () => {
  //   if (onModelImagesShow) {
  //     onModelImagesShow(item);
  //   }
  // };

  return (
    <View
      style={{
        width: '50%',
        // width: Constants.WINDOW_WIDTH * 0.5,
        justifyContent: 'center',
        paddingTop: 5,
        paddingBottom: 5,
        paddingHorizontal: 3,
      }}>
      <View style={styles.shadow}>
        <TouchableOpacity
          style={{width: '100%'}}
          activeOpacity={0.7}
          onPress={() => {
            if (onTapItem) {
              onTapItem(item);
            }
          }}>
          <Image
            source={
              item.user.images && item.user.images.length > 0
                ? {uri: uploadsHostUrl + item.user.images[0].image}
                : require('../../../../../assets/default_avatar.png')
            }
            resizeMode="cover"
            style={{
              width: '100%',
              borderRadius: 10,
              height: Constants.WINDOW_WIDTH * 0.6,
            }}
          />
        </TouchableOpacity>

        <View style={styles.cardTitle}>
          <Text style={{color: Constants.lightGold}}>{item.user.username}</Text>
          <Text style={{color: Constants.lightGold}}>
            {item.experience} years experience
          </Text>
          <Text style={{color: Constants.lightGold}}>
            {item.location?.name}
          </Text>
        </View>

        {showInfoIcon && (
          <TouchableOpacity
            style={{
              position: 'absolute',
              right: 5,
              top: 5,
              backgroundColor: Constants.opacityBlack,
              borderRadius: 20,
              padding: 5,
            }}
            onPress={() => {
              onTapMovie();
            }}>
            <MaterialCommunityIcons
              name="information-variant"
              size={24}
              color={Constants.darkGold}
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  shadow: {
    flex: 1,
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },

  cardTitle: {
    width: '100%',
    position: 'absolute',
    bottom: 0,
    left: 0,
    paddingVertical: 5,
    backgroundColor: Constants.opacityBlack,
    paddingHorizontal: 10,
    justifyContent: 'center',
    borderRadius: 10,
  },
});

export default ModelListItem;
