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
  Modal,
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
import JobItem, {FakeJobItem} from '../../myjobs/views/JobItem';
import PropTypes from 'prop-types';
import ActionSheet from '../../../../components/ActionSheet';
const testJobs = [FakeJobItem, FakeJobItem, FakeJobItem];
import {InputOutLine} from '../../../../components/Inputs';

export const BidModal = ({isShow = false, onSubmitted, onClose}) => {
  const [coverLetter, setCoverLetter] = React.useState('');

  const [total, setTotal] = useState(0.0);

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
          width: Constants.WINDOW_WIDTH,
          height: Constants.WINDOW_HEIGHT,
          backgroundColor: 'rgba(13,13,13,0.95)',
          paddingTop: 60,
        }}>
        <HeaderBar
          title={'Submit Proposal'}
          isShowLeft={false}
          isShowRight={true}
          rightIcon={
            <Feather name={'x'} size={20} color={Constants.darkGold} />
          }
          onRightButton={onClose}
        />
        <ScrollView
          style={{paddingHorizontal: 15, width: '100%'}}
          contentContainerStyle={{paddingVertical: 10, alignItems: 'stretch'}}>
          <Text style={styles.jobCaption}>Desired Budget</Text>
          <Text style={{...styles.jobDesc}}>
            Total amount the designer will see on your proposal
          </Text>

          <InputOutLine
            onChangeText={(val) => {
              setTotal(val);
            }}
            icon={
              <Feather
                name="dollar-sign"
                size={18}
                color={Constants.darkGold}
              />
            }
            value={total}
            keyboardType={'number-pad'}
          />

          <Text style={styles.jobCaption}>10% FashionArmy Club Fee</Text>
          <Text style={styles.jobBudget}>$12.30</Text>

          <Text style={styles.jobCaption}>You'll receive</Text>
          <Text style={styles.jobDesc}>
            The estimated amount you'll receive after service fees
          </Text>
          <Text style={styles.jobBudget}>$123.00</Text>

          <Text style={styles.jobCaption}>Cover Letter</Text>
          <InputOutLine
            onChangeText={(val) => {
              setCoverLetter(val);
            }}
            value={coverLetter}
            style={{
              height: Constants.WINDOW_WIDTH * 0.3,
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
        </ScrollView>
      </View>
    </Modal>
  );
};

export const JobDetailView = ({jobItem}) => {
  return (
    <View>
      <Text style={styles.jobDesc}>{jobItem.description}</Text>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Text style={styles.jobCaption}>Country</Text>
        <Text
          style={{
            ...styles.jobDesc,
            color: Constants.lightGold,
            marginLeft: 10,
          }}>
          Denmark
        </Text>
      </View>

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
    </View>
  );
};

class ProjectDetail extends React.Component {
  constructor(props) {
    super(props);
    const {route, navigation} = props;

    const {item} = props;

    this.state = {
      userMode: 'designer',
      jobItem: item,
      segIndex: 0,
      isShowBidModal: false,
      isShowPicker: false
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
    const {route, navigation, enableToBid} = this.props;
    const {jobItem} = this.state;

    const showSegView =
      jobItem.status == 'progress' || jobItem.status == 'closed';

    return (
      <>
        <View style={styles.container}>
          <HeaderBar
            title={'Project Details'}
            isShowRight={false}
            isBackLeft={true}
            isShowLeft={true}
            onLeftButton={() => {
              navigation.goBack();
            }}
          />

          <ScrollView style={{flex: 1}} contentContainerStyle={{}}>
            <View style={{paddingTop: 70}}>
              <Text style={styles.jobTitle}>{jobItem.title}</Text>
              {/* <Text style={styles.jobStatus}>
                {jobItem.status.toUpperCase()}
              </Text> */}

              {(this.state.segIndex == 0 || !showSegView) && (
                <JobDetailView jobItem={jobItem} />
              )}
              {/* {this.state.segIndex == 1 && showSegView && (
                <JobMilestones
                  jobItem={jobItem}
                  onRelease={(milestone) => {}}
                  onAdd={() => {
                    navigation.navigate('milestone_add', {item: jobItem});
                  }}
                />
              )} */}
              {/* {this.state.segIndex == 2 && <JobReviews jobItem={jobItem} />} */}
            </View>
          </ScrollView>
        </View>

        <View
          style={{
            backgroundColor: Constants.backColor,
            flexDirection: 'row',
            paddingVertical: 10,
            paddingHorizontal: 10,
          }}>
          <FillButton
            title={'Submit a Proposal'}
            onPress={() => {
              this.onTapBid();
            }}
          />
        </View>

        <ActionSheet
          title={'Select Action'}
          titleList={[]}
          onTapItem={(index, title) => {
            this.setTotal({ isShowPicker: false})
          }}
          onCancel={() => {
            this.setTotal({ isShowPicker: false})
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

  const {item} = route.params;

  const jobItem = item ?? job;
  return (
    <ProjectDetail
      {...props}
      enableToBid={true}
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
    fontSize: 14,
    color: Constants.greyWhite,
    marginVertical: 3,
  },
  jobMilestoneDesc: {
    fontSize: 13,
    color: Constants.greyWhite,
    marginVertical: 3,
  },
  jobCaption: {
    fontSize: 16,
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
    fontSize: 18,
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
