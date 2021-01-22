import React, {useEffect, useState, useRef} from 'react';
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
import Constants, {UserRole} from '../../../../utils/Constants';
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

const testJobs = [FakeJobItem, FakeJobItem, FakeJobItem];

import {Provider, connect, useDispatch, useSelector} from 'react-redux';
import ActionSheet from '../../../../components/ActionSheet';
// import {updateEvent, updateRole, fetchEvents} from '../store/actions';

export const JobMilestones = ({jobItem, onRelease, onAdd}) => {
  const dispatch = useDispatch();
  const curRole = useSelector((state) => state.role.curRole);
  const [isShowPicker, setIsShowPicker] = useState(false);

  const milestoneActions =
    curRole == UserRole.Designer
      ? ['Release', 'Cancel Request', 'Cancel']
      : ['Request Release', 'Request Cancel'];

  const milestones = [...jobItem.milestones];
  return (
    <View>
      {curRole == UserRole.Model && (
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text style={styles.jobCaption}>Model Budget</Text>
          <Text style={styles.jobBudget}>$234.50</Text>
        </View>
      )}
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          marginVertical: 10,
        }}>
        <Text style={styles.jobCaption}>Milestones</Text>
        {jobItem.status == 'progress' && curRole == UserRole.Designer && (
          <FillButton
            title={'+ Add'}
            onPress={onAdd}
            style={{width: 70, fontSize: 13, height: 24, borderRadius: 12}}
          />
        )}
      </View>

      {milestones.map((milestone, index) => {
        const {
          id,
          price,
          currency,
          description,
          released,
          released_at,
          created_at,
          updated_at,
        } = milestone;
        return (
          <View key={'' + index} style={styles.milestoneContainer}>
            <Text style={styles.milestoneCaption}>Price({currency})</Text>

            <Text style={styles.jobMilestoneBudget}>${price}</Text>

            <Text style={styles.jobMilestoneDesc}>{description}</Text>
            <View
              style={{
                position: 'absolute',
                right: 10,
                top: 0,
                alignItems: 'flex-end',
                paddingVertical: 5,
                zIndex: 1000,
              }}>
              <Text style={{color: Constants.greyWhite}}>
                {Utils.GetHumanDateTimeFormat(created_at)} created
              </Text>
              {/* {released == 0 && (
                <FillButton
                  title={'Release'}
                  onPress={() => {
                    onRelease(milestone);
                  }}
                  style={{
                    height: 24,
                    paddingHorizontal: 10,
                    fontSize: 12,
                    marginTop: 6,
                    width: 70,
                  }}
                />
              )} */}
              {released == 1 && (
                <>
                  <Text style={styles.jobMilestoneDesc}>
                    {' '}
                    {Utils.GetHumanDateTimeFormat(released_at)} released
                  </Text>
                </>
              )}
            </View>
            <TouchableOpacity
              style={{position: 'absolute', bottom: 5, right: 5}}
              onPress={() => {setIsShowPicker(true)}}>
              <Feather
                name="more-horizontal"
                color={Constants.greyWhite}
                size={20}
              />
            </TouchableOpacity>
          </View>
        );
      })}

      <ActionSheet
        title={'Select Action'}
        titleList={milestoneActions}
        onTapItem={(index, title) => {
          setIsShowPicker(false);
        }}
        onCancel={() => {
          setIsShowPicker(false);
        }}
        isShow={isShowPicker}
      />
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
    borderColor: Constants.greyWhite,
    borderWidth: 0.5,
    borderRadius: 3,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginVertical: 4,
  },
});

export default JobMilestones;
