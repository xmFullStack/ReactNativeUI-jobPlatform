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
  Modal,
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
import JobMilestones from './JobMilestone';
import JobReviews from './JobReviews';
import ActionSheet from '../../../../components/ActionSheet';
const testJobs = [FakeJobItem, FakeJobItem, FakeJobItem];
import {InputOutLine} from '../../../../components/Inputs';

import {Provider, connect, useDispatch, useSelector} from 'react-redux';
import {updateEvent, updateRole, fetchEvents} from '../../../../store/actions';

export const BidModal = ({isShow = false, onSubmitted, onClose}) => {
  const [coverLetter, setCoverLetter] = React.useState('');
  const onSubmit = () => {
    if (onSubmitted) {
      onSubmitted();
    }
  };
  return (
    <Modal animationType={'fade'} transparent={true} visible={isShow}>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          width: Constants.WINDOW_WIDTH,
          height: Constants.WINDOW_HEIGHT,
          backgroundColor: 'rgba(13,13,13,0.95)',
          paddingTop: 60,
        }}>
        <HeaderBar
          title={'Place a Bid'}
          isShowLeft={false}
          isShowRight={true}
          rightIcon={
            <Feather name={'x'} size={20} color={Constants.darkGold} />
          }
          onRightButton={onClose}
        />
        <View
          style={{paddingHorizontal: 15, width: '100%', alignItems: 'stretch'}}>
          <Text style={{color: Constants.greyWhite, fontSize: 15}}>
            Cover Letter
          </Text>
          <InputOutLine
            onChangeText={(val) => {
              setCoverLetter(val);
            }}
            value={coverLetter}
            style={{
              height: Constants.WINDOW_WIDTH * 0.6,
            }}
            multiline={true}
            maxLength={1500}
          />
          <Text
            style={{
              color: Constants.greyWhite,
              fontSize: 13,
              textAlign: 'right',
              marginTop: 5,
            }}>
            Remain {1500 - coverLetter.length} Characters
          </Text>
          <FillButton
            title={'Submit'}
            onPress={onSubmit}
            style={{marginVertical: 10}}
          />
        </View>
      </View>
    </Modal>
  );
};

export const JobDetailView = ({jobItem}) => {
  const dispatch = useDispatch();
  const curRole = useSelector((state) => state.role.curRole);

  return (
    <View>
      <Text style={styles.jobCaption}>Description</Text>
      <Text style={styles.jobDesc}>{jobItem.description}</Text>

      <Text style={styles.jobCaption}>Mood Board Pictures</Text>
      <FlatList
        style={{
          width: Constants.WINDOW_WIDTH,
          marginVertical: 10,
        }}
        contentContainerStyle={{paddingRight: 100}}
        horizontal={true}
        data={jobItem.images}
        renderItem={({item, index, sep}) => {
          return (
            <View
              style={{
                width: Constants.WINDOW_WIDTH * 0.4,
                height: Constants.WINDOW_WIDTH * 0.55,
                marginHorizontal: 5,
                borderRadius: 3,
              }}>
              <Image
                source={item}
                style={{width: '100%', height: '100%'}}
                resizeMode={'cover'}
              />
            </View>
          );
        }}
        keyExtractor={(item, index) => 'key_' + index}
      />

      <Text style={styles.jobCaption}>Project Budget ({jobItem.currency})</Text>
      <Text style={styles.jobBudget}>${jobItem.price}</Text>

      <Text style={styles.jobCaption}>Project ID</Text>
      <Text style={styles.jobDesc}>{jobItem.pid}</Text>

      {/* {curRole == UserRole.Model && ( */}
      <>
        <Divider color={Constants.greyWhite} />
        <Text style={styles.jobCaption}>Model's Cover letter</Text>
        <Text style={styles.jobDesc}>
          This is saample cover letter from bid.This is saample cover letter
          from bid.This is saample cover letter from bid.
        </Text>
        <Text style={styles.jobCaption}>Model Budget</Text>
        <Text style={styles.jobBudget}>$123.23</Text>
      </>
      {/* )} */}
    </View>
  );
};

