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
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {useNavigation, useRoute} from '@react-navigation/native';
import Constants from '../../../../utils/Constants';
import Utils from '../../../../utils/Utils';
import {
  OutlineButton,
  FillButton,
  PickerButton,
  CheckBox,
  ToggleButton,
} from '../../../../components/Buttons';
import Divider from '../../../../components/Divider';
import HeaderBar from '../../../../components/HeaderBar';
import JobItem, {FakeJobItem} from './JobItem';
import PropTypes from 'prop-types';
import SegViews from '../../../../components/SegView';

export const StarsView = ({point = 0, max = 5}) => {
  let points = new Array(max).fill(1);

  const pointLen = parseInt(point);

  for (let i in points) {
    if (i >= pointLen) {
      points[i] = 0;
    }
  }

  return (
    <View style={{flexDirection: 'row'}}>
      {points.map((one, index) => {
        let color = one == 1 ? Constants.darkGold : Constants.greyWhite;
        return <FontAwesome key={''+index} name="star" color={color} size={15} />;
      })}
    </View>
  );
};

export const ReviewItem = ({review}) => {
  const {id, sender_id, sender, rcver, body, point, created_at} = review;

  return (
    <View style={styles.reviewContainer}>
      <Text style={styles.reviewBody}>"{body}"</Text>

      <View style={styles.bidEstRow}>
        <Text style={styles.reviewPoint}>{point}</Text>
        <StarsView point={point} />
      </View>

      <View style={styles.bidEstRow}>
        <Image
          source={sender.avatar}
          resizeMode={'cover'}
          style={{width: 40, height: 40, marginTop: 5, borderRadius: 4}}
        />
        <View style={{flex: 1, marginLeft: 10}}>
          <Text style={styles.jobMilestoneDesc}>{}</Text>
          <Text style={styles.jobMilestoneDesc}>
            by{' '}
            <Text
              style={{
                fontWeight: 'bold',
                fontSize: 14,
                color: Constants.greyWhite,
              }}>
              {sender?.username}
            </Text>{' '}
            {Utils.GetHumanDateTimeFormat(created_at)}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Constants.backColor,
    paddingHorizontal: 20,
    alignItems: 'stretch',
  },
  reviewContainer: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginVertical: 4,
  },
  reviewBody: {
    fontSize: 16,
    fontWeight: 'bold',
    fontStyle: 'italic',
    color: Constants.greyWhite,
    marginBottom: 10,
  },
  reviewPoint: {
    fontSize: 14,
    paddingHorizontal: 10,
    paddingVertical: 3,
    marginRight: 20,
    width: 50,
    borderRadius: 3,
    color: 'white',
    textAlign: 'center',
    backgroundColor: Constants.darkGold,
  },
  jobTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Constants.greyWhite,
    marginVertical: 5,
  },
  jobStatus: {
    fontSize: 23,
    color: Constants.blueColor,
    marginVertical: 9,
  },
  jobDesc: {
    fontSize: 15,
    color: Constants.greyWhite,
    marginVertical: 10,
  },
  jobMilestoneDesc: {
    fontSize: 13,
    color: Constants.greyWhite,
    marginVertical: 3,
  },
  jobCaption: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 6,
    color: Constants.greyWhite,
  },
  milestoneCaption: {
    fontSize: 14,
    fontWeight: 'bold',
    marginVertical: 2,
    color: Constants.greyWhite,
  },
  jobBudget: {
    fontSize: 21,
    color: Constants.greyWhite,
    marginVertical: 6,
  },
  jobMilestoneBudget: {
    fontSize: 16,
    color: Constants.greyWhite,
    marginVertical: 3,
  },
  bidEstRow: {
    flexDirection: 'row',
    width: '100%',
  },
});

export default ReviewItem;
