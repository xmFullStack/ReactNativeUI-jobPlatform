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
  unstable_enableLogBox,
  Alert,
} from 'react-native';

import {useNavigation, useRoute} from '@react-navigation/native';
import Constants from '../../utils/Constants';
import {
  OutlineButton,
  FillButton,
  PickerButton,
  CheckBox,
  ToggleButton,
  CheckButton,
} from '../../components/Buttons';
import Divider from '../../components/Divider';
import HeaderBar from '../../components/HeaderBar';

import ProgressBar from 'react-native-animated-progress';

import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import Feather from 'react-native-vector-icons/Feather';
import {InputOutLine} from '../../components/Inputs';

const PayOption = {
  card: 1,
  paypal: 2,
};
class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      payOption: PayOption.card,
    };
  }

  componentDidMount() {
    const {navigation, route} = this.props;
    this.unsubscribe = navigation.addListener('focus', () => {});
  }

  componentWillUnmount() {
    if (this.unsubscribe) {
      this.unsubscribe();
    }
  }

  onTapLeftIconHeader = () => {
    const {route, navigation} = this.props;
    navigation.goBack();
  };

  render() {
    const {route, navigation} = this.props;

    return (
      <View style={styles.container}>
        <HeaderBar
          title={'Verify your billing method'}
          isShowRight={false}
          isBackLeft={true}
          isShowLeft={true}
          onLeftButton={() => {
            this.onTapLeftIconHeader();
          }}
        />

        <ScrollView style={styles.mainContainer}>
          <Text style={styles.jobDesc}>
            To proceed, set up a billing method below.
          </Text>
          <View style={{...styles.row, marginTop: 10}}>
            <View style={{marginTop: 5}}>
              <Feather name="shield" size={20} color={Constants.greyWhite} />
            </View>

            <Text style={{...styles.jobDesc, flex: 1}}>
              Fashion Army Club payment and quality protection, only pay or
              release the milestone after you satisfied and receive back all
              your items.
            </Text>
          </View>

          <CheckButton
            title={'Payment Card'}
            isChecked={this.state.payOption == PayOption.card}
            style={{marginTop: 10}}
            onChange={(val) => {
              this.setState({
                payOption: val ? PayOption.card : PayOption.paypal,
              });
            }}
            selColor={Constants.darkGold}
            defColor={Constants.greyWhite}
          />
          {this.state.payOption == PayOption.card && (
            <>
              <Text style={styles.jobDesc}>Card Number</Text>
              <InputOutLine
                placeholder={''}
                placeholderTextColor={Constants.darkGold}
                onChangeText={(val) => {
                  this.setState({cardNumber: val});
                }}
                errorMessage={this.state.pwdInvalidMessage}
                successMessage={this.state.pwdValidMessage}
                value={this.state.cardNumber}
              />
              <Text style={styles.jobDesc}>First Name</Text>
              <InputOutLine
                placeholder={''}
                placeholderTextColor={Constants.darkGold}
                onChangeText={(val) => {
                  this.setState({cardNumber: val});
                }}
                errorMessage={this.state.pwdInvalidMessage}
                successMessage={this.state.pwdValidMessage}
                value={this.state.cardNumber}
              />
              <Text style={styles.jobDesc}>Last Name</Text>
              <InputOutLine
                placeholder={''}
                placeholderTextColor={Constants.darkGold}
                onChangeText={(val) => {
                  this.setState({cardNumber: val});
                }}
                errorMessage={this.state.pwdInvalidMessage}
                successMessage={this.state.pwdValidMessage}
                value={this.state.cardNumber}
              />
              <Text style={styles.jobDesc}>Expires On</Text>
              <InputOutLine
                placeholder={''}
                placeholderTextColor={Constants.darkGold}
                onChangeText={(val) => {
                  this.setState({cardNumber: val});
                }}
                errorMessage={this.state.pwdInvalidMessage}
                successMessage={this.state.pwdValidMessage}
                value={this.state.cardNumber}
              />
              <Text style={styles.jobDesc}>Security Code</Text>
              <InputOutLine
                placeholder={''}
                placeholderTextColor={Constants.darkGold}
                onChangeText={(val) => {
                  this.setState({cardNumber: val});
                }}
                errorMessage={this.state.pwdInvalidMessage}
                successMessage={this.state.pwdValidMessage}
                value={this.state.cardNumber}
              />
              <FillButton
                title={'Continue'}
                onPress={() => {}}
                style={{marginTop: 5}}
              />
            </>
          )}
          <View style={{flexDirection: 'row', width: '100%'}}>
            <View style={{width: 28}}>
              <CheckButton
                title={''}
                isChecked={this.state.payOption == PayOption.paypal}
                style={{marginTop: 10}}
                onChange={(val) => {
                  this.setState({
                    payOption: val ? PayOption.paypal : PayOption.card,
                  });
                }}
                selColor={Constants.darkGold}
                defColor={Constants.greyWhite}
              />
            </View>
            <TouchableOpacity
              style={{width: 100, height: 40, marginTop: 13, justifyContent:'center'}}
              onPress={() => {
                this.setState({
                  payOption: this.state.payOption == PayOption.paypal ? PayOption.card : PayOption.paypal,
                });
              }}>
              <Image
                style={{width: 100, height: 40}}
                source={require('../../../assets/paypal.png')}
                resizeMode={'contain'}
              />
            </TouchableOpacity>
          </View>
          {this.state.payOption == PayOption.paypal && (
            <View style={{width: '100%', height:120}}>
              <Text style={styles.jobDesc}>
                You'll be required to PayPal to link a verified account.
              </Text>
              <FillButton title={'Link PayPal Account'} onPress={() => {}} style={{marginTop: 20,}} />
            </View>
          )}
        </ScrollView>
      </View>
    );
  }
}

export default function () {
  const navigation = useNavigation();
  const route = useRoute();

  return <Index navigation={navigation} route={route} />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Constants.backColor,
    alignItems: 'center',
  },
  progressContainer: {width: Constants.WINDOW_WIDTH, paddingTop: 60},
  mainContainer: {width: '100%', paddingHorizontal: 20, flex: 1, marginTop: 60},
  jobCaption: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 6,
    color: Constants.greyWhite,
  },
  jobDesc: {
    fontSize: 14,
    marginVertical: 3,
    color: Constants.greyWhite,
    paddingLeft: 5,
    marginTop: 5,
  },
  card: {
    paddingVertical: 10,
    marginVertical: 5,
    paddingHorizontal: 5,
  },
  row: {
    flexDirection: 'row',
    width: '100%',
  },
});
