import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  Modal,
  FlatList
} from 'react-native';
import Constants from '../utils/Constants';
import Ionicons from 'react-native-vector-icons/Ionicons';

const IconClose = <Ionicons name="md-close-circle-outline" size={40} color="white" />

const PickerModal = ({
  pickList,
  selectedIndex,
  onTapSelect,
  onTapClose,
  isShow = false,
}) => {
  if (!isShow) {
    return null;
  }

  let data = [];
  pickList?.forEach((one, index) => {
    data.push({id: index, val: one});
  });

  let height = data.length * 40;

  if(height > Constants.WINDOW_HEIGHT * 0.7){
    height = Constants.WINDOW_HEIGHT * 0.7
  }else{

  }

  return (
    <Modal 
      animationType={'fade'} 
      transparent={true} visible={isShow}>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          width: Constants.WINDOW_WIDTH,
          height: Constants.WINDOW_HEIGHT,
          backgroundColor: 'rgba(13,13,13,0.4)',
        }}>
        <TouchableOpacity
          style={{
            position: 'absolute',
            top: 50,
            right: 10,
            width: 40,
            height: 40,
          }}
          onPress={() => {
            onTapClose();
          }}>
          {IconClose}
        </TouchableOpacity>
        <View
          style={{
            width: Constants.WINDOW_WIDTH * 0.7,
            height: height,
            backgroundColor: 'white',
            zIndex: 9999999,
            borderRadius:10,
            
          }}>
          <FlatList
            style={{flex:1}}
            data={data}
            renderItem={({item, index, sep}) => {
              return (
                <TouchableOpacity
                  style={{    
                    width: '90%',
                    height: 40,
                    alignSelf:'center',
                    justifyContent: 'center',
                    alignItems:'center',
                    borderBottomWidth:0.4,
                    borderBottomColor:'gray',
                  
                  }}
                  onPress={()=>{
                      onTapSelect(index, item.val)
                  }}
                  >
                  <Text
                    style={{
                      fontSize: 15,
                      textAlign:'center'
                    }}>
                    {item.val}
                  </Text>
                </TouchableOpacity>
              );
            }}
            keyExtractor={(item) => "key_"+item.id}
          />
        </View>
      </View>
    </Modal>
  );
};

export default PickerModal;


export const CountryList = [
  'Germany',
  'France',
  'Italy',
  'United Kingdom',
  'Netherlands',
  'Sweden',
  'Switzerland',
  'Greece',
  'Poland',
  'Belgium',
  'Austria',
  'Denmark',
  'Ireland',
  'Ukranie',
  'Finland',
  'Romania',
  'Croatia',
  'Iceland',
  'Norway',
  'United States'
]

export const CurrencyList = [
'USD',
'CAD',
'SGD',
'NOK'
]

