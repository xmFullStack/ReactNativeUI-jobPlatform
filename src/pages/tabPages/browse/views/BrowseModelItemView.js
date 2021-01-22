import React, {useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  Image,
  StatusBar,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import HeaderBar from '../../../../components/HeaderBar';
import Constants, {UserRole} from '../../../../utils/Constants';
import SegViews from '../../../../components/SegView';
import ProgressBar from 'react-native-animated-progress';
import Feather from 'react-native-vector-icons/Feather';
import {InputOutLine} from '../../../../components/Inputs';
import {StarsView} from '../../myjobs/views/ReviewItem';
import Divider from '../../../../components/Divider';
import ModelListItem from '../../post/views/ModelListItem';
import {
  FillButton,
  OutlineButton,
  OutLineButton,
} from '../../../../components/Buttons';
import {useNavigation, useRoute} from '@react-navigation/native';
import BrowseJobItem, {FakeJob} from './BrowseJobItem';

const BrowseModelItemView = ({
  username,
  country,
  point,
  reviews,
  onTapInTouch,

  onTapHire,
  onTapInvite,
  onTapDetail,
  isInvite,
  isHire,
}) => {
  const navigation = useNavigation();
  const route = useRoute();

  return (
    <View>
      <TouchableOpacity onPress={onTapDetail}>
        <View style={{flexDirection: 'row', paddingVertical: 10}}>
          <Image
            style={{
              width: Constants.WINDOW_WIDTH * 0.3,
              height: Constants.WINDOW_WIDTH * 0.3,
              borderRadius: 5,
              marginTop: 5,
            }}
            resizeMode={'cover'}
            source={require('../../../../../assets/style3.jpg')}
          />
          <View style={{flex: 1, marginLeft: 10}}>
            <Text style={{color: Constants.darkGold, fontSize: 16}}>
              Toly. H
            </Text>
            <Text
              style={{
                color: Constants.greyWhite,
                fontSize: 15,
                fontWeight: 'bold',
              }}>
              Award winning Video Editor/Motion Model
            </Text>
            <Text
              style={{
                color: Constants.greyWhite,
                fontSize: 13,
              }}>
              from{' '}
              <Text
                style={{
                  fontWeight: 'bold',
                  fontSize: 14,
                  color: Constants.greyWhite,
                }}>
                Ukraine
              </Text>
            </Text>

            <View
              style={{
                marginTop: 3,
              }}>
              <Text
                style={{
                  fontSize: 13,
                  color: Constants.greyWhite,
                  paddingVertical: 5,
                }}>
                Avg $100/outfit
              </Text>
              <Text
                style={{
                  fontSize: 13,
                  color: Constants.greyWhite,
                }}>
                {reviews} reviews
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: 2,
                }}>
                <Text
                  style={{
                    fontSize: 14,
                    paddingHorizontal: 10,
                    paddingVertical: 0,
                    marginRight: 5,
                    width: 50,
                    borderRadius: 3,
                    color: 'white',
                    textAlign: 'center',
                    backgroundColor: Constants.darkGold,
                  }}>
                  {point}
                </Text>
                <StarsView point={4.5} />
              </View>
            </View>
          </View>
        </View>

        <View style={{marginTop: 10, width: '100%', paddingVertical: 5}}>
          <Text style={{color: Constants.greyWhite, fontSize: 14}}>
            Online Video Editor with 7 years experience editing short videos,
            high...
          </Text>
        </View>
      </TouchableOpacity>
      <View style={{flexDirection: 'row', width: '100%'}}>
        {!isHire && !isInvite && (
          <FillButton
            title={'Get in touch'}
            onPress={onTapInTouch}
            style={{height: 30, marginVertical: 10}}
          />
        )}
        {isHire && (
          <OutlineButton
            title={'Hire'}
            onPress={onTapHire}
            style={{
              flex: 1,
              height: 30,
              marginVertical: 10,
              marginHorizontal: 5,
            }}
          />
        )}
        {isInvite && (
          <FillButton
            title={'Invite to project'}
            onPress={onTapInvite}
            style={{
              flex: 1,
              height: 30,
              marginVertical: 10,
              marginHorizontal: 5,
            }}
          />
        )}
      </View>
    </View>
  );
};

export default BrowseModelItemView;
