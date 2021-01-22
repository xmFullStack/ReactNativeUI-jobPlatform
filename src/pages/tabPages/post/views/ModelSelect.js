import React from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  Alert,
  Text,
  SafeAreaView,
} from 'react-native';

import Constants, {StatusBarHeight, isIOS} from '../../../../utils/Constants';
import {HeaderBar} from '../../../../components/HeaderBar';
import PropTypes from 'prop-types';

import {
  NavigationContext,
  useNavigation,
  useRoute,
} from '@react-navigation/native';

import RestAPI from '../../../../utils/RestAPI';

import ModelListItem from './ModelListItem';

const fakeModelList = [
  {
    id: 30,
    user_id: 59,
    location_id: 9,
    style_id: null,
    height: 7,
    waist: 8,
    hip: 8,
    bust: 7,
    experience: 7,
    description: 'Jd',
    created_at: '2020-11-18 14:19:47',
    updated_at: '2020-11-18 14:21:29',
    location: {
      id: 9,
      name: 'Tokyo',
      image: '/uploads/location_1604660958085.jpg',
      created_at: '2020-11-06 11:09:18',
      updated_at: '2020-11-06 11:09:18',
    },
    user: {
      id: 59,
      username: 'Pp',
      email: 'P@p.com',
      role: 2,
      mobile: '83904',
      address: 'Jfjf',
      passport_img: '/uploads/passport/id_1605709131954.jpeg',
      reset_token: null,
      active: 1,
      created_at: '2020-11-18 14:18:53',
      updated_at: '2020-11-18 14:21:57',
      videos: [
        {
          id: 83,
          user_id: 59,
          short_video: '/uploads/video/opt/video_1605709289618.mp4',
          created_at: '2020-11-18 14:21:29',
          updated_at: '2020-11-18 14:21:29',
        },
      ],
      images: [
        {
          id: 174,
          user_id: 59,
          image: '/uploads/model/model_1605709289823_7185.jpeg',
          created_at: '2020-11-18 14:21:31',
          updated_at: '2020-11-18 14:21:31',
        },
        {
          id: 175,
          user_id: 59,
          image: '/uploads/model/model_1605709289824_5135.jpeg',
          created_at: '2020-11-18 14:21:31',
          updated_at: '2020-11-18 14:21:31',
        },
      ],
      styles: [
        {
          id: 18,
          name: 'Chic',
          image: '/uploads/location_1604836049879.jpeg',
          created_at: '2020-11-08 11:47:31',
          updated_at: '2020-11-08 11:47:31',
          pivot: {
            style_id: 18,
            user_id: 59,
          },
        },
      ],
    },
  },
  {
    id: 31,
    user_id: 60,
    location_id: 9,
    style_id: null,
    height: 7,
    waist: 8,
    hip: 7,
    bust: 8,
    experience: 7,
    description: 'Jd',
    created_at: '2020-11-18 17:13:03',
    updated_at: '2020-11-18 17:14:42',
    location: {
      id: 9,
      name: 'Tokyo',
      image: '/uploads/location_1604660958085.jpg',
      created_at: '2020-11-06 11:09:18',
      updated_at: '2020-11-06 11:09:18',
    },
    user: {
      id: 60,
      username: 'Mm',
      email: 'N@n.com',
      role: 2,
      mobile: 'Jd',
      address: 'Idk',
      passport_img: '/uploads/passport/id_1605719540894.jpeg',
      reset_token: null,
      active: 1,
      created_at: '2020-11-18 17:12:22',
      updated_at: '2020-11-18 17:15:02',
      videos: [
        {
          id: 85,
          user_id: 60,
          short_video: '/uploads/video/opt/video_1605719682629.mp4',
          created_at: '2020-11-18 17:14:42',
          updated_at: '2020-11-18 17:14:42',
        },
      ],
      images: [
        {
          id: 177,
          user_id: 60,
          image: '/uploads/model/model_1605719682849_8708.jpeg',
          created_at: '2020-11-18 17:14:44',
          updated_at: '2020-11-18 17:14:44',
        },
      ],
      styles: [
        {
          id: 18,
          name: 'Chic',
          image: '/uploads/location_1604836049879.jpeg',
          created_at: '2020-11-08 11:47:31',
          updated_at: '2020-11-08 11:47:31',
          pivot: {
            style_id: 18,
            user_id: 60,
          },
        },
      ],
    },
  },
];

