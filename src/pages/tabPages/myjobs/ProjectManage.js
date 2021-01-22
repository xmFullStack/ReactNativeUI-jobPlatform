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

import {useNavigation, useRoute} from '@react-navigation/native';
import Constants, {UserRole} from '../../../utils/Constants';
import {
  OutlineButton,
  FillButton,
  PickerButton,
  CheckBox,
  ToggleButton,
} from '../../../components/Buttons';
import Divider from '../../../components/Divider';
import HeaderBar from '../../../components/HeaderBar';
import JobItem, {
  FakeJobClosed,
  FakeJobItem,
  FakeJobItemOpen,
  FakeJobItemProgress,
} from './views/JobItem';

import EmptyItem from './views/EmptyItem';

const Categories = ['Open', 'In Progress', 'Past'];



import {ProjectManageView} from './index';

class Index extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      category: Categories[0], // []
    
    };
  }

  componentDidMount() {}

  componentWillUnmount() {}

  onTapDetails = (item) => {
    const {navigation, route} = this.props;
    navigation.navigate('job_detail', {item: item});
  };

  onTapBack = ()=>{
    const {navigation, route} = this.props;
    navigation.goBack();
  }

  render() {
    const {route, navigation} = this.props;
    return (
      <View style={styles.container}>
        <HeaderBar
          title={'Projects'}
          isShowRight={false}
          isBackLeft={true}
          isShowLeft={true}
          onLeftButton={this.onTapBack}
        />

        <View style={{paddingTop: 70, flex: 1}}>
          <ProjectManageView navigation={navigation} />
        </View>
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
    paddingHorizontal: 20,
    alignItems: 'stretch',
  },
});
