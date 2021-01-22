import React from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Text,
  FlatList,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  SafeAreaView,
} from 'react-native';

import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';


import {
  OutlineButton,
  FillButton,
  PickerButton,
  CheckBox,
  ToggleButton,
} from '../../../../components/Buttons';

import RestAPI from '../../../../utils/RestAPI';
import Constants, {StatusBarHeight, isIOS} from '../../../../utils/Constants';
import {HeaderBar} from '../../../../components/HeaderBar';

import GradientButton from '../../../../components/GradientButton';
import {InputOutLine} from '../../../../components/Inputs';

export const PricingCard = ({price, currency, title, sub1, sub2, onPress}) => {
  return (
    <View
      style={{
        width: Constants.WINDOW_WIDTH * 0.9,
        // borderColor: Constants.lightGold,
        // borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 20,
        paddingVertical: 20,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Text style={{color: Constants.lightGold, fontSize: 20}}>{title}</Text>
      <Text
        style={{
          fontSize: 40,
          color: Constants.lightBlue,
          fontWeight: 'bold',
        }}>
        {currency}
        {price}
      </Text>
      <Text
        style={{
          fontSize: 20,
          color: Constants.grayColor,
          marginVertical: 10,
        }}>
        {sub1}
      </Text>
      <Text
        style={{
          fontSize: 20,
          color: Constants.grayColor,
          marginVertical: 10,
        }}>
        {sub2}
      </Text>
      <GradientButton
        title={'CHOOSE'}
        style={{height: 40, width: '90%'}}
        onPress={() => {
          onPress(price);
        }}
      />
    </View>
  );
};

class PricingPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isKeyboardShowing: false,
      description: '',
      model: props.model,
      images: props.images,
      description: props.description,
      budget: 0
    };
  }

  componentDidMount() {}

  componentWillUnmount() {}

  onTapPrice = (price) => {
    if (this.props.onTapPrice) {
      this.props.onTapPrice(price);
    }
  };

  onTapNext = () => {
 
    if (this.props.onNext) {
      this.props.onNext();
    }
  };


  onTapBack = () => {
    if (this.props.onBack) {
      this.props.onBack();
    }
  };

  render() {
    const {model} = this.props;
    return (
      <KeyboardAvoidingView
        style={{flex: 1, backgroundColor: Constants.backColor}}
        behavior={Platform.OS == 'ios' ? 'padding' : 'height'}>
        <ScrollView style={{flex: 1}}>
          <View
            style={{
              marginTop: 10,
              marginBottom: 80,
              flex: 1,
              flexDirection: 'column',
              backgroundColor: Constants.backColor,
            }}>

            <Text style={styles.jobCaption}>What is the project budget?</Text>
            <InputOutLine
              icon={
                <Feather
                  name="dollar-sign"
                  color={Constants.darkGold}
                  size={15}
                />
              }
              style={{}}
              placeholder={''}
              placeholderTextColor={Constants.darkGold}
              onChangeText={(val) => {
                this.setState({budget: val})
              }}
              value={this.state.budget}
            />

          </View>
        </ScrollView>
        <View style={{height: 45, width: '100%', flexDirection: 'row'}}>
            <OutlineButton
              title={'Back'}
              style={{flex: 1}}
              onPress={this.onTapBack}
            />
            <FillButton
              title={'Next'}
              style={{flex: 1, marginLeft: 10}}
              onPress={this.onTapNext}
            />
          </View>
      </KeyboardAvoidingView>
    );
  }
}

export default PricingPage;

const styles = StyleSheet.create({
  input: {
    borderColor: Constants.darkGold,
    borderRadius: 10,
    borderWidth: 1,
    height: 45,
    padding: 10,
    marginVertical: 7,
    backgroundColor: 'white',
  },
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
  },
  card: {
    paddingVertical: 10,
    marginVertical: 5,
    paddingHorizontal: 5,
  },
});