class ModelSelect extends React.Component {
  static contextType = NavigationContext;

  state = {
    isKeyboardShowing: false,
    modelList: fakeModelList,
  };

  loadData = () => {
    const {route} = this.props;
    const {location, style} = route.params;
    showPageLoader(true);

    RestAPI.generalPost('profile/list', {
      location_id: location.id,
      style_id: style.id,
    })
      .then((res) => {
        showPageLoader(false);
        if (res.length == 0) {
          Alert.alert(
            'No Models',
            'There is no registered models yet. please try with other location and style.',
          );
        }
        this.setState({modelList: res});
      })
      .catch((err) => {
        showPageLoader(false);

        Alert.alert('Error', err.msg || JSON.stringify(err));
      });
  };

  componentDidMount() {
    const {navigation} = this.props;

    this._unsubscribe = navigation.addListener('focus', () => {
      // this.loadData();
      // this.setState({ badgeCount: global.badgeCount });
      // global.updateBadgeCount = (count) => {
      //   try {
      //     this.setState({ badgeCount: count });
      //     Notifications.setBadgeCountAsync(badgeCount)
      //   } catch (ex) {}
      // };
    });

    this._unsubscribeBlur = navigation.addListener('blur', () => {
      // global.updateBadgeCount = null
    });
  }

  componentWillUnmount() {
    if (this._unsubscribe) {
      this._unsubscribe();
    }
    if (this._unsubscribeBlur) {
      this._unsubscribeBlur();
    }
  }

  showModelVideo = (selectedItem) => {
    if (this.props.showModelDetail) {
      this.props.showModelDetail(selectedItem);
    }
  };

  render() {
    return (
      <View
        style={{
          flex: 1,
          flexDirection: 'column',
          backgroundColor: Constants.backColor,
        }}>
        <View
          style={{
            flexDirection: 'row',
            marginVertical: 10,
          }}>
          <Text style={styles.jobCaption}>Select Model</Text>
        </View>

        <View
          style={{
            flex: 1,
            width: '100%',
            flexDirection: 'column',
          }}>
          {this.state.modelList == null ||
            (this.state.modelList.length == 0 && (
              <View style={{paddingHorizontal: 10}}>
                <Text style={{color: 'white'}}>No Models</Text>
              </View>
            ))}
          <FlatList
            style={{width: '100%', flex: 1}}
            data={this.state.modelList}
            renderItem={({item, index}) => (
              <ModelListItem
                showInfoIcon={false}
                item={item}
                onTapItem={(model) => {
                  if (this.props.onSelectModel) {
                    this.props.onSelectModel(model);
                  }
                }}
                onModelVideo={(model) => {
                  this.showModelVideo(model);
                }}
              />
            )}
            numColumns={2}
            keyExtractor={(_item, index) => index.toString()}
          />
        </View>
      </View>
    );
  }
}

export default function (props) {
  const navigation = useNavigation();
  const route = useRoute();
  return <ModelSelect {...props} navigation={navigation} route={route} />;
}

const styles = StyleSheet.create({
  input: {
    borderStyle: 'solid',
    overflow: 'hidden',
    borderColor: 'black',
    width: '100%',
    backgroundColor: 'white',
  },
  jobCaption: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 6,
    color: Constants.greyWhite,
  },
  container: {
    flex: 1,
    padding: 20,
    width: '100%',
    maxWidth: '100%',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000000',
  },

  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
});
