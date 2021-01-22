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

import {useNavigation, useRoute} from '@react-navigation/native';
import Constants, {UserRole} from '../../../../utils/Constants';
import {
  OutlineButton,
  FillButton,
  PickerButton,
  CheckBox,
  ToggleButton,
} from '../../../../components/Buttons';
import Feather from 'react-native-vector-icons/Feather';
import {InputOutLine} from '../../../../components/Inputs';
import Divider from '../../../../components/Divider';
import HeaderBar from '../../../../components/HeaderBar';
import JobItem, {
  FakeJobClosed,
  FakeJobItem,
  FakeJobItemOpen,
  FakeJobItemProgress,
} from '../../myjobs/views/JobItem';

import EmptyItem from '../../myjobs/views/EmptyItem';

const Categories = ['My Feed', 'Saved', 'Search'];

class ProposalPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      option: -1,
      jobs: [
        FakeJobClosed,
        FakeJobClosed,
        FakeJobClosed,
        FakeJobClosed,
        FakeJobClosed,
        FakeJobClosed,
      ],
    };
  }

  onTapSubmitted = () => {
    const {navigation, route} = this.props;
    let newOption = this.state.option != 1 ? 1 : -1;
    this.setState({
      option: newOption,
    });
  };
  onTapActive = () => {
    const {navigation, route} = this.props;
    let newOption = this.state.option != 0 ? 0 : -1;
    this.setState({
      option: newOption,
    });
  };

  onTapDetails = (item) => {
    this.props.navigation.navigate('proposal_detail', {
      enableToBid: true,
      item: item,
    });
  };

  render() {
    const {navigation, route} = this.props;

    return (
      <View style={styles.container}>
        <HeaderBar
          title={'Proposals'}
          isShowRight={false}
          isBackLeft={false}
          isShowLeft={false}
        />

        <View
          style={{
            paddingHorizontal: 15,
            paddingTop: 80,
            flex: 1,
          }}>
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              width: '100%',
              marginVertical: 10,
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
            onPress={this.onTapActive}>
            <Text style={{...styles.jobCaption, color: Constants.darkGold}}>
              Active Proposals (0)
            </Text>

            <Feather
              name={this.state.option == 0 ? "chevron-down" : "chevron-right"}
              size={20}
              color={Constants.darkGold}
            />
          </TouchableOpacity>

          {this.state.option == 0 && (
            <FlatList
              style={{
                flex: 1,
                width: '100%',
              }}
              data={this.state.jobs}
              contentContainerStyle={{paddingHorizontal: 0}}
              renderItem={({item, index, sep}) => {
                return (
                  <JobItem
                    key={'' + index}
                    jobData={item}
                    onPress={() => {
                      this.onTapDetails(item);
                    }}
                    onTapMoreItem={(index, title) => {
                      if (index == 0) {
                        navigation.navigate('post_job');
                      }
                    }}
                  />
                );
              }}
              keyExtractor={(item, index) => 'key_' + index + item.id}
              ItemSeparatorComponent={() => {
                return <Divider color={Constants.greyWhite} />;
              }}
            />
          )}

          <TouchableOpacity
            style={{
              flexDirection: 'row',
              width: '100%',
              marginVertical: 10,
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
            onPress={this.onTapSubmitted}>
            <Text style={{...styles.jobCaption, color: Constants.darkGold}}>
              Submitted Proposals (10)
            </Text>

            <Feather
              name={this.state.option == 1 ? "chevron-down" : "chevron-right"}
              size={20}
              color={Constants.darkGold}
            />
          </TouchableOpacity>
          {this.state.option == 1 && (
            <FlatList
              style={{flex: 1, width: '100%'}}
              data={this.state.jobs}
              contentContainerStyle={{paddingHorizontal: 0}}
              renderItem={({item, index, sep}) => {
                return (
                  <JobItem
                    key={'' + index}
                    jobData={item}
                    onPress={() => {
                      this.onTapDetails(item);
                    }}
                    onTapMoreItem={(index, title) => {
                      if (index == 0) {
                        navigation.navigate('post_job');
                      }
                    }}
                  />
                );
              }}
              keyExtractor={(item, index) => 'key_' + index + item.id}
              ItemSeparatorComponent={() => {
                return <Divider color={Constants.greyWhite} />;
              }}
            />
          )}
        </View>
      </View>
    );
  }
}

export default function (props) {
  const navigation = useNavigation();
  const route = useRoute();

  return <ProposalPage {...props} navigation={navigation} route={route} />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Constants.backColor,
    paddingHorizontal: 0,
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
