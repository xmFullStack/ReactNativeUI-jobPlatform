import React from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Alert,
  Text,
  SafeAreaView,
} from "react-native";
import { BallIndicator } from "react-native-indicators";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Feather from 'react-native-vector-icons/Feather'


import {
  NavigationContext,
  useNavigation,
  useRoute,
} from "@react-navigation/native";


import Constants from "../../../../utils/Constants";
import HeaderBar from "../../../../components/HeaderBar";

import RestAPI, { uploadsHostUrl } from "../../../../utils/RestAPI";
import Utils from "../../../../utils/Utils";
import { SwipeListView } from "react-native-swipe-list-view";

class NotificationPage extends React.Component {
  static contextType = NavigationContext;

  constructor(props) {
    super(props);

    this.state = {
      data: null,
      isLoading: false,
    };
  }
  onLogout = async () => {
    const { navigation, route } = this.props;

    global.curUser = null;
    await Utils.saveCurUser(null);
    navigation.popToTop();
  };

  loadData = () => {
    // if (this.state.isLoading) {
    //   return;
    // }
    this.setState({ isLoading: true });

    RestAPI.generalPost("getNotificationList", { userId: global.curUser.id ?? 1})
      .then((res) => {
        // showPageLoader(false);
        if (res.length == 0) {
        }
        this.setState({ data: res });
        this.setState({ isLoading: false });
        global.badgeCount = res.length
        
        if(global.updateBadgeCount){
          global.updateBadgeCount(global.badgeCount)
        }
        
      })
      .catch((err) => {
        // showPageLoader(false);
        this.setState({ isLoading: false });
        // Alert.alert("Error", err.msg || JSON.stringify(err));
      })
      .finally(() => {});
  };

  removeNotification = (notificationId) => {
    this.setState({ isLoading: true });

    RestAPI.generalPost("updateNotification", {
      notificationId: notificationId,
      isRead: 1,
    })
      .then((res) => {
        this.loadData();
      })
      .catch((err) => {
        // showPageLoader(false);
        this.setState({ isLoading: false });
        console.log(err);
        // Alert.alert("Error", err.msg || JSON.stringify(err));
      });
  };

  showModelVideo = (selectedItem) => {
    const navigation = this.context;
    navigation.navigate("ModelDetailScreen", {
      model: selectedItem,
      onlyShow: true,
    });
  };

  showImagesModel = (selectedItem) => {
    const navigation = this.context;
    navigation.navigate("ModelImagesPage", {
      model: selectedItem,
      onlyShow: true,
    });
  };

  componentDidMount() {
    const { navigation, route } = this.props;
    global.loadNotification = this.loadData;
    this._unsubscribe = navigation.addListener("focus", () => {
      this.loadData();
    });
  }

  componentWillUnmount() {
    global.loadNotification = null;
    this._unsubscribe();
  }

  render() {
    const { navigation, route } = this.props;

    return (
      <>
        <SafeAreaView
          style={{ flex: 0, backgroundColor: Constants.backColor }}
        />
        <SafeAreaView style={{ flex: 1, backgroundColor: Constants.backColor }}>
          <View style={styles.container}>
            <HeaderBar
              title={"Notifications"}
              isShowRight={true}
              isShowLeft={true}
              leftIcon={
                global.curUser.role == 2 ? (
                  <MaterialCommunityIcons
                    name="logout"
                    size={26}
                    color={Constants.lightGold}
                  />
                ) : (
                  <Feather
                    name="chevron-left"
                    size={26}
                    color={Constants.lightGold}
                  />
                )
              }
              rightIcon={
                this.state.isLoading ? (
                  <BallIndicator color={Constants.lightGold} size={24} />
                ) : (
                  <MaterialCommunityIcons
                    name="refresh"
                    size={28}
                    color={Constants.lightGold}
                  />
                )
              }
              onLeftButton={() => {
                if (global.curUser.role == 2) {
                  this.onLogout();
                } else {
                  const navigation = this.context;
                  navigation.goBack();
                }
              }}
              onRightButton={this.loadData}
            />

            <View
              style={{ flex: 1, padding: 10, marginTop: 50, width: "100%" }}
              //   contentContainerStyle={{ paddingBottom: 50 }}
            >
              {/* <View style={styles.scrollContainer}> */}
              {!this.state.data || this.state.data.length == 0 ? (
                <View
                  style={{
                    flex: 1,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Text style={{ color: "white" }}>Empty notifications</Text>
                </View>
              ) : (
                <SwipeListView
                  ref={"listView"}
                  data={this.state.data}
                  onRefresh={this.loadData}
                  refreshing={this.state.isLoading}
                  ItemSeparatorComponent={() => {
                    return (
                      <View
                        style={{
                          width: "100%",
                          height: 0.5,
                          backgroundColor: Constants.darkGold,
                        }}
                      />
                    );
                  }}
                  renderItem={(data, rowMap) => (
                    <View
                      style={{
                        paddingVertical: 8,
                        paddingHorizontal: 10,
                        width: "100%",
                        flexDirection: "row",
                        alignItems: "center",
                        backgroundColor: "black",
                      }}
                    >
                      <MaterialCommunityIcons
                        name="bell-outline"
                        size={24}
                        color={Constants.darkGold}
                        style={{ marginRight: 10 }}
                      />
                      <Text style={{ color: "white", flex: 1 }}>
                        {data.item.message}
                      </Text>
                    </View>
                  )}
                  renderHiddenItem={(data, rowMap) => (
                    <View
                      style={{
                        backgroundColor: "black",
                        color: Constants.lightGold,
                        height: "100%",
                        alignItems: "flex-end",
                        justifyContent: "center",
                        paddingRight: 0,
                      }}
                    >
                      <TouchableOpacity
                        onPress={() => {
                          rowMap[data.item.id].closeRow();
                          this.removeNotification(data.item.id);
                        }}
                        style={{
                          width: 70,
                          height: "100%",
                          alignItems: "center",
                          justifyContent: "center",
                          backgroundColor: Constants.checkoutBackDark,
                        }}
                      >
                        <MaterialIcons
                          name="close"
                          size={25}
                          color={Constants.lightGold}
                        />
                      </TouchableOpacity>
                    </View>
                  )}
                  keyExtractor={(item) => item.id}
                  // leftOpenValue={75}
                  rightOpenValue={-75}
                />
              )}

           
            </View>
          </View>
        </SafeAreaView>
      </>
    );
  }
}

export default function (props) {
  const navigation = useNavigation();
  const route = useRoute();

  return <NotificationPage {...props} navigation={navigation} route={route} />;
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignSelf: "center",
    backgroundColor: Constants.backColor,
  },
  scrollContainer: {
    alignItems: "stretch",
  },
  input: {
    borderColor: Constants.lightGold,
    borderRadius: 10,
    borderWidth: 1,
    height: 45,
    padding: 10,
    marginVertical: 7,
    color: Constants.lightGold,
  },
  label: {
    color: Constants.white,
    fontSize: 15,
    marginVertical: 5,
  },
});
