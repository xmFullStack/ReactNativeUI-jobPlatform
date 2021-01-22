import React, {useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Image,
  TouchableOpacity,
  TextInput,
  unstable_enableLogBox,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {useNavigation, useRoute} from '@react-navigation/native';

import Constants from '../utils/Constants';
const logoImage = require('../../assets/logo.png');
import Divider from '../components/Divider';
import HeaderBar from '../components/HeaderBar';
import {
  OutlineButton,
  FillButton,
  AppleButton,
  GoogleButton,
  FBButton
} from '../components/Buttons';
const googleLogo = require('../../assets/google_logo.png');

import {InputOutLine} from '../components/Inputs';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',

      emailErrMessage: null,
      emailValidMessage: null,
      pwdValidMessage: null,
      pwdInvalidMessage: null,
    };
  }

  componentDidMount() {}

  componentWillUnmount() {}
  onTapGoogle =( )=> {
    const {navigation, route} = this.props;
    navigation.navigate('bottom_tab');
  }

  onTapApple = ()=> {
    const {navigation, route} = this.props;
    navigation.navigate('bottom_tab');
  }

  onTapContinue = () => {
    const {navigation, route} = this.props;

    if (this.state.emailValidMessage === null) {
      this.setState({emailValidMessage: 'Correct email!'});
    } else {
      this.setState({pwdValidMessage: 'Correct password!'}, () => {
        navigation.navigate('bottom_tab');
      });
    }
  };
  render() {
    const {route, navigation} = this.props;

    return (
      <View style={styles.container}>
        <HeaderBar
          isShowRight={false}
          isBackLeft={true}
          isShowLeft={true}
          onLeftButton={() => {
            navigation.goBack();
          }}
        />
        <ScrollView
          style={styles.scrollContainer}
          contentContainerStyle={styles.scrollContentContainer}>
          <Image style={styles.logoImage} source={logoImage} />
          <View style={styles.buttonView}>
            <InputOutLine
              placeholder={'User name or email'}
              placeholderTextColor={Constants.darkGold}
              onChangeText={(val) => {
                this.setState({email: val});
              }}
              errorMessage={this.state.emailErrMessage}
              successMessage={this.state.emailValidMessage}
              value={this.state.email}
            />
            {!!this.state.emailValidMessage && (
              <InputOutLine
                placeholder={'Password'}
                placeholderTextColor={Constants.darkGold}
                onChangeText={(val) => {
                  this.setState({email: val});
                }}
                errorMessage={this.state.pwdInvalidMessage}
                successMessage={this.state.pwdValidMessage}
                value={this.state.email}
              />
            )}

            <FillButton title={'Continue'} onPress={this.onTapContinue} />
            <Divider title={'or'} style={{marginVertical: 15}} />
            <GoogleButton onPress={this.onTapGoogle} />
            <FBButton onPress={()=>{}}/>
            <AppleButton onPress={this.onTapApple} />
          </View>
        </ScrollView>
      </View>
    );
  }
}

export default function () {
  const navigation = useNavigation();
  const route = useRoute();

  return <Login navigation={navigation} route={route} />;
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
    marginTop: 10,
  },
  buttonView: {
    marginTop: 15,
    // position: 'absolute',
    // bottom: 40,
    width: '100%',
  },

  scrollContainer: {
    flex: 1,
  },
  scrollContentContainer: {
    width: Constants.WINDOW_WIDTH - 60,
    // height: Constants.WINDOW_HEIGHT - 50,
    alignItems: 'center',
  },
});
