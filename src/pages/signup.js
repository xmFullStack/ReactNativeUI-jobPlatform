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
  Alert,
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

class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
    };
  }

  componentDidMount() {}

  componentWillUnmount() {}
  onTapGoogle() {}

  onTapContinue = () => {
   
    const {navigation, route} = this.props;
    navigation.navigate('first_step');
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

            <Text style={styles.caption}>Get your free account</Text>

            <GoogleButton onPress={() => {}} />
            <FBButton onPress={()=>{}}/>
            <Divider title={'or'} style={{marginVertical: 15}} />
            <InputOutLine
              icon={
                <FontAwesome
                  name="envelope"
                  color={Constants.darkGold}
                  size={18}
                />
              }
              placeholder={'Work email address'}
              placeholderTextColor={Constants.darkGold}
              onChangeText={(val) => {
                this.setState({email: val});
              }}
              style={{width: '100%'}}
              value={this.state.email}
            />

            <FillButton
              title="Continue with Email"
              onPress={() => {
                this.onTapContinue();
              }}
            />
          </View>
        </ScrollView>
      </View>
    );
  }
}

export default function () {
  const navigation = useNavigation();
  const route = useRoute();

  return <SignUp navigation={navigation} route={route} />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Constants.backColor,
    paddingHorizontal: 30,
    alignItems: 'center',
    paddingTop: 60,
  },
  logoImage: {
    width: Constants.WINDOW_WIDTH * 0.5,
    height: Constants.WINDOW_WIDTH * 0.5,
    resizeMode: 'contain',
  },
  buttonView: {
    //   position: 'absolute',
    //   bottom: 40,
    marginTop: 80,
    width: '100%',
    alignItems: 'center',
  },

 

  appleButton: {
    height: 40,
    paddingVertical: 10,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    backgroundColor: Constants.white,
    marginVertical: 10,
  },

  scrollContainer: {
    flex: 1,
  },
  scrollContentContainer: {
    width: Constants.WINDOW_WIDTH - 60,
    height: Constants.WINDOW_HEIGHT - 50,
    alignItems: 'center',
  },
  caption: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Constants.darkGold,
  },

});
