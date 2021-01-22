import ReviewItem from '../../myjobs/views/ReviewItem';
import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Image,
  FlatList,
  ScrollView,
} from 'react-native';

import EvilIcons from 'react-native-vector-icons/EvilIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import VideoPlayer from 'react-native-video-player';
import Constants, {StatusBarHeight, isIOS} from '../../../../utils/Constants';
import {ModelItemView} from '../../browse/index';
import {ModelPhotoItem} from './ModelProfilePage';
import PropTypes from 'prop-types';

import {
  OutlineButton,
  FillButton,
  PickerButton,
  CheckBox,
  ToggleButton,
} from '../../../../components/Buttons';

import SegViews from '../../../../components/SegView';

import VideoPlayerModal from '../../../../components/VideoPlayerModal';

import {uploadsHostUrl} from '../../../../utils/RestAPI';


const fake_reviews=[
    {
      id: 1233,
      sender_id:'12323',
      sender:{
        username: 'Designer Name1', 
        avatar: require('../../../../../assets/style2.jpg'),
      },
      rcver: {
        username: 'model1'
      },
      body:"This is good experiences and great jobs!  I will rehire  this model again. Thank you!",
      point:4.5,
      created_at:'2020-01-23 12:32:32'
    },
    {
      id: 1233,
      sender_id:'12323',
      sender:{
        username: 'model1',
        avatar: require('../../../../../assets/style4.jpg'),
      },
      rcver: {
        username: 'Designer Name1',
      },
      body:"Request Payment is in time, Everything is perfect, I will work with this client again. Thanks again.",
      point: 5,
      created_at:'2020-08-23 12:32:32'
    }
  ]

const ReviewsView = ({reviews=fake_reviews}) => {

    
  return (
    <View style={{flex:1}}>
        <FlatList
            keyExtractor={(one, index)=>''+index}
            data={reviews}
            renderItem={({item, index, sep})=>{
                return (
                    <ReviewItem review={item}/>
                )
            }}
            
        />
    </View>
  );
};

export default ReviewsView