import React from "react";
import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Text,
  FlatList,
  ScrollView,
  SafeAreaView,
  KeyboardAvoidingView,
} from "react-native";
// import {
//   EvilIcons,
//   Entypo,
//   AntDesign,
//   Ionicons,
//   FontAwesome5,
// } from "@expo/vector-icons";
import Entypo from 'react-native-vector-icons/Entypo'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Ionicons from 'react-native-vector-icons/Ionicons'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'

// import * as Permissions from "expo-permissions";
import {check, PERMISSIONS, RESULTS} from 'react-native-permissions';

import Constants, { StatusBarHeight, isIOS } from "../../../../utils/Constants";
import { HeaderBar } from "../../../../components/HeaderBar";

import {
  NavigationContext,
  useNavigation,
  useRoute,
} from "@react-navigation/native";

import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

// import * as ImagePicker from "expo-image-picker";

import GradientButton from "../../../../components/GradientButton";
import { ModelPhotoItem } from "./ModelProfilePage";
 

class OutfitScreen extends React.Component {
  static contextType = NavigationContext;

  constructor(props) {
    super(props);
    this.state = {
      isKeyboardShowing: false,
      description: "",
      model: props.model,
      images: [],
    };
  }

  componentDidMount() {}

  componentWillUnmount() {}

  onGoBack = () => {
    const navigation = this.context;
    navigation.goBack();
  };

