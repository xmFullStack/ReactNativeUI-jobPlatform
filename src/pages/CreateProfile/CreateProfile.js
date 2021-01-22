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
import FirstView from './StepViews/FirstView';
import SecondView from './StepViews/SecondView';
import ThirdView from './StepViews/ThirdView';
import ForthView from './StepViews/ForthView';
import FifthView from './StepViews/FifthView';
import SixthView from './StepViews/SixthView';
import SeventhView from './StepViews/SeventhView';
import Complete from './StepViews/Complete';
import ProgressStep from '../../components/ProgressStep';

const ModelSection = ({step, onSubmitComplete}) => {
  return (
    <>
      {step == 1 && <FirstView />}
      {step == 2 && <SecondView />}
      {step == 3 && (
        <ThirdView
          hourlyRate={0.0}
          onChangeHourlyRate={(hourly) => {}}
          fee={0.0}
          onChangeFee={(fee) => {}}
          receive={0.0}
          onChangeReceive={(receive) => {}}
        />
      )}
      {step == 4 && (
        <ForthView
          onChangeProfessional={(professional) => {}}
          onChangeTitle={(title) => {}}
          userRole={global.curUser.role}
        />
      )}
      {step == 5 && <FifthView onChangeProfile={() => {}} userRole={global.curUser.role} />}
      {step == 6 && <SixthView />}
      {step == 7 && <SeventhView />}
      {step == 8 && <Complete onSubmit={onSubmitComplete} />}
    </>
  );
};


const DesignerSection = ({step, onSubmitComplete})=>{

  return(
    <>
    {step == 1 && (
      <ForthView
        onChangeProfessional={(professional) => {}}
        onChangeTitle={(title) => {}}
        userRole={global.curUser.role}
      />
    )}
    {step == 2 && <FifthView onChangeProfile={() => {}} userRole={global.curUser.role} />}
    {step == 3 && <SixthView />}
    {step == 4 && <SeventhView />}
    {step == 5 && <Complete onSubmit={onSubmitComplete} />}
  </>
  )
}

class CreateProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      step: 1,
      maxStep: global.curUser.role == UserRole.Designer ? 5 : 8
    };
  }

  componentDidMount() {}

  componentWillUnmount() {}

  onTapGoogle() {}

  onSubmitComplete = () => {
    const {route, navigation} = this.props;
    navigation.navigate('bottom_tab');
  };

  render() {
    const {route, navigation} = this.props;

    let title =
      global.curUser.role == UserRole.Designer
        ? 'Create Designer Profile'
        : 'Create Model Profile';
    return (
      <View style={styles.container}>
        <HeaderBar
          title={title}
          isShowRight={true}
          isBackLeft={true}
          isShowLeft={false}
          rightIcon={
            <FontAwesome name="user" size={20} color={Constants.lightGold} />
          }
          onLeftButton={() => {
            navigation.goBack();
          }}
        />
        <View style={{width: Constants.WINDOW_WIDTH}}>
          <ProgressStep
            totalCount={this.state.maxStep}
            value={this.state.step}
            style={{height: 5, marginBottom: 10}}
          />
        </View>

        <ScrollView
          style={styles.scrollContainer}
          contentContainerStyle={styles.scrollContentContainer}>
   
          {global.curUser.role == UserRole.Designer && (
            <DesignerSection
              step={this.state.step}
              onSubmitComplete={this.onSubmitComplete}
            />
          )}

          {global.curUser.role == UserRole.Model && (
            <ModelSection
              step={this.state.step}
              onSubmitComplete={this.onSubmitComplete}
            />
          )}
        </ScrollView>

        {this.state.step < this.state.maxStep && (
          <View style={styles.buttonView}>
            {/* {this.state.step != 6 && false && (
              <OutlineButton
                title="Skip this step"
                style={{marginVertical: 10}}
                onPress={() => {
                  let step = this.state.step + 1;
                  this.setState({
                    step: step,
                  });
                }}
              />
            )} */}

            <View
              style={{
                flexDirection: 'row',
              }}>
              <OutlineButton
                title={
                  <FontAwesome
                    name="chevron-left"
                    size={20}
                    color={Constants.darkGold}
                  />
                }
                style={{marginVertical: 10, width: 40, marginRight: 5}}
                onPress={() => {
                  if (this.state.step > 1) {
                    let step = this.state.step - 1;
                    this.setState({
                      step: step,
                    });
                  }
                }}
              />
              <FillButton
                title="Next"
                style={{marginVertical: 10, flex: 1}}
                onPress={() => {
                  let step = this.state.step + 1;
                  this.setState({
                    step: step,
                  });
                }}
              />
            </View>
          </View>
        )}
      </View>
    );
  }
}

export default function () {
  const navigation = useNavigation();
  const route = useRoute();

  return <CreateProfile navigation={navigation} route={route} />;
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
});
