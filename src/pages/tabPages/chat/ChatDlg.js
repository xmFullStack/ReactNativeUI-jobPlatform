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
import HeaderBar from '../../../components/HeaderBar';
import {useNavigation, useRoute} from '@react-navigation/native';
import Constants from '../../../utils/Constants';
import SegViews from '../../../components/SegView';
import ProgressBar from 'react-native-animated-progress';
import Feather from 'react-native-vector-icons/Feather';
import {InputOutLine} from '../../../components/Inputs';
import {StarsView} from '../myjobs/views/ReviewItem';
import Divider from '../../../components/Divider';
import ModelListItem from '../post/views/ModelListItem';
import {SwipeListView} from 'react-native-swipe-list-view';
import {GiftedChat, InputToolbar, Actions} from 'react-native-gifted-chat';
import {FillButton} from '../../../components/Buttons';
import {ModelItemView} from '../browse/index';
import {FakeDesigner} from '../myjobs/views/JobItem'

export const FakeJob = {
  pid: '12343423',
  status: 'open',
  title: 'Fashion Style Expert - 1',
  price: '250.00',
  price_max: '350.00',
  currency: 'USD',
  created_at: '2020-05-02 12:23',
  designer: FakeDesigner,
  hired_model: null,
  avg_bid: '333.33',
  bids: '4',
  images: [
    require('../../../../assets/style1.jpg'),
    require('../../../../assets/style2.jpg'),
    require('../../../../assets/style3.jpg'),
    require('../../../../assets/style4.jpg'),
  ],
  milestones: [
    {
      id: 123,
      price: '1232,32',
      currency: 'USD',
      description: 'For first picture',
      released: '0',
      released_at: '',
      created_at: '2020-01-12 12:23:32',
      updated_at: '2020-01-23 12:32:32',
    },
  ],
  reviews: [
    {
      id: 1233,
      sender_id: '12323',
      sender: {
        username: 'Designer Name1',
        avatar: require('../../../../assets/style2.jpg'),
      },
      rcver: {
        username: 'model1',
      },
      body:
        'This is good experiences and great jobs!  I will rehire  this model again. Thank you!',
      point: 4.5,
      created_at: '2020-01-23 12:32:32',
    },
    {
      id: 1233,
      sender_id: '12323',
      sender: {
        username: 'model1',
        avatar: require('../../../../assets/style4.jpg'),
      },
      rcver: {
        username: 'Designer Name1',
      },
      body:
        'Request Payment is in time, Everything is perfect, I will work with this client again. Thanks again.',
      point: 5,
      created_at: '2020-08-23 12:32:32',
    },
  ],
  description:
    'This is description for project will explain about outfit and fashion style.',
};


class ChatDlg extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      messages: [
        {
          _id: 1,
          text: 'Hello Selena!',
          image: 'https://placeimg.com/140/140/any',
          createdAt: new Date(),
          user: {
            _id: 2,
            name: 'Designer1',
            avatar: 'https://placeimg.com/140/140/any',
          },
        },
      ],
    };
  }

  componentDidMount() {}

  componentWillUnmount() {}

  onSend(messages = []) {
    this.setState((previousState) => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }));
  }

  renderInputToolbar = (props) => {
    return (
      <InputToolbar
        {...props}
        containerStyle={{
          backgroundColor: Constants.backColor,
          borderTopColor: Constants.darkGold,
        }}
      />
    );
  };

  renderBubble = (props) => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: Colors.darkGold,
          },
        }}
      />
    );
  };

  handlePickImage = () => {
    this._curImage = 'https://placeimg.com/140/140/any';
    this.setState({text: '<image>'});
  };

  renderActions = (props) => {
    return (
      <Actions
        {...props}
        options={{
          ['Send Image']: this.handlePickImage,
        }}
        icon={() => (
          <Feather name={'plus-square'} size={28} color={Constants.darkGold} />
        )}
        onSend={(args) => {}}
      />
    );
  };

  onTapJobTitle = ()=>{
      const {navigation, route} = this.props;
      navigation.navigate('job_detail', {enableToBid: false, job: FakeJob})
  }
  goBack = ()=>{
    const {navigation, route} = this.props;
    navigation.goBack()
  }

  render() {
    return (
      <View style={{flex: 1, backgroundColor: Constants.backColor}}>
        <HeaderBar
          title={
            <ModelItemView
              username={'Migel A'}
              country={'Norway'}
              point={4}
              reviews={324}
              isTouchable={false}
            />
          }
          isShowLeft={true}
          isBackLeft={true}
          isShowRight={false}
          onLeftButton={this.goBack}
        />
        <View
          style={{
            marginTop: 60,
            width: '100%',
            paddingHorizontal: 10,
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <TouchableOpacity style={{flex: 1}} onPress={this.onTapJobTitle}>
            <Text
              numberOfLines={1}
              style={{
                flex: 1,
                color: Constants.darkGold,
                fontSize: 16,
                fontWeight: 'bold',
              }}>
              Fashion expert needed for 10 picture
            </Text>
          </TouchableOpacity>

          <FillButton
            title={'Hire'}
            onPress={() => {}}
            style={{width: 60, height: 30}}
          />
        </View>
        <View style={{height: 1, width: '100%', marginVertical: 10}}>
          <Divider title={null} />
        </View>

        <GiftedChat
          style={{backgroundColor: Constants.backColor}}
          renderInputToolbar={this.renderInputToolbar}
          textInputStyle={{
            backgroundColor: Constants.backColor,
            color: Constants.greyWhite,
          }}
          renderActions={this.renderActions}
          text={this.state.text}
          onInputTextChanged={(val) => {
            this.setState({text: val});
          }}
          messages={this.state.messages}
          onSend={(messages) => {
            let msg = [...messages];
            if (this._curImage) {
              msg[msg.length - 1].image = this._curImage;
            }
            this.onSend(msg);
            this._curImage = null;
          }}
          alwaysShowSend={true}
          user={{
            _id: 1,
          }}
        />
      </View>
    );
  }
}

export default function (props) {
  const route = useRoute();
  const navigation = useNavigation();

  return <ChatDlg navigation={navigation} route={route} {...props} />;
}