  showModelDetail = (selectedItem) => {
    const navigation = this.context;
    navigation.navigate("ModelDetailScreen");
  };
  checkCameraPermission = async () => {
    const cameraPermission = await Permissions.getAsync(Permissions.CAMERA);

    if (cameraPermission.status !== "granted") {
      const askCameraPermission = await Permissions.askAsync(
        Permissions.CAMERA
      );

      if (askCameraPermission.status != "granted") {
        alertOk(
          "Fashion Army",
          "Fashion Army uses camera to take your photo.",
          () => {
            Permissions.askAsync(Permissions.CAMERA);
          },
          MsgTypes.warn
        );

        this.setState({ hasCameraPermission: false });
        return false;
      }
    }

    const cameraRollPermission = await Permissions.getAsync(
      Permissions.CAMERA_ROLL
    );

    if (cameraRollPermission.status !== "granted") {
      const askCameraRollPermission = await Permissions.askAsync(
        Permissions.CAMERA_ROLL
      );

      if (askCameraRollPermission.status !== "granted") {
        alertOk(
          "Fashion Army",
          "Fashion Army uses camera roll to take your photo.",
          () => {
            Permissions.askAsync(Permissions.CAMERA_ROLL);
          },
          MsgTypes.warn
        );

        this.setState({ hasCameraPermission: false });
        return false;
      }
    }

    this.setState({ hasCameraPermission: true });
    return true;
  };
  onTapPickImageFromCamera = async () => {
    await this.checkCameraPermission();
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [3, 4],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      this.addPhotoList(result.uri);
    }
  };

  onTapPickImageFromGallery = async () => {
    await this.checkCameraPermission();
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [3, 4],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      this.addPhotoList(result.uri);
    }
  };

  addPhotoList = (uri) => {
    let images = [];
    Object.assign(images, this.state.images);
    if (images.length >= 5) {
      Alert.alert("Max Photos", "You can only select 5 photos.");
      return;
    }
    images.push({ id: this.state.images.length, src: { uri: uri } });
    this.setState({
      images: images,
    });
  };

  onTapTrashPhoto = (id) => {
    let images = [];

    this.state.images.forEach((one) => {
      if (one.id != id) {
        images.push(one);
      }
    });
    this.setState({
      images: images,
    });
  };

  validation = ()=>{
    const {model ,images, description} = this.state;

    if(!model){
      failed("Validation Error", "Please select model.")
      return false;
    }
    if(!description) {
      failed("Validation Error", "Please enter description.")
      return false;
    }
    return true
  }
  onTapNext = () => {

    if(!this.validation()){
      return;
    }


    this.props.navigation.navigate("ContactInfoPage", {
      model: this.state.model,
      images: this.state.images,
      description: this.state.description,
      price: this.props.price,
    });
  };

  render() {
    // const emailRef = React.createRef();
    // const passwordRef = React.createRef();

    return (
      <>
        <SafeAreaView
          style={{ flex: 0, backgroundColor: Constants.backColor }}
        />
        <SafeAreaView style={{ flex: 1, backgroundColor: Constants.backColor }}>
          <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS == "ios" ? "padding" : "height"}
          >
            <ScrollView
              style={{ flex: 1, backgroundColor: Constants.backColor }}
              contentContainerStyle={{ paddingBottom: 100 }}
              keyboardShouldPersistTaps={"always"}
            >
              <View
                style={{
                  // marginTop: isIOS() ? StatusBarHeight : 0,
                  flex: 1,
                  flexDirection: "column",
                  backgroundColor: Constants.backColor,
                }}
              >
                <View
                  style={{
                    flex: 1,
                    width: "100%",
                    paddingTop: 60,
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <View
                    style={{
                      width: Constants.WINDOW_WIDTH * 0.9,
                      flexDirection: "row",
                      marginTop: 10,
                      alignItems: "center",
                    }}
                  >
                    <TextInput
                      blurOnSubmit={false}
                      placeholder="Describe your outfit"
                      placeholderTextColor={Constants.lightGold}
                      inputStyle={{
                        fontSize: 15,
                        textAlign: "left",
                        color: "white",
                      }}
                      style={{
                        flex: 1,
                        borderColor: Constants.lightGold,
                        borderRadius: 10,
                        borderWidth: 1,
                        height: Constants.WINDOW_HEIGHT * 0.3,
                        padding: 10,
                        color: "white",
                        fontSize: 18,
                      }}
                      textAlignVertical={"top"}
                      multiline={true}
                      returnKeyType="done"
                      inputContainerStyle={{
                        height: Constants.WINDOW_HEIGHT * 0.3,
                        textAlign: "left",
                        backgroundColor: "rgba(255, 255, 255, 0.7)",
                      }}
                      keyboardType="default"
                      value={this.state.description}
                      onChangeText={(description) =>
                        this.setState({ description })
                      }
                    />
                  </View>
                  <View
                    style={{
                      width: Constants.WINDOW_WIDTH * 0.9,
                      marginTop: 10,
                      justifyContent: "center",
                    }}
                  >
                    <View
                      style={{
                        flexDirection: "row",
                        paddingVertical: 10,
                        justifyContent: "space-between",
                      }}
                    >
                      <View style={{ flexDirection: "row" }}>
                        <AntDesign
                          name="plussquareo"
                          size={24}
                          color={Constants.lightGold}
                        />
                        <Text
                          style={{
                            color: Constants.lightGold,
                            marginLeft: 10,
                            fontSize: 15,
                          }}
                        >
                          Add mood board picture
                        </Text>
                      </View>
                      <View style={{ flexDirection: "row" }}>
                        <TouchableOpacity
                          style={{ marginHorizontal: 5 }}
                          onPress={this.onTapPickImageFromGallery}
                        >
                          <Ionicons
                            name="ios-images"
                            size={30}
                            color={Constants.lightGold}
                          />
                        </TouchableOpacity>
                        <TouchableOpacity
                          style={{ marginHorizontal: 5 }}
                          onPress={this.onTapPickImageFromCamera}
                        >
                          <FontAwesome5
                            name="camera-retro"
                            size={28}
                            color={Constants.lightGold}
                          />
                        </TouchableOpacity>
                      </View>
                    </View>
                    {!(this.state.images && this.state.images.length > 0) && (
                      <Text
                        style={{
                          padding: 20,
                          color: Constants.lightGold,
                          fontSize: 18,
                          textAlign: "center",
                        }}
                      >
                        We recommend you to add a picture for your mood board
                        for customized specifications.
                        Otherwise: the model has the right to do it in her best way.
                      </Text>
                    )}
                    <FlatList
                      style={{
                        height: Constants.WINDOW_HEIGHT * 0.35,
                        paddingVertical: 10,
                      }}
                      horizontal={true}
                      renderItem={({ item, index, separate }) => {
                        return (
                          <ModelPhotoItem
                            itemWidth={Constants.WINDOW_WIDTH * 0.4}
                            item={item}
                            onTapTrash={(id) => {
                              this.onTapTrashPhoto(id);
                            }}
                          />
                        );
                      }}
                      keyExtractor={(item) => item.id}
                      data={this.state.images}
                    />
                  </View>
                  {/* <View
                    style={{
                      height: 60,
                      width: Constants.WINDOW_WIDTH,
                      alignItems: "center",
                      justifyContent: "center",
                      backgroundColor: Constants.backColor,
                    }}
                  >
                    <GradientButton
                      style={{
                        width: Constants.WINDOW_WIDTH * 0.8,
                        height: 45,
                      }}
                      title={"NEXT"}
                      onPress={this.onTapNext}
                    />
                  </View> */}
                </View>

                
              </View>
            </ScrollView>
            <HeaderBar
                  title="OUTFIT"
                  onLeftButton={() => {
                    this.onGoBack();
                  }}
                  leftIcon={
                    <Entypo
                      name="chevron-thin-left"
                      size={24}
                      color={Constants.lightGold}
                    />
                  }
                  rightIcon={
                    <AntDesign name="check" size={30} color={Constants.lightGold} />            
                  }
                  onRightButton={this.onTapNext}
                  isShowRight={true}
                  isShowLeft={true}
                  backgroundColor={"#fff0"}
                  leftIconColor={"#fff"}
                />
          </KeyboardAvoidingView>
        </SafeAreaView>
      </>
    );
  }
}

export default function (props) {
  const navigation = useNavigation();
  const route = useRoute();

  return (
    <OutfitScreen
      {...props}
      navigation={navigation}
      route={route}
      model={route.params?.model}
      price={route.params?.price}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    maxWidth: "100%",
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Constants.backColor,
  },
});
