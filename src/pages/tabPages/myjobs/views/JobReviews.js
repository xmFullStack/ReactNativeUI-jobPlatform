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

import ReviewItem from './ReviewItem';

const testJobs = [FakeJobItem, FakeJobItem, FakeJobItem];

export const JobReviews = ({jobItem}) => {
  return (
    <View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          marginVertical: 10,
        }}>
        <Text style={styles.jobCaption}>Reviews</Text>
      </View>

      {jobItem &&
        jobItem.reviews &&
        jobItem.reviews.map((review, index) => {
          return (
            <View key={''+index}>
              <ReviewItem review={review} />
              {
                  index < jobItem.reviews.length - 1 &&  <Divider title={null}/>
              }
             
            </View>
          );
        })}
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
    color: Constants.greyWhite,
  },
  milestoneContainer: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginVertical: 4,
  },
});

export default JobReviews;
