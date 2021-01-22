import React, {useEffect, useState, useRef} from 'react';
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
import Constants, {UserRole} from '../../../utils/Constants';
import SegViews from '../../../components/SegView';
import ProgressBar from 'react-native-animated-progress';
import Feather from 'react-native-vector-icons/Feather';
import {InputOutLine} from '../../../components/Inputs';
import {StarsView} from '../myjobs/views/ReviewItem';
import Divider from '../../../components/Divider';
import ModelListItem from '../post/views/ModelListItem';
import {FillButton, OutLineButton} from '../../../components/Buttons';

import BrowseJobItem, {FakeJob} from './views/BrowseJobItem';
import BrowseModelItemView from './views/BrowseModelItemView';
import IonIcons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export function ModelItemView({
  username,
  country,
  point,
  reviews,
  isTouchable = true,
  onTapItem,
}) {
  const content = (
    <>
      <Image
        style={{width: 40, height: 40, borderRadius: 5, marginTop: 5}}
        resizeMode={'cover'}
        source={require('../../../../assets/style3.jpg')}
      />
      <View style={{flex: 1, marginLeft: 10}}>
        <Text style={{color: Constants.greyWhite, fontSize: 16}}>
          {username}
          <Text style={{color: Constants.greyWhite, fontSize: 15}}>
            {'  '}from {country}
          </Text>
        </Text>
        <View
          style={{
            flexDirection: 'row',
            marginTop: 3,
            alignItems: 'center',
          }}>
          <Text
            style={{
              fontSize: 14,
              paddingHorizontal: 10,
              paddingVertical: 0,
              marginRight: 5,
              width: 50,
              borderRadius: 3,
              color: 'white',
              textAlign: 'center',
              backgroundColor: Constants.darkGold,
            }}>
            {point}
          </Text>
          <StarsView point={4.5} />
          <Text
            style={{marginLeft: 10, fontSize: 13, color: Constants.greyWhite}}>
            {reviews} reviews
          </Text>
        </View>
      </View>
      {isTouchable && (
        <View
          style={{
            width: 30,
            height: 40,
            justifyContent: 'center',
            alignItems: 'flex-end',
            marginTop: 5,
          }}>
          <Feather name="chevron-right" size={20} color={Constants.darkGold} />
        </View>
      )}
    </>
  );

  if (isTouchable) {
    return (
      <TouchableOpacity
        style={{flexDirection: 'row', paddingVertical: 14}}
        onPress={onTapItem}>
        {content}
      </TouchableOpacity>
    );
  } else {
    return (
      <View style={{flexDirection: 'row', paddingVertical: 10}}>{content}</View>
    );
  }
}

export const ModelsList = ({
  models = [1, 2, 3, 4, 5, 6, 7, 8, 8, 7, 34, 34],
  onTapItem,
  onTapInTouch,
  style,
  isInvite = false,
  isHire = false
}) => {
  const navigation = useNavigation()
  
  if (!models || models.length == 0) {
    return (
      <View
        style={{
          paddingHorizontal: 20,
          alignItems: 'center',
          ...style,
        }}>
        <IonIcons
          name="newspaper-outline"
          size={70}
          color={Constants.greyWhite}
        />
        <Text
          style={{
            fontSize: 15,
            fontWeight: 'bold',
            color: Constants.greyWhite,
            paddingVertical: 10,
          }}>
          You haven't hired anyone yet.
        </Text>
        <Text style={{fontSize: 14, color: Constants.greyWhite, textAlign:'center'}}>
          Search for models who can help you get work done.
        </Text>
      </View>
    );
  }

  return (
    <View style={{paddingHorizontal: 0, ...style}}>
      <FlatList
        style={{flex: 1}}
        keyExtractor={(item, index) => '' + index}
        data={models}
        renderItem={({item, index, sep}) => {
          let div = (
            <Divider
              title={null}
              style={{marginTop: 6}}
              color={Constants.darkWhite}
            />
          );
          if (index == models.length - 1) {
            div = null;
          }
          return (
            <>
              <BrowseModelItemView
                username={'Nichel D'}
                country={'Norway'}
                point={4.5}
                reviews={132}
                isInvite={isInvite}
                isHire={isHire}
                onTapInvite={()=>{}}
                onTapHire={()=>{}}
                onTapDetail={() => {
                  if (onTapItem) {
                    onTapItem(item);
                  }
                }}
                onTapInTouch={()=>{
                  navigation.navigate('chat_dlg');
                }}
              />
              {div}
            </>
          );
        }}
      />
    </View>
  );
};

export const BrowseJobList = ({jobs, onTapJob, }) => {
  return (
    <View style={{width: Constants.WINDOW_WIDTH, paddingHorizontal: 20}}>
      <FlatList
        style={{flex: 1}}
        keyExtractor={(item, index) => '' + index}
        data={jobs}
        renderItem={({item, index, sep}) => {
          let div = (
            <Divider
              title={null}
              style={{marginTop: 6}}
              color={Constants.darkWhite}
            />
          );
          if (index == jobs.length - 1) {
            div = null;
          }
          return (
            <>
              <BrowseJobItem
                jobData={item}
                onPress={() => {
                  if (onTapJob) {
                    onTapJob(item);
                  }
                }}
              />
              {div}
            </>
          );
        }}
      />
    </View>
  );
};