class JobDetail extends React.Component {
  constructor(props) {
    super(props);
    const {route, navigation} = props;

    const {item} = props;

    this.state = {
      userMode: 'designer',
      jobItem: item,
      segIndex: 0,
      isShowBidModal: false,
      isShowPicker: false,
    };
  }

  componentDidMount() {}

  componentWillUnmount() {}

  onTapBid = () => {
    const {navigation, route} = this.props;
    this.setState({
      isShowBidModal: true,
    });
  };

  render() {
    const {route, navigation, enableToBid, dispatch, curRole} = this.props;
    const {jobItem} = this.state;

    const showSegView =
      jobItem.status == 'progress' || jobItem.status == 'closed';

    return (
      <>
        <View style={styles.container}>
          <HeaderBar
            title={'Project Details'}
            isShowRight={true}
            isBackLeft={true}
            isShowLeft={true}
            rightIcon={
              <Feather
                name="more-vertical"
                size={20}
                color={Constants.lightGold}
              />
            }
            onLeftButton={() => {
              navigation.goBack();
            }}
            onRightButton={() => {
              this.setState({isShowPicker: true});
            }}
          />

          <ScrollView style={{flex: 1}} contentContainerStyle={{}}>
            <View style={{paddingTop: 70}}>
              <Text style={styles.jobTitle}>{jobItem.title}</Text>
              <Text style={styles.jobStatus}>
                {jobItem.status.toUpperCase()}
              </Text>
              {showSegView && (
                <SegViews
                  curIndex={this.state.segIndex}
                  titleList={['Details', 'Milestones', 'Reviews']}
                  onTapItem={(title, index) => {
                    this.setState({segIndex: index});
                  }}
                />
              )}

              {(this.state.segIndex == 0 || !showSegView) && (
                <JobDetailView jobItem={jobItem} />
              )}
              {this.state.segIndex == 1 && showSegView && (
                <JobMilestones
                  jobItem={jobItem}
                  onRelease={(milestone) => {}}
                  onAdd={() => {
                    navigation.navigate('milestone_add', {item: jobItem});
                  }}
                />
              )}
              {this.state.segIndex == 2 && <JobReviews jobItem={jobItem} />}
            </View>
          </ScrollView>
        </View>

        {enableToBid && jobItem.status == 'open' && (
          <View
            style={{
              backgroundColor: Constants.secondBack,
              flexDirection: 'row',
              paddingVertical: 10,
              paddingHorizontal: 10,
            }}>
            {/* <Text style={styles.jobDesc}>
              It's free to place a bid.
          </Text> */}
            <View
              style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <Text style={{fontSize: 14, color: Constants.darkGold}}>
                Employer from Norway
              </Text>
            </View>
            <FillButton
              title={'Place a Bid'}
              onPress={() => {
                this.onTapBid();
              }}
              style={{flex: 1}}
            />
          </View>
        )}

        <ActionSheet
          title={'Select Action'}
          titleList={
            curRole == UserRole.Designer
              ? ['Complete', 'Cancel', 'Report Model']
              : ['Request Complete', 'Request Cancel', 'Report Designer']
          }
          onTapItem={(index, title) => {
            this.setState({isShowPicker: false});
          }}
          onCancel={() => {
            this.setState({isShowPicker: false});
          }}
          isShow={this.state.isShowPicker}
        />

        <BidModal
          isShow={this.state.isShowBidModal}
          onClose={() => {
            this.setState({isShowBidModal: false});
          }}
          onSubmitted={() => {
            this.setState({isShowBidModal: false}, () => {
              navigation.navigate('my_jobs');
            });
          }}
        />
      </>
    );
  }
}

export default function (props) {
  const navigation = useNavigation();
  const route = useRoute();

  const dispatch = useDispatch();
  const curRole = useSelector((state) => state.role.curRole);

  const {item} = route.params;
  const {enableToBid, job} = route?.params;

  const jobItem = item ?? job;
  return (
    <JobDetail
      {...props}
      dispatch={dispatch}
      curRole={curRole}
      enableToBid={enableToBid}
      item={jobItem}
      navigation={navigation}
      route={route}
    />
  );
}

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
