/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect} from 'react';

// import {store, persistor} from './src/store/store';
import configureStore, {pStore, persistor} from './src/store/store';
import {Provider, connect} from 'react-redux';
// import {PersistGate} from 'redux-persist/integration/react';

import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import Constants, {UserRole} from './src/utils/Constants';
import VideoPlayer from 'react-native-video-player';
import SplashScreen from 'react-native-splash-screen';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {SafeAreaProvider} from 'react-native-safe-area-context';

import PageLoaderIndicator from './src/components/PageLoaderIndicator';

import Index from './src/pages/index';
import Login from './src/pages/login';
import Signup from './src/pages/signup';
import FirstStep from './src/pages/CreateProfile/FirstStep';
import AfterFirst from './src/pages/CreateProfile/AfterFirst';
import CreateProfile from './src/pages/CreateProfile/CreateProfile';

import BottomTabNavigation from './src/navigation/BottomTabNavigation';
import ProgressBar from 'react-native-animated-progress';
import JobDetail from './src/pages/tabPages/myjobs/views/JobDetail';
import MilestoneAdd from './src/pages/tabPages/myjobs/views/MilestoneAdd';

import ModelDetailScreen from './src/pages/tabPages/post/views/ModelDetailScreen';

import ChatDlg from './src/pages/tabPages/chat/ChatDlg';
import NotificationPage from './src/pages/tabPages/profile/views/NotificationPage';
import EditProfile from './src/pages/tabPages/profile/views/EditProfile';



import ModelProfile from './src/pages/tabPages/model_pages/profile/index';
import PublicProfile from './src/pages/tabPages/model_pages/profile/publicProfile';

import FiltersPage from './src/pages/tabPages/browse/views/FiltersPage';

import ProjectManage from './src/pages/tabPages/myjobs/ProjectManage';
import RehirePage from './src/pages/tabPages/myjobs/views/designer/rehirePage';
import ProposalManager from './src/pages/tabPages/post/views/ProposalManager';
import ProposalPage from './src/pages/tabPages/model_pages/proposals/index';
import ProposalDetail from './src/pages/tabPages/model_pages/proposals/views/proposal_detail';

import Post from './src/pages/tabPages/post/index';

import BillingMethod from './src/pages/billing/index';

import ProjectDetail from './src/pages/tabPages/model_pages/projects/detail';

const Stack = createStackNavigator();

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowPageLoader: false,
    };
    global.curUser = {};
    // global.curUser.role = UserRole.Designer;
  }

  init = async () => {
    global.showPageLoader = (isShow) => {
      this.setState({isShowPageLoader: isShow});
      // setIsShowPageLoader(isShow);
    };
  };

  componentDidMount() {
    SplashScreen.hide();
    this.init();
  }

  componentWillUnmount() {}

  render() {
    const {isShowPageLoader} = this.state;
    return (
      <Provider store={configureStore}>
        {/* <PersistGate loading={null} persistor={persistor}> */}

        <StatusBar barStyle="light-content" />

        <SafeAreaProvider>
          <NavigationContainer>
            <Stack.Navigator
              initialRouteName={'index'}
              headerMode="none"
              mode={'slide'}>
              <Stack.Screen name="index" component={Index} />
              <Stack.Screen name="login" component={Login} />
              <Stack.Screen name="signup" component={Signup} />
              <Stack.Screen name="first_step" component={FirstStep} />
              <Stack.Screen name="after_first" component={AfterFirst} />
              <Stack.Screen name="create_profile" component={CreateProfile} />
              <Stack.Screen name="bottom_tab" component={BottomTabNavigation} />
              <Stack.Screen name="job_detail" component={JobDetail} />
              <Stack.Screen name="milestone_add" component={MilestoneAdd} />

              <Stack.Screen
                name="model_detail_screen"
                component={ModelDetailScreen}
              />
              <Stack.Screen name="chat_dlg" component={ChatDlg} />
              <Stack.Screen name="notifications" component={NotificationPage} />
              <Stack.Screen name="edit_profile" component={EditProfile} />
              <Stack.Screen name="edit_model_profile" component={ModelProfile} />
              <Stack.Screen name="model_public_profile" component={PublicProfile} />
              
              <Stack.Screen name="filters_page" component={FiltersPage} />

              <Stack.Screen name="project_manage" component={ProjectManage} />
              <Stack.Screen name="rehire" component={RehirePage} />

              <Stack.Screen name="post" component={Post} />

              <Stack.Screen
                name="proposal_manager"
                component={ProposalManager}
              />
              <Stack.Screen name="proposal_detail" component={ProposalDetail} />

              <Stack.Screen name="billing" component={BillingMethod} />

              <Stack.Screen
                name="model_project_detail"
                component={ProjectDetail}
              />
            </Stack.Navigator>
          </NavigationContainer>

          <PageLoaderIndicator
            isPageLoader={isShowPageLoader}
            barColor={Constants.darkGold}
          />

          <StatusBar hidden={false} />
        </SafeAreaProvider>
        {/* </PersistGate> */}
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: '#fff',
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default App;
