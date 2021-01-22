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




export const ChatItemView = ({onTapItem}) => {
  return (
    <TouchableOpacity
      onPress={onTapItem}
      style={{
        width: Constants.WINDOW_WIDTH-40,
        flexDirection: 'row',
        paddingVertical: 15,
        backgroundColor: Constants.black,
      }}>
      <Image
        source={require('../../../../assets/style3.jpg')}
        resizeMode={'cover'}
        style={{width: 50, height: 50, borderRadius: 5}}
      />
      <View style={{flex: 1, marginLeft: 8, alignItems: 'stretch'}}>
        <View style={{flexDirection: 'row'}}>
          <Text
            style={{
              fontSize: 15,
              fontWeight: 'bold',
              color: Constants.greyWhite,
            }}>
            Designer Name
          </Text>
          <Text
            numberOfLines={1}
            style={{
              flex: 1,
              fontSize: 16,
              fontWeight: 'bold',
              color: Constants.greyWhite,
              marginLeft: 10,
            }}>
            - Fashion expert needed for 10 pictures
          </Text>
        </View>
        <View style={{flexDirection: 'row', marginTop: 10}}>
          <Text
            numberOfLines={1}
            style={{flex: 1, fontSize: 14, color: Constants.greyWhite}}>
            Hi, there my name is Goapal and want...
          </Text>
          <Text
            style={{width: 40, fontSize: 13, color: Constants.greyWhite, marginLeft: 10}}>
            Apr 11
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

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

  onTapItem = ()=>{
    const {navigation, route} = this.props;
    navigation.navigate('chat_dlg')
  }

  render() {
    return (
      <View style={styles.container}>
        <HeaderBar title={'Messages'} isShowLeft={false} isShowRight={false} />
        <View style={{marginTop: 60, flex: 1}}>
          {/* <FlatList
            keyExtractor={(one, index) => '' + index}
            data={[1, 2, 3, 4, 5, 6, 6]}
            renderItem={({item, index, sep}) => {
              return <ChatItemView />;
            }}
          /> */}
          <SwipeListView
            data={[1, 2, 3, 4, 5, 6, 6]}
            renderItem={(data, rowMap) => {
              return <ChatItemView onTapItem={this.onTapItem}/>;
            }}
            renderHiddenItem={(data, rowMap) => (
              <View
                style={{
                  
                  alignItems: 'flex-end',
                  height: '100%',
                  marginVertical: 0,
                }}>
                <TouchableOpacity
                  style={{
                    backgroundColor: Constants.secondBack,
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: 60,
                    height: '100%',
                  }}
                  onPress={() => {
                    rowMap[data.index].closeRow();
                  }}>
                  <Feather name={'x'} size={23} color={Constants.lightGold} />
                </TouchableOpacity>
              </View>
            )}
            // leftOpenValue={75}
            rightOpenValue={-90}
            keyExtractor={(item, index) => '' + index}
            // ItemSeparatorComponent={() => {
            //   return <Divider title={null} />;
            // }}
          />
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
    alignItems: 'center',
  },
});
