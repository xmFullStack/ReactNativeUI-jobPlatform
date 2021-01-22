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

import {Provider, connect, useDispatch, useSelector} from 'react-redux';
import {updateEvent, updateRole, fetchEvents} from '../../store/actions';

import Constants, {UserRole} from '../../utils/Constants';
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

export const CountryPicker = ({
  style = {},
  onChangeCountry,
  initVal = CountryList[0],
}) => {
  const [country, setCountry] = useState(initVal);
  const [showCountryPicker, setShowCountryPicker] = useState(false);

  return (
    <>
      <PickerButton
        title={country}
        style={{
          color: Constants.darkGold,
          marginTop: 10,
          ...style,
        }}
        onPress={() => {
          setShowCountryPicker(true);
        }}
        leftIcon={
          <FontAwesome name={'globe'} size={18} color={Constants.darkGold} />
        }
        rightIcon={
          <FontAwesome
            name={'caret-down'}
            size={13}
            color={Constants.darkGold}
          />
        }
        isOutline={true}
      />
      <PickerModal
        isShow={showCountryPicker}
        pickList={CountryList}
        onTapSelect={(index, val) => {
          setCountry(val);
          setShowCountryPicker(false);
          onChangeCountry(val);
        }}
        onTapClose={() => {
          setShowCountryPicker(false);
        }}
      />
    </>
  );
};

class FirstStep extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showCountryPicker: false,
      country: 'Norway',
      checkedAgree1: false,
      checkedAgree2: false,

      role: UserRole.Designer,
    };

    if (!global.curUser) {
      global.curUser = {};
    }
  }

  componentDidMount() {
    const {dispatch, curRole} = this.props;
    global.curUser.role = UserRole.Designer;
    dispatch(updateRole(UserRole.Designer));
  }

  componentWillUnmount() {}
  onTapGoogle() {}

  onTapCreate() {
    const {navigation, route} = this.props;
    navigation.navigate('after_first');
  }

  onTapSetRole = (role) => {
    const {dispatch, curRole} = this.props;

    if (!global.curUser) {
      global.curUser = {};
    }

    global.curUser.role = role;
    this.setState({
      role: role,
    });
    dispatch(updateRole(role));
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
            <Text style={styles.caption}>Complete your free account setup</Text>
            <Text style={styles.subTitle}>xxx@xxx.com</Text>
            <PickerButton
              title={this.state.country}
              style={{
                color: Constants.darkGold,
                marginTop: 10,
              }}
              onPress={() => {
                this.setState({
                  showCountryPicker: true,
                });
              }}
              leftIcon={
                <FontAwesome
                  name={'globe'}
                  size={18}
                  color={Constants.darkGold}
                />
              }
              rightIcon={
                <FontAwesome
                  name={'caret-down'}
                  size={13}
                  color={Constants.darkGold}
                />
              }
              isOutline={true}
            />
            <Text style={styles.subTitle}>I am </Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                marginVertical: 10,
              }}>
              {this.state.role == UserRole.Designer ? (
                <>
                  <FillButton
                    title="A Designer"
                    style={{flex: 1, textAlign: 'center', fontSize: 13}}
                    onPress={() => {
                      this.onTapSetRole(UserRole.Designer);
                    }}
                  />
                  <OutlineButton
                    title="Model/Content Creator"
                    style={{flex: 1, textAlign: 'center', fontSize: 13}}
                    onPress={() => {
                      this.onTapSetRole(UserRole.Model);
                    }}
                  />
                </>
              ) : (
                <>
                  <OutlineButton
                    title="A Designer"
                    style={{flex: 1, textAlign: 'center', fontSize: 13}}
                    onPress={() => {
                      this.onTapSetRole(UserRole.Designer);
                    }}
                  />
                  <FillButton
                    title="Model/Content Creator"
                    style={{flex: 1, textAlign: 'center', fontSize: 13}}
                    onPress={() => {
                      this.onTapSetRole(UserRole.Model);
                    }}
                  />
                </>
              )}
            </View>

            <CheckBox
              style={{marginVertical: 5, color: Constants.greyWhite}}
              title={
                'Yes! Send me genuinely useful emails every now and then to help me get the most out of FashionArmy.'
              }
              checkColor={Constants.darkGold}
              checked={this.state.checkedAgree1}
              onChange={(val) => {
                this.setState({
                  checkedAgree1: val,
                });
              }}
            />

            <CheckBox
              style={{marginVertical: 5, color: Constants.greyWhite}}
              title={
                'Yes! I understand and agree to then FashionArmy Terms of Service, including the User Agreement and Privacy Policy.'
              }
              checkColor={Constants.darkGold}
              checked={this.state.checkedAgree2}
              onChange={(val) => {
                this.setState({
                  checkedAgree2: val,
                });
              }}
            />

            <FillButton
              title="Create My Account"
              style={{marginVertical: 10}}
              onPress={() => {
                this.onTapCreate();
              }}
            />
          </View>
        </ScrollView>
        <PickerModal
          isShow={this.state.showCountryPicker}
          pickList={CountryList}
          onTapSelect={(index, val) => {
            this.setState({
              country: val,
              showCountryPicker: false,
            });
          }}
          onTapClose={() => {
            this.setState({
              showCountryPicker: false,
            });
          }}
        />
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

  return (
    <FirstStep
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
    alignItems: 'center',
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
    marginTop: 20,
  },
});
