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
  unstable_enableLogBox,
  Alert,
} from 'react-native';

import {useNavigation, useRoute} from '@react-navigation/native';
import Constants from '../../../utils/Constants';
import {
  OutlineButton,
  FillButton,
  PickerButton,
  CheckBox,
  ToggleButton,
} from '../../../components/Buttons';
import Divider from '../../../components/Divider';
import HeaderBar from '../../../components/HeaderBar';

import ProgressBar from 'react-native-animated-progress';

import NameProject from './views/NameProject';
import StyleSelect from './views/StyleSelect';
import ModelSelect from './views/ModelSelect';
import ModelDetailView from './views/ModelDetailView';
import PricingPage from './views/PricingPage';
import OutfitScreenView from './views/OutfitScreenView';
import CheckoutView from './views/CheckoutView';
import ProposalManager from './views/ProposalManager'

import ProjectReview from './views/ProjectReview';

import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';

const fakeLocationData = [
  {
    id: 8,
    name: 'Dubai',
    image: '/uploads/location_1604660941108.jpg',
    created_at: '2020-11-06 11:09:01',
    updated_at: '2020-11-06 11:09:01',
    __meta__: {
      profiles_count: 3,
    },
  },
  {
    id: 9,
    name: 'Tokyo',
    image: '/uploads/location_1604660958085.jpg',
    created_at: '2020-11-06 11:09:18',
    updated_at: '2020-11-06 11:09:18',
    __meta__: {
      profiles_count: 3,
    },
  },
  {
    id: 11,
    name: 'London',
    image: '/uploads/location_1604661106188.jpg',
    created_at: '2020-11-06 11:11:46',
    updated_at: '2020-11-06 11:11:46',
    __meta__: {
      profiles_count: 0,
    },
  },
];

const fakeStyleData = [
  {
    id: 17,
    name: 'Casual',
    image: '/uploads/location_1604835807227.jpeg',
    created_at: '2020-11-08 11:43:28',
    updated_at: '2020-11-08 11:43:28',
    __meta__: {
      users_count: 0,
    },
  },
  {
    id: 18,
    name: 'Chic',
    image: '/uploads/location_1604836049879.jpeg',
    created_at: '2020-11-08 11:47:31',
    updated_at: '2020-11-08 11:47:31',
    __meta__: {
      users_count: 0,
    },
  },
  {
    id: 19,
    name: 'Artsy',
    image: '/uploads/location_1604836065389.jpeg',
    created_at: '2020-11-08 11:47:46',
    updated_at: '2020-11-08 11:47:46',
    __meta__: {
      users_count: 0,
    },
  },
];

class Index extends React.Component {
  _maxPage = 4;
  constructor(props) {
    super(props);
    this.state = {
      step: 1,
      selectLocation: null,
      nameOfProject: '',
      model: null,
      price: null,
      description: null,
      images: [],
    };
  }

  componentDidMount() {
    const {navigation, route} = this.props;

    this.unsubscribe = navigation.addListener('focus', () => {
      // console.warn(JSON.stringify(route?.params, null, 2))
      if (route?.params?.step > 0) {
        this.setState({step: route?.params?.step});
      }
      if (!!route?.params?.model) {
        this.setState({model: route?.params?.model});
      }
    });
  }

  componentWillUnmount() {
    if (this.unsubscribe) {
      this.unsubscribe();
    }
  }

  onTapStyle = (style) => {
    this.setState({
      curStyle: style,
      step: 3,
    });
  };

  onTapModel = (model) => {
    this.setState(
      {
        model: model,
      },
      () => {
        this.setState({step: 4});
      },
    );
  };

  onTapHireModel = (model) => {
    this.setState(
      {
        model: model,
      },
      () => {
        this.setState({step: 5});
      },
    );
  };

  onTapCheckedOut = () => {
    this.setState({
      description: null,
      images: null,
      model: null,
      price: null,
      selectLocation: null,
      curStyle: null,
      step: 1,
    });

    this.props.navigation.navigate('my_jobs');
  };

  onTapNextAtOutfit = (description, images) => {
    this.setState({
      description: description,
      images: images,
      step: 7,
    });
  };

  onTapRightIconHeader = () => {
    if (this.state.step == 3) {
      this.setState({
        model: null,
        step: 5,
      });
    } else if (this.state.step == 4) {
      this.setState({
        model: null,
        step: 5,
      });
    } else if (this.state.step == 6) {
      if (!this.state.description) {
        Alert.alert(
          'Empty Description',
          'Please enter description to explain your order.',
        );
        return;
      }
      this.setState({
        step: 7,
      });
    }
  };

  onTapLeftIconHeader = () => {
    const {route, navigation} = this.props;
    if (this.state.step > 1) {
      if ((this.state.step == 5 || this.state.step == 4) && !this.state.model) {
        this.setState({
          step: 3,
        });
      } else {
        this.setState({
          step: this.state.step - 1,
        });
      }
    } else {
      navigation.goBack();
    }
  };

  render() {
    const {route, navigation} = this.props;

    let rightIcon = null;
    if (this.state.step == 3 || this.state.step == 4) {
      rightIcon = (
        <Text style={{color: Constants.lightGold, fontSize: 15}}>SKIP</Text>
      );
    } else if (this.state.step == 6) {
      rightIcon = (
        <Text style={{color: Constants.lightGold, fontSize: 15}}>NEXT</Text>
      );
    }

    return (
      <View style={styles.container}>
        <HeaderBar
          title={'Post project'}
          isShowRight={false}
          rightIcon={rightIcon}
          isBackLeft={false}
          isShowLeft={true}
          isBackLeft={true}
          onLeftButton={() => {
            this.onTapLeftIconHeader();
          }}
          onRightButton={() => {
            this.onTapRightIconHeader();
          }}
        />
        <View style={styles.progressContainer}>
          <ProgressBar
            height={3}
            backgroundColor={Constants.darkGold}
            progress={(this.state.step * 100) / this._maxPage}
            animated={true}
          />
        </View>
        <View style={styles.mainContainer}>
          {this.state.step == 1 && (
            <NameProject
              onBack={() => {}}
              onNext={(name, country) => {
                this.setState({
                  nameOfProject: name,
                  selectLocation: country,
                  step: 2,
                });
              }}
            />
          )}

          {this.state.step == 2 && (
            <OutfitScreenView
              onChange={(description, images) => {
                this.setState({
                  description: description,
                  images: images,
                });
              }}
              onTapNext={(description, images) => {
                // this.onTapNextAtOutfit(description, images);
                this.setState({step: 3});
              }}
              onBack={() => {
                this.setState({step: 1});
              }}
            />
          )}

          {this.state.step == 3 && (
            <PricingPage
              onNext={() => {
                this.setState({step: 4});
             
              }}
              onBack={() => {
                this.setState({step: 2});
              }}
            />
          )}


          {this.state.step == 4 && (
            <ProjectReview  onTapPost={()=>{
              navigation.navigate('proposal_manager')

            }}/>
          )}

          {this.state.step == 5 && (
           <ProposalManager/> 
          )}


          {this.state.step == 6 && (
            <CheckoutView
              onTapCheckout={this.onTapCheckedOut}
              data={{
                model: {user_id: 1010},
                description: this.state.description,
                email: 'asd@as.com',
                phone: '1398712394',
                designerName: 'aoisdu',
                address: 'address ads',
                price: this.state.price,
              }}
            />
          )}
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
  mainContainer: {width: '100%', paddingHorizontal: 20, flex: 1},
});
