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

export const ProjectReviewContent = ({onTaPost, }) => {

  const onTapEdit = ()=>{}

  return (
    <View
      style={{
        marginTop: 10,
        marginBottom: 80,
        flex: 1,
        width: Constants.WINDOW_WIDTH - 40,
        flexDirection: 'column',
        backgroundColor: Constants.backColor,
      }}>
      <Text style={styles.jobCaption}>Review</Text>
      <View style={styles.card}>
        <Text style={styles.jobCaption}>Name</Text>
        <Text style={styles.jobDesc}>Model for art1</Text>
        <TouchableOpacity style={styles.editIcon} onPress={onTapEdit}>
          <Feather name="edit-2" size={15} color={Constants.greyWhite} />
        </TouchableOpacity>
      </View>

      <View style={styles.card}>
        <Text style={styles.jobCaption}>Country</Text>
        <Text style={styles.jobDesc}>Germany</Text>
        <TouchableOpacity style={styles.editIcon} onPress={onTapEdit}>
          <Feather name="edit-2" size={15} color={Constants.greyWhite} />
        </TouchableOpacity>
      </View>

      <View style={styles.card}>
        <Text style={styles.jobCaption}>Description</Text>
        <Text style={styles.jobDesc}>
          This is description entered from outfit screen.
        </Text>
        <TouchableOpacity style={styles.editIcon} onPress={onTapEdit}>
          <Feather name="edit-2" size={15} color={Constants.greyWhite} />
        </TouchableOpacity>
      </View>

      <View style={styles.card}>
        <Text style={styles.jobCaption}>Budget</Text>
        <Text style={styles.jobDesc}>$2500 (USD)</Text>
        <TouchableOpacity style={styles.editIcon} onPress={onTapEdit}>
          <Feather name="edit-2" size={15} color={Constants.greyWhite} />
        </TouchableOpacity>
      </View>

      <View style={styles.card}>
        <Text style={styles.jobCaption}>Mood board pictures</Text>
        
        <TouchableOpacity style={styles.editIcon} onPress={onTapEdit}>
          <Feather name="edit-2" size={15} color={Constants.greyWhite} />
        </TouchableOpacity>
      </View>

      <View style={{height: 45, width: Constants.WINDOW_WIDTH - 40, flexDirection: 'row'}}>
        <FillButton
          title={'Submit Project'}
          style={{flex: 1, marginLeft: 10}}
          onPress={onTaPost}
        />
      </View>
    </View>
  );
};

class ProjectReview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isKeyboardShowing: false,
      description: '',
      model: props.model,
      images: props.images,
      description: props.description,
      budget: 0,
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

  onTapPost = ()=>{
    if(this.props.onTapPost){
      this.props.onTapPost()
    }
  }

  render() {

    return (
      <KeyboardAvoidingView
        style={{flex: 1, backgroundColor: Constants.backColor}}
        behavior={Platform.OS == 'ios' ? 'padding' : 'height'}>
        <ScrollView style={{flex: 1}}>
            <ProjectReviewContent onTaPost={this.onTapPost}/>
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}

export default ProjectReview;

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
