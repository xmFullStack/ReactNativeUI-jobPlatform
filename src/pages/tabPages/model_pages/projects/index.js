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
import {
  InputOutLine
} from '../../../../components/Inputs';
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

class ProjectsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      jobs: [
        FakeJobItemOpen,
        FakeJobItemOpen,
        FakeJobItemOpen,
        FakeJobItemOpen,
        FakeJobItemOpen,
      ],
      category: Categories[0],
    };
  }

  onTapCategory = (index, title) => {
    let newJobs = [];

    if (index == 0) {
      newJobs = [
        FakeJobItemOpen,
        FakeJobItemOpen,
        FakeJobItemOpen,
        FakeJobItemOpen,
        FakeJobItemOpen,
      ];
    } else if (index == 1) {
      newJobs = [
        FakeJobItemProgress,
        FakeJobItemProgress,
        FakeJobItemProgress,
        FakeJobItemProgress,
      ];
    } else if (index == 2) {
      newJobs = [
        FakeJobClosed,
        FakeJobClosed,
        FakeJobClosed,
        FakeJobClosed,
        FakeJobClosed,
        FakeJobClosed,
      ];
    }

    this.setState({
      category: title,
      jobs: newJobs,
      search: ''
    });
  };

  onTapDetails = (item) => {
    this.props.navigation.navigate('model_project_detail',  {enableToBid: true, item: item});

 
  };


  onTapFilterOption = () => {
    const {navigation, route} = this.props;

    navigation.navigate('filters_page');
  };

  render() {
    const {navigation, route} = this.props;

    return (
      <View style={styles.container}>
        <HeaderBar
          title={'Projects'}
          isShowRight={false}
          isBackLeft={false}
          isShowLeft={false}
        />

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            height: 30,
            paddingHorizontal: 10,
          }}>
          {Categories.map((one, index) => {
            return (
              <ToggleButton
                key={'' + index}
                title={one}
                selected={this.state.category == one}
                style={{
                  flex: 1,
                  height: 24,
                  borderRadius: 12,
                  borderWidth: 0,
                  fontSize: 13,
                  marginHorizontal: 3,
                }}
                onPress={() => {
                  this.onTapCategory(index, one);
                }}
              />
            );
          })}
        </View>

        {(!this.state.jobs || this.state.jobs.length == 0) && (
          <EmptyItem
            description={
              global.curUser.role == UserRole.Designer
                ? "You don't have any posted jobs at the moment. Post a job to hire talented models."
                : 'You are not working on any jobs at the moment. Browse jobs to get hired.'
            }
            buttonTitle={
              global.curUser.role == UserRole.Designer
                ? 'Post a Project'
                : 'Browse Projects'
            }
            onPress={() => {
              if (global.curUser.role == UserRole.Designer) {
                navigation.navigate('post_job');
              } else {
                navigation.navigate('browse');
              }
            }}
          />
        )}

        {this.state.category == Categories[2] && (
          <View
            style={{
              flexDirection: 'row',
              width: '100%',
              marginTop: 5,
              paddingHorizontal: 20,
            }}>
            <InputOutLine
              icon={
                <Feather name="search" size={20} color={Constants.darkGold} />
              }
              placeholder={'Search ...'}
              placeholderTextColor={Constants.darkGold}
              onChangeText={(val) => {
                this.setState({search: val})
              }}
              value={this.state.search ?? ''}
              style={{flex: 1}}
              onSubmitEditing={()=>{}}
            />
            <TouchableOpacity
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                width: 50,
                height: 50,
                marginLeft: 5,
              }}
              onPress={this.onTapFilterOption}>
              <Feather name="sliders" size={20} color={Constants.darkGold} />
            </TouchableOpacity>
          </View>
        )}

        <FlatList
          style={{flex: 1}}
          data={this.state.jobs}
          contentContainerStyle={{paddingHorizontal: 10}}
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
      </View>
    );
  }
}

export default function (props) {
  const navigation = useNavigation();
  const route = useRoute();

  return <ProjectsPage {...props} navigation={navigation} route={route} />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Constants.backColor,

    alignItems: 'stretch',
    paddingTop: 60,
  },
});
