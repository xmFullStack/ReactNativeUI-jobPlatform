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
  SectionList,
} from 'react-native';
import HeaderBar from '../../../components/HeaderBar';
import {useNavigation, useRoute} from '@react-navigation/native';
import Constants, {UserRole} from '../../../utils/Constants';

import SegViews from '../../../components/SegView';
import ProgressBar from 'react-native-animated-progress';
import Feather from 'react-native-vector-icons/Feather';
import {InputOutLine} from '../../../components/Inputs';
import {StarsView} from '../myjobs/views/ReviewItem';
import Divider from '../../../components/Divider';
import ModelListItem from '../post/views/ModelListItem';
import {SwipeListView} from 'react-native-swipe-list-view';
import {FillButton} from '../../../components/Buttons';
import {Provider, connect, useDispatch, useSelector} from 'react-redux';



const DATA = [
  {
    title: '',
    data: [
      {
        title: 'My info',
        subTitle: "Edit my profile",
        next: true,
        index: 1,
      },
      {
        title: 'My Wallet',
        subTitle: "Manage wallet & billing methods",
        next: true,
        index: 2,
      },
   
    ],
  },
  {
    title: '',
    data: [
      {
        title: 'Privacy policy',
        subTitle: 'Opens our privacy policy',
        next: true,
        index: 3,
      },
      {
        title: 'Terms of service',
        subTitle: 'Opens our terms and conditions page',
        next: true,
        index: 4,
      },
    ],
  },
];

class Index extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {}

  componentWillUnmount() {}

  onTapLogin = () => {
    const {navigation, route} = this.props;
  };

  onTapSignup = () => {
    const {navigation, route} = this.props;
  };

  onEditProfile = () => {
    const {navigation, route} = this.props;

    navigation.navigate('edit_profile', {model: null})
  };

  onTapItem = (item, index) => {
    const {navigation, route, curRole} = this.props;

    if(item.index == 1){

      navigation.navigate(curRole == UserRole.Model ? 'edit_model_profile' : 'edit_profile', {model: null})
      
    }else if(item.index == 2){
      
    }else if(item.index == 3){
      // navigation.navigate('walk')
    }else if(item.index == 4){
      // navigation.navigate('privacy')
    }else if(item.index == 5){
      // navigation.navigate('terms')
    }
    
  };

  onTapLogout = () => {
    const {navigation, route} = this.props;
    navigation.popToTop();
  };
  render() {
    return (
      <View style={styles.container}>
        <View
          style={{flexDirection: 'row', paddingVertical: 20}}
        >
          <Image
            source={require('../../../../assets/style2.jpg')}
            resizeMode={'cover'}
            style={{width: 50, height: 50}}
          />
          <View style={{flex: 1, marginLeft: 10, justifyContent: 'flex-end'}}>
            <Text
              style={{
                fontSize: 18,
                fontWeight: 'bold',
                color: Constants.darkGold,
              }}>
              Michel M.
            </Text>
            <Text
              style={{fontSize: 13, color: Constants.greyWhite, marginTop: 3}}>
              View and edit your profile
            </Text>
          </View>
          {/* <View
            style={{
              width: 40,
              justifyContent: 'center',
              alignItems: 'flex-end',
            }}>
            <Feather
              name={'chevron-right'}
              color={Constants.greyWhite}
              size={20}
            />
          </View> */}
        </View>

        <SectionList
          style={{flex: 1}}
          sections={DATA}
          keyExtractor={(item, index) => '' + index}
          renderItem={({item, index}) => (
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                width: Constants.WINDOW_WIDTH - 40,
                marginVertical: 10,
                paddingVertical: 10,
              }}
              onPress={() => {
                if (item.next) {
                  this.onTapItem(item, index);
                }
              }}>
              <View style={{flex: 1}}>
                <Text style={styles.label}>{item.title}</Text>
                <Text style={styles.subLabel}>{item.subTitle}</Text>
              </View>
              <View style={{width: 20, justifyContent: 'center'}}>
                {item.next && (
                  <Feather
                    name={'chevron-right'}
                    size={19}
                    color={Constants.greyWhite}
                  />
                )}
              </View>
            </TouchableOpacity>
          )}
          renderSectionHeader={({section: {title}}) => (
            <Text style={styles.header}>{title}</Text>
          )}
        />
        <TouchableOpacity
          style={{
            width: '100%',
            height: 40,
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={this.onTapLogout}>
          <Text style={{color: Constants.redColor, fontSize: 14}}>Log out</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default function () {
  const navigation = useNavigation();
  const route = useRoute();

  const dispatch = useDispatch();
  const curRole = useSelector((state) => state.role.curRole);



  return <Index navigation={navigation} route={route} curRole={curRole}/>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Constants.backColor,
    paddingHorizontal: 20,
    alignItems: 'center',
    paddingTop: 20,
  },
  header: {
    color: Constants.darkGold,
    fontSize: 14,
    fontWeight: 'bold',
  },
  label: {
    fontSize: 17,
    fontWeight: 'bold',
    color: Constants.greyWhite,
  },
  subLabel: {
    fontSize: 14,
    color: Constants.greyWhite,
    marginTop: 5,
  },
});
