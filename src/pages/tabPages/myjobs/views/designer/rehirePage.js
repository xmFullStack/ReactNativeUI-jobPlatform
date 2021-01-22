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
import Constants, {UserRole} from '../../../../../utils/Constants';
import {
  OutlineButton,
  FillButton,
  PickerButton,
  CheckBox,
  ToggleButton,
} from '../../../../../components/Buttons';
import Divider from '../../../../../components/Divider';
import HeaderBar from '../../../../../components/HeaderBar';
import JobItem, {
  FakeJobClosed,
  FakeJobItem,
  FakeJobItemOpen,
  FakeJobItemProgress,
} from '../JobItem';
import Feather from 'react-native-vector-icons/Feather';
import EmptyItem from '../EmptyItem';
import {ModelsList} from '../../../browse/index';
import {InputOutLine} from '../../../../../components/Inputs';

const RehirePage = ({}) => {
  const navigation = useNavigation();
  const route = useRoute();

  const [searchVal, setSearchVal] = React.useState('');
  const onTapRehire = () => {};

  const onTapPost = () => {};

  const onTapPostingsItem = () => {
    navigation.navigate('project_manage', {});
  };

  const onTapModelItem = (model) => {
    navigation.navigate('model_detail_screen', {model: model});
  };

  const onTapInTouch = () => {
    navigation.navigate('chat_dlg');
  };

  const onSearchSubmit = (e) => {};

  const onTapBack = ()=>{
    navigation.goBack()
  }
  return (
    <View style={styles.container}>
      <HeaderBar
        title={'Rehire'}
        isShowRight={false}
        isBackLeft={true}
        isShowLeft={true}
        onLeftButton={onTapBack}
      />

      <View
        style={{paddingTop: 70,paddingHorizontal: 20, width: '100%'}}>
        <View style={{width: '100%',}}>
          <InputOutLine
            icon={
              <Feather name="search" size={20} color={Constants.darkGold} />
            }
            placeholder={'Search ...'}
            placeholderTextColor={Constants.darkGold}
            onChangeText={(val) => {
              setSearchVal(val);
            }}
            value={searchVal ?? ''}
            style={{}}
            onSubmitEditing={onSearchSubmit}
          />
        </View>       
      </View>
      <ModelsList
            style={{
              flex: 1,
              width: '100%',
              paddingHorizontal: 20,
            }}
            onTapInTouch={onTapInTouch}
            onTapItem={(model) => {
              onTapModelItem(model);
            }}
          />
    </View>
  );
};

export default RehirePage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Constants.backColor,

    alignItems: 'center',
  },
  progressContainer: {width: Constants.WINDOW_WIDTH, paddingTop: 60},
  mainContainer: {width: '100%', flex: 1},
  reviewPoint: {
    fontSize: 14,
    paddingHorizontal: 10,
    paddingVertical: 3,
    marginRight: 20,
    width: 50,
    borderRadius: 3,
    color: 'white',
    textAlign: 'center',
    backgroundColor: Constants.darkGold,
  },
});
