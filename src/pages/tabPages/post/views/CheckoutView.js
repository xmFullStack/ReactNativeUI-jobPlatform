import React, {useState, useEffect, useRef} from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Text,
  FlatList,
  Image,
  Alert,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  SafeAreaView,
  Linking,
} from 'react-native';
// import {
//   EvilIcons,
//   Entypo,
//   AntDesign,
//   Ionicons,
//   FontAwesome5,
//   FontAwesome,
// } from "@expo/vector-icons";
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import Utils from '../../../../utils/Utils';
import Constants, {StatusBarHeight, isIOS} from '../../../../utils/Constants';
import {HeaderBar} from '../../../../components/HeaderBar';

import PickerModal from '../../../../components/PickerModal';

import {
  NavigationContext,
  useNavigation,
  useRoute,
} from '@react-navigation/native';

import {emailValidator, passwordValidator} from '../../../../utils/common';

import RestAPI from '../../../../utils/RestAPI';

import GradientButton from '../../../../components/GradientButton';

import LinearGradient from 'react-native-linear-gradient';

export function CardCheckoutView({onChange}) {
  const [cardHolder, setCardHolder] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cvc, setCVC] = useState('');
  const [expYear, setExpYear] = useState('');
  const [expMonth, setExpMonth] = useState('');

  useEffect(() => {
    if (onChange) {
      let data = {
        cardHolder: cardHolder,
        cardNumber: cardNumber,
        cvc: cvc,
        expYear: expYear,
        expMonth: expMonth,
      };
      onChange(data);
    }
    return () => {};
  }, [cardHolder, cardNumber, cvc, expYear, expMonth]);

  const numberRef = useRef();
  const expMonthRef = useRef();
  const expYearRef = useRef();
  const cvcRef = useRef();

  return (
    <View style={{flex: 1, padding: 10, alignItems: 'center'}}>
      <LinearGradient
        colors={[Constants.checkoutBackLight, Constants.checkoutBackDark]}
        style={{
          width: Constants.WINDOW_WIDTH * 0.9,
          height: (Constants.WINDOW_WIDTH * 0.9 * 9) / 14,
          alignItems: 'stretch',
          borderRadius: 15,
          paddingHorizontal: 10,
          paddingTop: 50,
          paddingBottom: 10,
          justifyContent: 'center',
        }}>
        <Image
          style={{
            position: 'absolute',
            top: 0,
            left: 5,
            width: 80,
            height: 80,
          }}
          source={require('../../../../../assets/logo.png')}
        />

        <TextInput
          ref={numberRef}
          blurOnSubmit={false}
          placeholder="Card Number"
          placeholderTextColor={Constants.lightGold}
          style={{...styles.input}}
          keyboardType="numeric"
          value={cardNumber}
          onChangeText={(val) => {
            let str = val.replace(/-/g, '');

            if (str.length > 16) {
              return;
            } else {
              let res = '';
              console.log(str);
              let index = 0;
              for (let i = 0; i < str.length; i++) {
                if (index % 4 == 0 && index > 0) {
                  res += '-';
                }
                res += str.substr(i, 1);
                index = i + 1;
              }
              setCardNumber(res);
            }
          }}
          onSubmitEditing={() => {
            expMonthRef.current?.focus();
          }}
        />

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 20,
          }}>
          <View style={{flexDirection: 'row', flex: 3, alignItems: 'center'}}>
            <TextInput
              ref={expMonthRef}
              blurOnSubmit={false}
              placeholder="Month"
              placeholderTextColor={Constants.lightGold}
              style={{...styles.input, flex: 1}}
              keyboardType="numeric"
              value={expMonth}
              onChangeText={(val) => {
                setExpMonth(val);
              }}
              onSubmitEditing={() => {
                expYearRef.current?.focus();
              }}
            />
            <Text
              style={{
                color: Constants.lightGold,
                fontSize: 18,
                marginHorizontal: 5,
              }}>
              /
            </Text>
            <TextInput
              ref={expYearRef}
              blurOnSubmit={false}
              placeholderTextColor={Constants.lightGold}
              placeholder="Year"
              style={{...styles.input, flex: 1, marginRight: 5}}
              keyboardType="numeric"
              value={expYear}
              onChangeText={(val) => {
                setExpYear(val);
              }}
              onSubmitEditing={() => {
                cvcRef.current?.focus();
              }}
            />
          </View>

          <TextInput
            ref={cvcRef}
            blurOnSubmit={true}
            placeholderTextColor={Constants.lightGold}
            placeholder="CVC"
            style={{...styles.input, flex: 1, marginLeft: 10}}
            keyboardType="decimal-pad"
            secureTextEntry={true}
            value={cvc}
            onChangeText={(val) => {
              if (val.length > 3) {
                return;
              } else {
                setCVC(val);
              }
            }}
          />
        </View>
      </LinearGradient>
    </View>
  );
}

