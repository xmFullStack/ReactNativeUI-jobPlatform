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

import {Provider, connect, useDispatch, useSelector} from 'react-redux';
import {updateEvent, updateRole, fetchEvents} from '../../../store/actions';

import {useNavigation, useRoute} from '@react-navigation/native';
import Constants, {UserRole} from '../../../utils/Constants';
import {
  OutlineButton,
  FillButton,
  PickerButton,
  CheckBox,
  ToggleButton,
} from '../../../components/Buttons';
import Divider from '../../../components/Divider';
import HeaderBar from '../../../components/HeaderBar';
import JobItem, {
  FakeJobClosed,
  FakeJobItem,
  FakeJobItemOpen,
  FakeJobItemProgress,
} from './views/JobItem';

import EmptyItem from './views/EmptyItem';

const Categories = ['Open', 'In Progress', 'Past'];
const CategoriesModel = ['In Progress', 'Past'];



const testJobs = [
  FakeJobItem,
  FakeJobItemOpen,
  FakeJobItemProgress,
  FakeJobClosed,
  FakeJobItemOpen,
  FakeJobItemProgress,
  FakeJobClosed,
];

import DesignerIndex from './views/designer/index';

export const ProjectManageView = ({navigation}) => {

  const curRole = useSelector((state) => state.role.curRole);
  const categoryTitleList = curRole == UserRole.Designer ? Categories : CategoriesModel;
  const [jobs, setJobs] = React.useState([]);
  const [category, setCategory] = React.useState(categoryTitleList[0]);

  const onTapCategory = (index, title) => {
    setCategory(title);

    let newJobs = [];
    if (global.curUser.role == UserRole.Designer) {
      if (index == 0) {
        newJobs = [];
      } else if (index == 1) {
        newJobs = [
          FakeJobItemProgress,
          FakeJobItemProgress,
          FakeJobItemProgress,
        ];
      } else if (index == 2) {
        newJobs = [FakeJobClosed, FakeJobClosed, FakeJobClosed];
      }
    } else {
      if (index == 0) {
        newJobs = [];
      } else if (index == 1) {
        newJobs = [
          FakeJobItemProgress,
          FakeJobItemProgress,
          FakeJobItemProgress,
        ];
      } else if (index == 2) {
        newJobs = [FakeJobClosed, FakeJobClosed, FakeJobClosed];
      }
    }

    setJobs(newJobs);
  };

  const onTapDetails = (item) => {
    navigation.navigate('job_detail', {item: item});
  };

  


  return (
    <>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          height: 30,
        }}>
        {categoryTitleList.map((one, index) => {
          return (
            <ToggleButton
              key={'' + index}
              title={one}
              selected={category == one}
              style={{
                flex: 1,
                height: 24,
                borderRadius: 12,
                borderWidth: 0,
                fontSize: 13,
                marginHorizontal: 3,
              }}
              onPress={() => {
                onTapCategory(index, one);
              }}
            />
          );
        })}
      </View>

      {(!jobs || jobs.length == 0) && (
        <EmptyItem
          description={
            curRole == UserRole.Designer
              ? "You don't have any posted jobs at the moment. Post a job to hire talented models."
              : 'You are not working on any jobs at the moment. Browse jobs to get hired.'
          }
          buttonTitle={
            curRole == UserRole.Designer
              ? 'Post a Project'
              : 'Browse Projects'
          }
          onPress={() => {
            if (curRole == UserRole.Designer) {
              navigation.navigate('post_job');
            } else {
              navigation.navigate('projects');
            }
          }}
        />
      )}

      <FlatList
        style={{flex: 1}}
        data={jobs}
        renderItem={({item, index, sep}) => {
          return (
            <JobItem
              key={'' + index}
              jobData={item}
              onPress={() => {
                onTapDetails(item);
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
    </>
  );
};

class Index extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      userMode: 'designer',
      category: Categories[0], // []
      jobs: testJobs,
    };
  }

  componentDidMount() {}

  componentWillUnmount() {}

  onTapDetails = (item) => {
    const {navigation, route} = this.props;
    navigation.navigate('job_detail', {item: item});
  };

  render() {
    const {route, navigation, curRole, dispatch} = this.props;
    return (
      <View style={styles.container}>
        <HeaderBar
          title={ curRole == UserRole.Designer ? 'Projects' : 'Contracts'}
          isShowRight={false}
          isBackLeft={false}
          isShowLeft={false}
        />

        <View style={{paddingTop: 70, flex: 1}}>
          {global.curUser.role == UserRole.Designer ? (
            <DesignerIndex />
          ) : (
            <ProjectManageView navigation={navigation} />
          )}
        </View>
      </View>
    );
  }
}

export default function () {

  const navigation = useNavigation();
  const route = useRoute();

  const dispatch = useDispatch();
  const curRole = useSelector((state) => state.role.curRole);

  return (
    <Index
      navigation={navigation}
      route={route}
      dispatch={dispatch}
      curRole={curRole}
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
});
