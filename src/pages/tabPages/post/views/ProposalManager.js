import React, {useState, useEffect, useRef} from 'react';
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
import {useNavigation, useRoute} from '@react-navigation/native';
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
import {ProjectReviewContent} from './ProjectReview.js';
import {ModelsContentView} from '../../browse/index';
import ActionSheet from '../../../../components/ActionSheet';
const Categories = ['View Project', 'Invite', 'Review', 'Hire'];

export const ViewProjectContent = ({}) => {
  const [showAction, setShowAction] = useState(false);
  const onTapMore = () => {
    setShowAction(true);
  };
  return (
    <View
      style={{
        marginTop: 10,
        marginBottom: 80,
        flex: 1,
        width:'100%',
      }}>
      <Text style={styles.jobCaption}>Review</Text>
      <View style={styles.card}>
        <Text style={styles.jobCaption}>Model for art1</Text>
        <Text style={styles.jobDesc}>Posted 32minutes ago</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.jobDesc}>Germany</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.jobDesc}>
          This is description entered from outfit screen.
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.jobDesc}>$2500 (USD)</Text>
      </View>

      <TouchableOpacity
        style={{
          top: 5,
          right: 5,
          position: 'absolute',
        
          width: 26,
          height: 26,
          justifyContent:'center',
          alignItems:'center',
          borderRadius: 13,
          borderWidth: 1,
          borderColor:Constants.darkGold,
          zIndex: 1000,
        }}
        onPress={onTapMore}>
        <Feather name="more-horizontal" size={20} color={Constants.darkGold} />
      </TouchableOpacity>
      <ActionSheet
        title={'Select Action'}
        titleList={['View Project',  'Edit Project', 'Remove Project']}
        onTapItem={(index, title) => {
          setShowAction(false);
        }}
        onCancel={() => {
          setShowAction(false);
        }}
        isShow={showAction}
      />
    </View>
  );
};

export const HireContent = ({}) => {
  return <ModelsContentView pageIndex={0} onChangePage={() => {}} isInvite={false} isHire={true} />;
};

class ProposalManager extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isKeyboardShowing: false,
      description: '',
      model: props.model,
      images: props.images,
      description: props.description,
      budget: 0,

      category: Categories[0],
    };
  }

  componentDidMount() {
      const {navigation} = this.props
    navigation.navigate('billing')
  }

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

  onTapCategory = (index, title) => {
    this.setState({
      category: Categories[index],
    });
  };
  onTapLeftIconHeader = () => {
    this.props.navigation.goBack();
  };
  onTapRightIconHeader = () => {};
  render() {
    const {navigation} = this.props
    return (
      <KeyboardAvoidingView
        style={{flex: 1, backgroundColor: Constants.backColor}}
        behavior={Platform.OS == 'ios' ? 'padding' : 'height'}>
        <HeaderBar
          title={'Proposal Manager'}
          isShowRight={false}
          //   rightIcon={rightIcon}

          isShowLeft={true}
          isBackLeft={true}
          onLeftButton={() => {
            this.onTapLeftIconHeader();
          }}
          onRightButton={() => {
            this.onTapRightIconHeader();
          }}
        />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            height: 30,

            paddingHorizontal: 20,
            paddingTop: 10,
            marginTop: 50,
            marginBottom: 10,
          }}>
          {Categories.map((one, index) => {
            return (
              <ToggleButton
                key={'' + index}
                title={one}
                selected={this.state.category == one}
                style={{
                  flex: 1,
                  height: 24,
                  borderRadius: 12,
                  borderWidth: 0,
                  fontSize: 13,
                  marginHorizontal: 3,
                }}
                onPress={() => {
                  this.onTapCategory(index, one);
                }}
              />
            );
          })}
        </View>
        <View
          style={{
            paddingHorizontal: 20,
            flex: 1,
          }}>
          {this.state.category != Categories[1] &&
            this.state.category != Categories[3] && (
              <ScrollView
                style={{flex: 1}}
                contentContainerStyle={{
                  width: Constants.WINDOW_WIDTH - 40,
                }}>
                {this.state.category == Categories[0] && <ViewProjectContent />}

                {this.state.category == Categories[2] && (
                  <ProjectReviewContent />
                )}
              </ScrollView>
            )}

          {this.state.category == Categories[1] && (
            <ModelsContentView pageIndex={0} onChangePage={() => {}} isInvite={true} isHire={true}  />
          )}
          {this.state.category == Categories[3] && <HireContent />}
        </View>
      </KeyboardAvoidingView>
    );
  }
}

export default function () {
  const navigation = useNavigation();
  const route = useRoute();

  return <ProposalManager navigation={navigation} route={route} />;
}

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
  editIcon: {
    position: 'absolute',
    top: 5,
    right: 5,
  },
});