class CheckoutView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isKeyboardShowing: false,
      cardData: null,
      paySources: null,
      showPaySource: false,
    };
  }

  loadData = () => {
    showPageLoader(true);

    RestAPI.generalPost('payment/getPaySource', {user_id: global.curUser.id})
      .then((res) => {
        this.setState({paySources: res});
      })
      .catch((err) => {})
      .finally(() => {
        showPageLoader(false);
      });
  };

  componentDidMount() {
    const {navigation} = this.props;
    this._unsubscribe = navigation.addListener('focus', () => {
      // this.loadData();
    });
  }

  componentWillUnmount() {
    this._unsubscribe();
  }

  // onGoBack = () => {
  //   this.props.navigation.goBack();
  // };

  onTapNext = () => {
    Alert.alert('Order Submit', 'Your order has been submitted successfully.');
    if (this.props.onTapCheckout) {
      this.props.onTapCheckout();
    }
    return;
    console.log('data > ', this.props.data, ' cardData', this.state.cardData);

    // return;
    const propsData = this.props.data;
    // Create Order.
    let formData = new FormData();
    const {cardData} = this.state;

    let price = propsData.price + '00';

    formData.append('designer_id', global.curUser.id);
    formData.append('model_id', propsData.model.user.id);
    formData.append('description', propsData.description);
    formData.append('designer_email', propsData.email);
    formData.append('designer_phone', propsData.phone);
    formData.append('designer_name', propsData.designerName);
    formData.append('designer_addr', propsData.address);

    let idx = 0;
    propsData.images.forEach((one, index) => {
      formData.append('images[' + idx + ']', {
        uri: one.src.uri,
        type: 'image/jpeg',
        name: Utils.getFileName(one.src.uri),
      });
      idx += 1;
    });

    showPageLoader(true);
    RestAPI.generalFormPost('order/create', formData)
      .then((res) => {
        const orderId = res.id;
        let data = {
          user_id: global.curUser.id,
          number: cardData.cardNumber,
          exp_month: cardData.expMonth,
          exp_year: cardData.expYear,
          cvc: cardData.cvc,
          amount: price,
          currency: 'usd',
          order_id: orderId,
          description: propsData.description,
        };
        RestAPI.generalPost('payment/checkoutCard', data)
          .then((resCharge) => {
            Alert.alert(
              'Order Submit',
              'Your order has been submitted successfully.',
            );
            this.props.navigation.popToTop();
            this.props.navigation.navigate('LocationScreen');
          })
          .catch((errCharge) => {
            Alert.alert('Failed', errCharge.msg || JSON.stringify(errCharge));
          })
          .finally(() => {
            showPageLoader(false);
          });
      })

      .catch((err) => {
        showPageLoader(false);
        Alert.alert('Failed', err.msg || JSON.stringify(err));
      });

    // Create Charge with created Order above.
  };

  checkoutPaySource = (paySource) => {
    Alert.alert('Order Submit', 'Your order has been submitted successfully.');
    if (this.props.onTapCheckout) {
      this.props.onTapCheckout();
    }
    return;
    const {stripe_cus_id, stripe_card_id} = paySource;

    const propsData = this.props.data;
    // Create Order.
    let formData = new FormData();
    const {cardData} = this.state;

    formData.append('designer_id', global.curUser.id);
    formData.append('model_id', propsData.model.user.id);
    formData.append('description', propsData.description);
    formData.append('designer_email', propsData.email);
    formData.append('designer_phone', propsData.phone);
    formData.append('designer_name', propsData.designerName);
    formData.append('designer_addr', propsData.address);

    let idx = 0;
    propsData.images.forEach((one, index) => {
      formData.append('images[' + idx + ']', {
        uri: one.src.uri,
        type: 'image/jpeg',
        name: Utils.getFileName(one.src.uri),
      });
      idx += 1;
    });

    let price = propsData.price + '00';

    showPageLoader(true);
    RestAPI.generalFormPost('order/create', formData)
      .then((res) => {
        const orderId = res.id;

        let data = {
          user_id: global.curUser.id,
          cusId: stripe_cus_id,
          cardId: stripe_card_id,
          amount: price,
          currency: 'usd',
          order_id: orderId,
          description: propsData.description,
        };

        RestAPI.generalPost('payment/checkoutPaySource', data)
          .then((resCharge) => {
            Alert.alert(
              'Order Submit',
              'Your order has been submitted successfully.',
            );
            this.props.navigation.popToTop();
            this.props.navigation.navigate('LocationScreen');
          })
          .catch((errCharge) => {
            Alert.alert('Failed', errCharge.msg || JSON.stringify(errCharge));
          })
          .finally(() => {
            showPageLoader(false);
          });
      })

      .catch((err) => {
        showPageLoader(false);
        Alert.alert('Failed', err.msg || JSON.stringify(err));
      });
  };

  render() {
    return (
      <>
        <KeyboardAvoidingView
          style={{flex: 1, backgroundColor: Constants.backColor}}
          behavior={Platform.OS == 'ios' ? 'padding' : 'height'}>
          <ScrollView
            keyboardShouldPersistTaps={'always'}
            style={{flex: 1}}
            contentContainerStyle={{paddingBottom: 20, paddingTop: 20,}}>
            <View
              style={{
                flex: 1,
                flexDirection: 'column',
              }}>
              <CardCheckoutView
                onChange={(data) => {
                  this.setState({cardData: data});
                }}
              />

              <View
                style={{
                  height: 60,
                  // width: Constants.WINDOW_WIDTH,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <GradientButton
                  style={{width: '100%', height: 45}}
                  title={'CHECK OUT ($' + this.props.data.price + ')'}
                  onPress={this.onTapNext}
                />
              </View>
              <Text
                style={styles.descriptionText}>
                After the checkout, we might need to contact you for more
                clarifications.container
              </Text>
              <Text
                style={styles.descriptionText}>
                Kindly review your contact information, and make sure to fill
                all the fields correctly.
              </Text>

              <Text
                style={styles.descriptionText}>
                For more info, please visit
              </Text>
              <TouchableOpacity
                style={{
                  alignItems: 'center',
                }}
                onPress={() => {
                  Linking.openURL('https://fashionarmy.club');
                }}>
                <View
                  style={{
                    width: 150,
                    paddingBottom: 2,
                    borderBottomColor: Constants.lightGold,
                    borderBottomWidth: 1,
                  }}>
                  <Text
                    style={styles.descriptionText}>
                    fashionarmy.club
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </ScrollView>

          <PickerModal
            pickList={
              this.state.paySources &&
              this.state.paySources.map(
                (one) => one.brand + ' (' + one.country + ') ....' + one.last4,
              )
            }
            selectedIndex={0}
            onTapSelect={(index, val) => {
              Alert.alert('Confirm', 'Are you sure to use this card?', [
                {
                  style: 'default',
                  text: 'Yes',
                  onPress: () => {
                    this.checkoutPaySource(this.state.paySources[index]);
                    this.setState({showPaySource: false});
                  },
                },
                {
                  style: 'cancel',
                  text: 'No',
                  onPress: () => {
                    this.setState({showPaySource: false});
                  },
                },
              ]);
            }}
            onTapClose={() => {
              this.setState({showPaySource: false});
            }}
            isShow={this.state.showPaySource}
          />
        </KeyboardAvoidingView>
      </>
    );
  }
}

export default function (props) {
  const navigation = useNavigation();
  const route = useRoute();

  // const data = route.params?.data;
  const {data} = props;
  // console.error('checkout view props:', data)
  return (
    <CheckoutView
      {...props}
      navigation={navigation}
      route={route}
      data={data}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    // flex:1,
    color: Constants.lightGold,
    fontSize: 18,
    borderBottomColor: Constants.lightGold,
    borderBottomWidth: 1,
    height: 40,
    padding: 10,
    marginVertical: 7,
  },
  descriptionText:{
    color: Constants.lightGold,
    fontSize: 15,
    textAlign: 'center',
    padding: 10,
    marginTop: 5,
  }
});
