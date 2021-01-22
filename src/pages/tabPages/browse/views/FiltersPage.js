import React, {useEffect, useState, useRef} from 'react';
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
import Feather from 'react-native-vector-icons/Feather';
import {useNavigation, useRoute} from '@react-navigation/native';
import ActionSheet from '../../../../components/ActionSheet';
import Constants from '../../../../utils/Constants';
import HeaderBar from '../../../../components/HeaderBar';
import PickerModal from '../../../../components/PickerModal';
import {InputOutLine} from '../../../../components/Inputs';
import Divider from '../../../../components/Divider';
import {FillButton, OutlineButton} from '../../../../components/Buttons';

export const FilterLocationItem = ({title}) => {
  const countryList = [
    'Norway',
    'Canada',
    'Italy',
    'Spain',
    'Serbia',
    'Argentina',
    'Ukraine',
    'German',
    'Latvia',
  ];
  const [locationList, setLocationList] = useState([]);
  const [showPicker, setShowPicker] = useState(false);
  const [showContent, showShowContent] = useState(false);
  return (
    <View style={{width: '100%', paddingHorizontal: 15}}>
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          width: '100%',
          //   backgroundColor: Constants.secondBack,
          justifyContent: 'center',
          paddingLeft: 10,
        }}
        onPress={() => {
          showShowContent(!showContent);
        }}>
        <Text
          style={{
            color: Constants.darkGold,
            fontSize: 14,
            flex: 1,
            textAlignVertical: 'center',
          }}>
          {title}
        </Text>
        <View
          style={{
            width: 40,
            height: 40,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Feather
            name={showContent ? 'chevron-down' : 'chevron-right'}
            size={25}
            color={Constants.darkGold}
          />
        </View>
      </TouchableOpacity>
      {showContent && (
        <View style={{paddingVertical: 5, width: '100%'}}>
          <View
            style={{width: '100%', alignItems: 'flex-end', paddingRight: 20}}>
            <FillButton
              title={'Add ' + title}
              onPress={() => {
                setShowPicker(true);
              }}
              style={{height: 25, width: '33%', fontSize: 13}}
            />
          </View>

          {locationList.map((one, index) => {
            return (
              <View
                style={{
                  paddingVertical: 10,
                  paddingHorizontal: 25,
                  flexDirection: 'row',
                  justifyContent:'space-between'
                }}>
                <Text style={{fontSize: 14, color: Constants.greyWhite}}>
                  {one}
                </Text>
                <OutlineButton
                  title={<Feather name="x-circle" size={20} color={Constants.darkGold}/>}
                  style={{
                    width: 20, height: 20,borderWidth: 0
                  }}
                  onPress={() => {
                    let newLIst = locationList.filter(
                      (one, oneIndex) => index != oneIndex,
                    );
                    setLocationList(newLIst);
                  }}
                />
              </View>
            );
          })}
        </View>
      )}

      <PickerModal
        pickList={countryList}
        selectedIndex={0}
        onTapSelect={(index, val) => {
          let list = [...locationList, val];
          list = [...new Set(list)];
          setLocationList(list);
          setShowPicker(false);
        }}
        onTapClose={() => {
          setShowPicker(false);
        }}
        isShow={showPicker}
      />
    </View>
  );
};

export const FilterRateItem = ({title, inputTitle}) => {
  const [rate, setRate] = useState(3);
  const [showContent, showShowContent] = useState(false);
  return (
    <View style={{width: '100%', paddingHorizontal: 15}}>
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          width: '100%',
          paddingVertical: 5,
          paddingLeft: 10,
        }}
        onPress={() => {
          showShowContent(!showContent);
        }}>
        <Text
          style={{
            color: Constants.darkGold,
            fontSize: 14,
            flex: 1,
            textAlignVertical: 'center',
          }}>
          {title}
        </Text>
        <View
          style={{
            width: 40,
            height: 40,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Feather
            name={showContent ? 'chevron-down' : 'chevron-right'}
            size={25}
            color={Constants.darkGold}
          />
        </View>
      </TouchableOpacity>

      {showContent && (
        <View
          style={{
            paddingVertical: 5,
            paddingHorizontal: 25,
            width: '100%',
            flexDirection: 'row',
          }}>
          <InputOutLine
            placeholder={inputTitle}
            placeholderTextColor={Constants.greyWhite}
            style={{flex: 1}}
            value={rate}
            onChangeText={(val) => {
              setRate(val);
            }}
            keyboardType="number"
          />
        </View>
      )}
    </View>
  );
};

class FiltersPage extends React.Component {
  _maxPage = 0;
  constructor(props) {
    super(props);
    this.state = {
      segIndex: 0,
      models: [1, 2, 3, 4, 5, 6, 6, 7, 4, 5, 6, 6, 7],
    };
  }

  componentDidMount() {}

  componentWillUnmount() {}

  onTapLeftIconHeader = () => {
    const {navigation, route} = this.props;
    navigation.goBack();
  };
  onTapRightIconHeader = () => {};

  onTapModelItem = (model) => {
    const {navigation, route} = this.props;

    navigation.navigate('model_detail_screen', {model: model});
  };

  onTapFilterOption = () => {};

  onTapApply = ()=>{
    const {navigation, route} = this.props;
    navigation.goBack()
  }
  onTapClear = ()=> {
    const {navigation, route} = this.props;
    navigation.goBack()
  }

  render() {
    let rightIcon = null;
    const {navigation, route} = this.props;

    let title = 'Filters';

    return (
      <View style={styles.container}>
        <HeaderBar
          title={title}
          isShowRight={false}
          isShowLeft={true}
          isBackLeft={true}
          onLeftButton={() => {
            this.onTapLeftIconHeader();
          }}
          onRightButton={() => {
            this.onTapRightIconHeader();
          }}
        />

        <ScrollView style={styles.mainContainer} contentContainerStyle={{}}>
          <FilterLocationItem title={'Location'} />
          <FilterRateItem
            title={'Rate Larger than'}
            inputTitle={'Enter Rate'}
          />
          <FilterLocationItem title={'Language'} />
          <FilterRateItem title={'Review'} inputTitle={'Enter Review'} />
        </ScrollView>
        <View style={{height: 40, width:'100%' , flexDirection:'row', paddingHorizontal: 15,}}>
          <OutlineButton title={'Clear'} style={{flex:1, marginHorizontal: 5}} onPress={this.onTapClear}/>
          <FillButton title={'Apply'} style={{flex:1, marginHorizontal: 5}} onPress={this.onTapApply}/>
        </View>
      </View>
    );
  }
}

export default function () {
  const navigation = useNavigation();
  const route = useRoute();

  return <FiltersPage navigation={navigation} route={route} />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Constants.backColor,
    paddingTop: 60,
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