export const ModelsContentView = ({onChangePage, pageIndex , isInvite, isHire}) => {
  const navigation = useNavigation();
  const route = useRoute();
  const flScrollRef = useRef(null);

  useEffect(() => {
    flScrollRef.current.scrollToIndex({animated: true, index: pageIndex});
  }, [pageIndex]);

  const [search, setSearch] = useState('');

  const onTapFilterOption = () => {
    navigation.navigate('filters_page');
  };

  const onTapInTouch = () => {
    navigation.navigate('chat_dlg');
  };

  const onTapModelItem = (model) => {
    navigation.navigate('model_detail_screen', {model: model});
  };

  return (
    <View style={{width: '100%', flex: 1}}>
      <View
        style={{
          flexDirection: 'row',
          width: '100%',
          marginTop: 5,
          // paddingHorizontal: 20,
        }}>
        <InputOutLine
          icon={<Feather name="search" size={20} color={Constants.darkGold} />}
          placeholder={'Search ...'}
          placeholderTextColor={Constants.darkGold}
          onChangeText={(val) => {
            setSearch(val);
          }}
          value={search ?? ''}
          style={{flex: 1}}
        />
        <TouchableOpacity
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            width: 50,
            height: 50,
            marginLeft: 5,
          }}
          onPress={onTapFilterOption}>
          <Feather name="sliders" size={20} color={Constants.darkGold} />
        </TouchableOpacity>
      </View>

      <View style={styles.mainContainer}>
        <FlatList
          ref={flScrollRef}
          style={{flex: 1, marginTop: 10}}
          pagingEnabled={true}
          pageIndex={0}
          horizontal={true}
          contentContainerStyle={{width: (Constants.WINDOW_WIDTH -40) * 2}}
          data={[1, 2]}
          renderItem={({item, index, sep}) => {
            if (index == 0) {
              return (
                <ModelsList
                  style={{width: Constants.WINDOW_WIDTH - 40}}
                  onTapInTouch={onTapInTouch}
                  isInvite={isInvite} 
                  isHire={isHire}
                  onTapItem={(model) => {
                    onTapModelItem(model);
                  }}
                />
              );
            } else {
              return (
                <ModelsList
                  style={{width: Constants.WINDOW_WIDTH - 40}}
                  models={[]}
                  isInvite={isInvite} 
                  isHire={isHire}
                  onTapInTouch={onTapInTouch}
                  onTapItem={(model) => {
                    onTapModelItem(model);
                  }}
                  isInvite={isInvite}
                  isHire={isHire}
                />
              );
              return (
                <BrowseJobList
                  jobs={[
                    FakeJob,
                    FakeJob,
                    FakeJob,
                    FakeJob,
                    FakeJob,
                    FakeJob,
                    FakeJob,
                  ]}
                  onTapJob={(job) => {
                    navigation.navigate('job_detail', {
                      enableToBid: true,
                      job: job,
                    });
                  }}
                />
              );
            }
          }}
          keyExtractor={(item, index) => '' + index}
          onMomentumScrollEnd={(e) => {
            const {contentOffset, contentSize} = e.nativeEvent;

            let pageIndex = Math.round(
              contentOffset.x / Constants.WINDOW_WIDTH,
            );

            onChangePage(pageIndex);

            // this.setState({segIndex: pageIndex});
          }}
        />
      </View>
    </View>
  );
};

class Index extends React.Component {
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

  onTapLogin = () => {
    const {navigation, route} = this.props;
  };

  onTapSignup = () => {
    const {navigation, route} = this.props;
  };

  onTapLeftIconHeader = () => {};
  onTapRightIconHeader = () => {};

  onTapFilterOption = () => {
    const {navigation, route} = this.props;

    navigation.navigate('filters_page');
  };

  onTapInTouch = () => {
    const {navigation, route} = this.props;

    navigation.navigate('chat_dlg');
  };

  render() {
    let rightIcon = null;
    const {navigation, route} = this.props;

    let title =
      global.curUser.role == UserRole.Designer
        ? 'Models & Content Creators'
        : 'Projects';

    let segTitleList =
      global.curUser.role == UserRole.Designer
        ? ['Search', 'Working With']
        : ['Search', 'Working With'];

    return (
      <View style={styles.container}>
        <HeaderBar
          title={title}
          isShowRight={false}
          isBackLeft={false}
          isShowLeft={false}
          isBackLeft={true}
          onLeftButton={() => {
            this.onTapLeftIconHeader();
          }}
          onRightButton={() => {
            this.onTapRightIconHeader();
          }}
        />

        <View
          style={{
            width: '100%',
            height: 40,
            marginTop: 60,
            paddingHorizontal: 20,
          }}>
          <SegViews
            curIndex={this.state.segIndex}
            titleList={segTitleList}
            onTapItem={(title, index) => {
              this.setState({segIndex: index});
              // this.refs.flRef.scrollToIndex({animated: true, index: index});
            }}
          />
        </View>
        <View style={{flex: 1, paddingHorizontal: 20}}>
          <ModelsContentView
            pageIndex={this.state.segIndex}
            onChangePage={(pageIndex) => {
              this.setState({segIndex: pageIndex});
            }}
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

    alignItems: 'center',
  },
  progressContainer: {width: Constants.WINDOW_WIDTH, paddingTop: 60},
  mainContainer: {width: '100%', flex: 1, },
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
