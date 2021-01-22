import React, {useEffect, useState} from 'react';
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
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {useNavigation, useRoute} from '@react-navigation/native';

import Constants, { UserRole } from '../../utils/Constants';
const logoImage = require('../../../assets/logo.png');
import Divider from '../../components/Divider';
import HeaderBar from '../../components/HeaderBar';
import {
  OutlineButton,
  FillButton,
  PickerButton,
  CheckBox,
} from '../../components/Buttons';

import {InputOutLine} from '../../components/Inputs';
import PickerModal, {CountryList} from '../../components/PickerModal';

const SecondSection = () => {
  return (
    <View>
      <Text style={styles.caption}>
        To provide a unique experience for all users, and to get the best.
      </Text>
      <Text style={styles.subTitle}>Here's how it works:</Text>

      <View
        style={{
          paddingHorizontal: 10,
        }}>
        <Text style={styles.subTitle}>
          1. Fill out your profile thoroughly and accurately
        </Text>
        <Text style={styles.subTitle}>2. Submit your profile</Text>
        <Text style={styles.subTitle}>
          3. You will receive an email to let you know if you ware accepted 
        </Text>
      </View>
      <Text style={styles.subTitle}>
        We are currently experiencing high number of applications. Create a
        stand-out profile to increase your chances of getting approved!
      </Text>
    </View>
  );
};

const FirstSection = () => {
  return (
    <View style={{alignItems: 'flex-start'}}>
      <Text style={styles.caption}>Hi, Xxxxx</Text>
      <Text style={styles.subTitle}>
        Thanks for joining Fashion Army Club, An exceptional fashion platform,
        specially designed to assemble & establish a unique partnership
        experience between the designers and models worldwide.
      </Text>

      <Text style={styles.subTitle}>
        To get started, all you need to do is fill out of profile.
      </Text>
    </View>
  );
};

class AfterFirst extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      step: 1,
    };
  }

  componentDidMount() {}

  componentWillUnmount() {}
  onTapGoogle() {}

  render() {
    const {route, navigation} = this.props;
    let title = global.curUser.role == UserRole.Designer ? 'Create Designer Profile' : 'Create Model Profile'

    return (
      <View style={styles.container}>
        <HeaderBar
          title={title}
          isShowRight={true}
          isBackLeft={true}
          isShowLeft={true}
          rightIcon={
            <FontAwesome name="user" size={20} color={Constants.lightGold} />
          }
          onLeftButton={() => {
            navigation.goBack();
          }}
        />
        <ScrollView
          style={styles.scrollContainer}
          contentContainerStyle={styles.scrollContentContainer}>
          {this.state.step == 1 && (
            <Image style={styles.logoImage} source={logoImage} />
          )}

          {this.state.step == 1 && <FirstSection />}
          {this.state.step == 2 && <SecondSection />}
          <View style={styles.buttonView}>
            <FillButton
              title="Continue"
              style={{marginVertical: 10}}
              onPress={() => {
                if (this.state.step == 2) {
                  navigation.navigate('create_profile');
                  return;
                }
                let step = this.state.step + 1;
                this.setState({
                  step: step,
                });
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

  return <AfterFirst navigation={navigation} route={route} />;
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
    marginTop: 5,
    width: '100%',
    // alignItems: 'center',
  },

  scrollContainer: {
    flex: 1,
  },
  scrollContentContainer: {
    width: Constants.WINDOW_WIDTH - 60,
    // height: Constants.WINDOW_HEIGHT - 50,
    alignItems: 'center',
  },
  caption: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Constants.greyWhite,
  },
  subTitle: {
    fontSize: 15,
    color: Constants.greyWhite,
    marginVertical: 10,
  },
});
