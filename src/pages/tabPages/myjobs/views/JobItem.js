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

import Divider from '../../../../components/Divider';

export const FakeDesigner = {
  username: 'Jhone art',
  email: 'xyxy@xc.com',
  mobile: '123479827364',
  address: 'Address data string',
  role: 3,
  active: 1,
};
export const FakeModel = {
  username: 'John art',
  email: 'xyxy@xc.com',
  mobile: '123479827364',
  address: 'Address data string',
  role: 2,
  active: 1,
};

export const FakeJobItem = {
  pid: '12343423',
  status: 'closed',
  title: 'Fashion Style Expert - 1',
  price: '250.00',
  price_max: '350.00',
  currency: 'USD',
  created_at: '2020-05-02 12:23',
  designer: FakeDesigner,
  hired_model: FakeModel,
  avg_bid: '333.33',
  bids: '4',
  images: [
    require('../../../../../assets/style1.jpg'),
    require('../../../../../assets/style2.jpg'),
    require('../../../../../assets/style3.jpg'),
    require('../../../../../assets/style4.jpg'),
  ],
  milestones: [],
  description:
    'This is description for project will explain about outfit and fashion style.',
};

export const FakeJobItemOpen = {
  pid: '12343423',
  status: 'open',
  title: 'Fashion Style Expert - 1',
  price: '250.00',
  price_max: '350.00',
  currency: 'USD',
  created_at: '2020-05-02 12:23',
  designer: FakeDesigner,
  hired_model: FakeModel,
  avg_bid: '333.33',
  bids: '4',
  images: [
    require('../../../../../assets/style1.jpg'),
    require('../../../../../assets/style2.jpg'),
    require('../../../../../assets/style3.jpg'),
    require('../../../../../assets/style4.jpg'),
  ],
  milestones: [],
  description:
    'This is description for project will explain about outfit and fashion style.',
};

export const FakeJobItemProgress = {
  pid: '12343423',
  status: 'progress',
  title: 'Fashion Style Expert - 1',
  price: '250.00',
  price_max: '350.00',
  currency: 'USD',
  created_at: '2020-05-02 12:23',
  designer: FakeDesigner,
  hired_model: FakeModel,
  avg_bid: '333.33',
  bids: '4',
  images: [
    require('../../../../../assets/style1.jpg'),
    require('../../../../../assets/style2.jpg'),
    require('../../../../../assets/style3.jpg'),
    require('../../../../../assets/style4.jpg'),
  ],
  milestones: [
    {
      id: 123,
      price: '1232,32',
      currency: 'USD',
      description: 'For first picture',
      released: '0',
      released_at: '',
      created_at: '2020-03-12 12:23:32',
      updated_at: '2020-01-23 12:32:32',
    },
    {
      id: 123,
      price: '124',
      currency: 'USD',
      description: 'For 2nd picture',
      released: '1',
      released_at: '2020-05-12 12:23:32',
      created_at: '2020-01-12 12:23:32',
      updated_at: '2020-01-23 12:32:32',
    },
  ],
  description:
    'This is description for project will explain about outfit and fashion style.',
};

export const FakeJobClosed = {
  pid: '12343423',
  status: 'closed',
  title: 'Fashion Style Expert - 1',
  price: '250.00',
  price_max: '350.00',
  currency: 'USD',
  created_at: '2020-05-02 12:23',
  designer: FakeDesigner,
  hired_model: FakeModel,
  avg_bid: '333.33',
  bids: '4',
  images: [
    require('../../../../../assets/style1.jpg'),
    require('../../../../../assets/style2.jpg'),
    require('../../../../../assets/style3.jpg'),
    require('../../../../../assets/style4.jpg'),
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
        avatar: require('../../../../../assets/style2.jpg'),
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
        avatar: require('../../../../../assets/style4.jpg'),
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

const JobItem = ({jobData, onPress, onTapMoreItem}) => {
  let {
    status,
    title,
    price,
    currency,
    created_at,
    designer,
    hired_model,
  } = jobData;

  const [showPicker, setShowPicker] = useState(false);
  return (
    <View
      style={{
        paddingHorizontal: 8,
        paddingVertical: 5,
        // borderWidth: 0.5,
        borderColor: Constants.greyWhite,
        borderRadius: 3,
        marginVertical: 6,
      }}>
      <TouchableOpacity onPress={onPress}>
        {/* <Text
          style={{
            color: Constants.greyWhite,
            fontSize: 13,
            paddingVertical: 5,
          }}>
          {status.toUpperCase()}
        </Text> */}
        <Text
          style={{
            color: Constants.lightGold,
            fontWeight: 'bold',
            fontSize: 14,
            paddingVertical: 4,
          }}>
          {title}
        </Text>
        <View style={{flexDirection: 'row', paddingVertical: 4}}>
          <Text
            style={{
              color: Constants.greyWhite,
              fontSize: 13,
              fontWeight: 'bold',
            }}>
            from Norway
          </Text>
          <Text
            style={{
              color: Constants.greyWhite,
              fontSize: 12,
              marginLeft: 10,
            }}>
            posted 9 minutes ago
          </Text>
        </View>

        <Text
          style={{
            color: Constants.greyWhite,
            fontSize: 13,
            paddingVertical: 4,
          }}>
          ${price}
          {currency}
        </Text>

        <Text
          style={{
            color: Constants.greyWhite,
            fontSize: 13,
            paddingVertical: 4,
          }}>
          This is project description sample.This is project description
          sample.This is project description sample.This is project description
          sample.
        </Text>

        {/* {hired_model && (
          <Text style={{color: Constants.greyWhite, fontSize: 13}}>
            Awarded one model
          </Text>
        )} */}

        {!hired_model && (
          <Text style={{color: Constants.greyWhite, fontSize: 13}}>
            No awarded model
          </Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity
        style={{
          position: 'absolute',
          bottom: 5,
          right: 10,
        }}
        onPress={() => {
          setShowPicker(true);
        }}>
        <Feather
          name={'more-horizontal'}
          color={Constants.greyWhite}
          size={23}
        />
      </TouchableOpacity>
      <ActionSheet
        title={'More Actions'}
        titleList={['Post a new job', 'Post this job again']}
        onTapItem={(index, title) => {
          setShowPicker(false);
          if (onTapMoreItem) {
            onTapMoreItem(index, title);
          }
        }}
        onCancel={() => {
          setShowPicker(false);
        }}
        isShow={showPicker}
      />
    </View>
  );
};

export default JobItem;
