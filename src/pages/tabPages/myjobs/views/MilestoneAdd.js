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
import Feather from 'react-native-vector-icons/Feather';
import {useNavigation, useRoute} from '@react-navigation/native';
import Constants from '../../../../utils/Constants';
import Utils from '../../../../utils/Utils';
import {
  OutlineButton,
  FillButton,
  PickerButton,
  CheckBox,
  ToggleButton,
} from '../../../../components/Buttons';
import Divider from '../../../../components/Divider';
import HeaderBar from '../../../../components/HeaderBar';
import JobItem, {FakeJobItem} from './JobItem';
import PropTypes from 'prop-types';
import SegViews from '../../../../components/SegView';
import {InputOutLine} from '../../../../components/Inputs';
import PickerModal, {
  CountryList,
  CurrencyList,
} from '../../../../components/PickerModal';
import FontAwesome from 'react-native-vector-icons/FontAwesome';



class MilestoneAdd extends React.Component {
  constructor(props) {
    super(props);
    const {route, navigation} = props;

    const {item} = route.params;

    this.state = {
      jobItem: item,
      segIndex: 0,
      priceErrMessage: null,
      price: 0.0,
      desc: null,
      descErrMessage: null,
      currency: 'USD',
      showCurrencyPicker: false,
    };
  }

  componentDidMount() {}

  componentWillUnmount() {}

  render() {
    const {route, navigation} = this.props;
    const {jobItem} = this.state;

    const showSegView =
      jobItem.status == 'progress' || jobItem.status == 'closed';

    return (
      <>
        <View style={styles.container}>
          <HeaderBar
            title={'Create Milestone'}
            isShowRight={false}
            isBackLeft={true}
            isShowLeft={true}
            onLeftButton={() => {
              navigation.goBack();
            }}
          />

          <ScrollView style={{flex: 1}} contentContainerStyle={{}}>
            <View style={{paddingTop: 70}}>
              <Text style={styles.jobTitle}>{jobItem.title}</Text>
              <Text style={styles.jobStatus}>
                {jobItem.status.toUpperCase()}
              </Text>

              <InputOutLine
                placeholder={'Enter description'}
                placeholderTextColor={Constants.darkGold}
                onChangeText={(val) => {
                  this.setState({desc: val});
                }}
                errorMessage={this.state.descErrMessage}
                keyboardType={'default'}
                maxLength={1000}
                multiline={true}
                style={{
                  height: 100,
                  marginVertical: 10,
                }}
                value={this.state.desc}
              />

              <View style={{flexDirection: 'row', marginTop: 10}}>
                <PickerButton
                  title={this.state.currency}
                  style={{
                    flex:1,
                    color: Constants.darkGold,
                    marginRight: 5,
                    marginTop: 5,
                  }}
                  onPress={() => {
                    this.setState({
                      showCurrencyPicker: true,
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

                <InputOutLine
                  icon={
                    <Feather
                      name="dollar-sign"
                      size={24}
                      color={Constants.darkGold}
                    />
                  }
                  placeholder={'Enter price'}
                  placeholderTextColor={Constants.darkGold}
                  onChangeText={(val) => {
                    this.setState({price: val});
                  }}
                  errorMessage={this.state.priceErrMessage}
                  keyboardType={'numeric'}
                  style={{flex:2,}}
                  // successMessage={this.state.emailValidMessage}
                  value={this.state.price}
                />
              </View>

              <FillButton
                title={'Create Milestone'}
                onPress={() => {
                  navigation.goBack();
                }}
                style={{
                    marginTop: 10,
                }}
              />
            </View>
          </ScrollView>
          <PickerModal
            isShow={this.state.showCurrencyPicker}
            pickList={CurrencyList}
            onTapSelect={(index, val) => {
              this.setState({
                currency: val,
                showCurrencyPicker: false,
              });
            }}
            onTapClose={() => {
              this.setState({
                showCurrencyPicker: false,
              });
            }}
          />
        </View>
      </>
    );
  }
}

export default function () {
  const navigation = useNavigation();
  const route = useRoute();

  return <MilestoneAdd navigation={navigation} route={route} />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Constants.backColor,
    paddingHorizontal: 20,
    alignItems: 'stretch',
  },
  jobTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Constants.greyWhite,
    marginVertical: 5,
  },
  jobStatus: {
    fontSize: 23,
    color: Constants.blueColor,
    marginVertical: 9,
  },
  jobDesc: {
    fontSize: 15,
    color: Constants.greyWhite,
    marginVertical: 10,
  },
  jobMilestoneDesc: {
    fontSize: 13,
    color: Constants.greyWhite,
    marginVertical: 3,
  },
  jobCaption: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 6,
    color: Constants.greyWhite,
  },
  milestoneCaption: {
    fontSize: 14,
    fontWeight: 'bold',
    marginVertical: 2,
    color: Constants.greyWhite,
  },
  jobBudget: {
    fontSize: 21,
    color: Constants.greyWhite,
    marginVertical: 6,
  },
  jobMilestoneBudget: {
    fontSize: 16,
    color: Constants.greyWhite,
    marginVertical: 3,
  },
  bidEstRow: {
    flexDirection: 'row',
    width: '100%',
    color: Constants.greyWhite,
  },
  milestoneContainer: {
    borderColor: Constants.greyWhite,
    borderWidth: 0.5,
    borderRadius: 3,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginVertical: 4,
  },
});
