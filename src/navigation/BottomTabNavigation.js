import * as React from 'react';
import {Text, View, StyleSheet, Image} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';

import {Provider, connect, useDispatch, useSelector} from 'react-redux';
import {updateEvent, updateRole, fetchEvents} from '../store/actions';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';

import Constants, {UserRole} from '../utils/Constants';

// import ModelProfilePage from "../screens/ModelProfilePage";
// import ModelListPage from "../screens/model/ModelListPage";
// import NotificationPage from "../screens/notification/NotificationPage";

import Profile from '../pages/tabPages/profile/index';

import ModelProfile from '../pages/tabPages/model_pages/profile/index';

import Post from '../pages/tabPages/post/index';
import MyJobs from '../pages/tabPages/myjobs/index';
import Chat from '../pages/tabPages/chat/index';
import Browse from '../pages/tabPages/browse/index';

import RestAPI from '../utils/RestAPI';

import ModelProjects from '../pages/tabPages/model_pages/projects/index';
import ProposalPage from '../pages/tabPages/model_pages/proposals/index';

const HomeTabList = ['Models', 'Projects', 'Messages', 'Profile'];
const TabRouteNameList = ['browse', 'my_jobs', 'messages', 'profile'];

const HomeTabModelList = [
  'Projects',
  'Proposals',
  'Messages',
  'Profile',
  'Contracts',
];
const TabRouteNameModelList = [
  'projects',
  'proposals',
  'messages',
  'profile',
  'contracts',
];

import {
  NavigationContext,
  useNavigation,
  useRoute,
} from '@react-navigation/native';

const Tab = createBottomTabNavigator();

const MenuIconSelList = [
  <Feather name="search" size={24} color={Constants.lightGold} />,
  <Feather name="list" size={24} color={Constants.lightGold} />,

  <Feather name="message-circle" size={24} color={Constants.lightGold} />,
  <Feather name="user" size={24} color={Constants.lightGold} />,
  <Feather name="file-text" size={24} color={Constants.lightGold} />,
];

const MenuIconList = [
  <Feather name="search" size={24} color={Constants.darkGold} />,
  <Feather name="list" size={24} color={Constants.darkGold} />,

  <Feather name="message-circle" size={24} color={Constants.darkGold} />,
  <Feather name="user" size={24} color={Constants.darkGold} />,
  <Feather name="file-text" size={24} color={Constants.darkGold} />,
];

class BottomTabNavigation extends React.Component {
  state = {
    badgeCount: 0,
  };
  getNotificationCount = () => {
    // RestAPI.generalPost("getNotificationCount", { userId: global.curUser.id })
    //   .then((res) => {
    //     global.badgeCount = res.count
    //     if (global.updateBadgeCount) {
    //       global.updateBadgeCount(res.count);
    //     }
    //   })
    //   .catch((ex) => {
    //     console.log('getNOitficationCount error: ', ex)
    //   });
  };

  componentDidMount() {
    const {navigation} = this.props;
    this._unsubscribe = navigation.addListener('focus', () => {
      // this.setState({ badgeCount: global.badgeCount });
      // global.updateBadgeCount = (count) => {
      //   try {
      //     this.setState({ badgeCount: count });
      //     Notifications.setBadgeCountAsync(badgeCount)
      //   } catch (ex) {}
      // };
      // this.getNotificationCount();
      // global.tabNotiLoadFunc = this.getNotificationCount;
    });

    this._unsubscribeBlur = navigation.addListener('blur', () => {
      global.updateBadgeCount = null;
      global.tabNotiLoadFunc = null;
    });
  }

  componentWillUnmount() {
    if (this._unsubscribe) {
      this._unsubscribe();
    }
    if (this._unsubscribeBlur) {
      this._unsubscribeBlur();
    }
  }

  render() {
    const {dispatch, curRole} = this.props;

    const tabList =
      curRole == UserRole.Designer ? HomeTabList : HomeTabModelList;
    const routeList =
      curRole == UserRole.Designer ? TabRouteNameList : TabRouteNameModelList;

    return (
      <Tab.Navigator
        screenOptions={({route}) => ({
          title: ({focused, color, size}) => {
            let title = '';
            routeList.forEach((one, index) => {
              if (route.name == one) {
                title = tabList[index];
              }
            });
            return <Text style={{color: color}}>{title}</Text>;
          },
          tabBarIcon: ({focused, color, size}) => {
            let icon = null;
            routeList.forEach((title, index) => {
              if (route.name == title) {
                if (focused) {
                  icon = MenuIconSelList[index];
                } else {
                  icon = MenuIconList[index];
                }
              }
            });
            return icon;
          },
        })}
        tabBarOptions={{
          activeTintColor: Constants.lightGold,
          inactiveTintColor: Constants.darkGold,
          labelStyle: {
            fontSize: 13,
          },
          style: {
            backgroundColor: 'black',
          },
        }}
        initialRouteName={routeList[0]}>
        {curRole == UserRole.Designer && (
          <>
            <Tab.Screen
              name={routeList[0]}
              component={Browse}
              title={tabList[0]}
              // title={<Text style={{color: Constants.lightGold}}>{HomeTabList[0]}</Text>}
            />
            <Tab.Screen
              name={routeList[1]}
              component={MyJobs}
              title={tabList[1]}
              options={{
                tabBarBadge:
                  this.state.badgeCount > 0 ? this.state.badgeCount : null,
              }}
            />

            <Tab.Screen
              name={routeList[2]}
              component={Chat}
              title={tabList[2]}
            />
            <Tab.Screen
              name={routeList[3]}
              component={Profile}
              title={tabList[3]}
            />
          </>
        )}

        {curRole == UserRole.Model && (
          <>
            <Tab.Screen
              name={routeList[0]}
              component={ModelProjects}
              title={tabList[0]}
            />
            <Tab.Screen
              name={routeList[1]}
              component={ProposalPage}
              title={tabList[1]}
              options={{
                tabBarBadge:
                  this.state.badgeCount > 0 ? this.state.badgeCount : null,
              }}
            />
            <Tab.Screen
              name={routeList[4]}
              component={MyJobs}
              title={tabList[4]}
            />
            <Tab.Screen
              name={routeList[2]}
              component={Chat}
              title={tabList[2]}
            />
            <Tab.Screen
              name={routeList[3]}
              component={Profile}
              title={tabList[3]}
            />
          </>
        )}
      </Tab.Navigator>
    );
  }
}

export default function (props) {
  const navigation = useNavigation();
  const route = useRoute();

  const dispatch = useDispatch();
  // const allEvents = useSelector((state) => state.event.allEvents);
  // const curEvent = useSelector((state) => state.event.curEvent);
  const curRole = useSelector((state) => state.role.curRole);

  return (
    <BottomTabNavigation
      {...props}
      navigation={navigation}
      route={route}
      dispatch={dispatch}
      curRole={curRole}
    />
  );
}
