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
} from 'react-native';


import {Provider, connect, useDispatch, useSelector} from 'react-redux';
import {updateEvent, updateRole, fetchEvents} from '../store/actions';

import {useNavigation, useRoute} from '@react-navigation/native';
import Constants, {UserRole} from '../utils/Constants';

import {
  OutlineButton,
  FillButton,
  AppleButton,
  GoogleButton,
  FBButton,
} from '../components/Buttons';
const logoImage = require('../../assets/logo.png');

// const mapStateToProps = (state) => ({
//   events: state.allEvents,
//   curEvent: state.curEvent,
//   curRole: state.curRole,
// });

// const mapDispatchToProps = (dispatch) => ({
//   updateEvents: () => dispatch(updateEvent),
//   updateRole: () => dispatch(updateRole),
//   fetchEvents: () => dispatch(fetchEvents),
// });

class Index extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const {
      navigation,
      route,
      dispatch,
      allEvents,
      curRole,
      curEvent,
    } = this.props;
    dispatch(updateRole('model_role'))
    // console.warn('from Index allEvents:',  allEvents?.length);
  }

  componentWillUnmount() {}

  onTapLogin = () => {
    const {navigation, route} = this.props;
    navigation.navigate('login');
  };

  onTapSignup = () => {
    const {navigation, route} = this.props;
    navigation.navigate('signup');
  };

  render() {
    const {
      navigation,
      route,
      dispatch,
      allEvents,
      curRole,
      curEvent,
    } = this.props;
  
    return (
      <View style={styles.container}>

        <Image style={styles.logoImage} source={logoImage} />
        <View style={styles.buttonView}>
          <TouchableOpacity
            style={styles.loginButton}
            onPress={this.onTapLogin}>
            <Text style={styles.btnText}>Log In</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.signUpButton}
            onPress={this.onTapSignup}>
            <Text style={styles.signupTitle}>
              New to FashionArmy? {'   '}Sign Up
            </Text>
          </TouchableOpacity>

        </View>
      </View>
    );
  }
}

export default function () {
  const navigation = useNavigation();
  const route = useRoute();

  const dispatch = useDispatch();
  const allEvents = useSelector((state) => state.event.allEvents);
  const curEvent = useSelector((state) => state.event.curEvent);
  const curRole = useSelector((state) => state.role.curRole);

  // React.useEffect(() => {
  //   dispatch(fetchEvents());
  // }, []);

  // console.warn('allEvents function > ', curRole)

  return (
   
      <Index
        navigation={navigation}
        route={route}
        dispatch={dispatch}
        allEvents={allEvents}
        curEvent={curEvent}
        curRole={curRole}
      />
  
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Constants.backColor,
    paddingHorizontal: 30,
    alignItems: 'center',
  },
  logoImage: {
    width: Constants.WINDOW_WIDTH * 0.5,
    resizeMode: 'contain',
    marginTop: 60,
  },
  buttonView: {
    position: 'absolute',
    bottom: 40,
    width: '100%',
  },
  btnText: {
    fontSize: 18,
  },
  loginButton: {
    height: 40,
    backgroundColor: Constants.darkGold,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
  },
  signUpButton: {
    paddingVertical: 10,
    marginTop: 30,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  signupTitle: {
    color: Constants.lightGold,
    fontSize: 15,
  },
});
