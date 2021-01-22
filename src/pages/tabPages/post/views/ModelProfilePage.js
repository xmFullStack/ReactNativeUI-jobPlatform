import React from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  ScrollView,
  FlatList,
  TextInput,
  Text,
  Image,
  Alert,
  SafeAreaView,
  KeyboardAvoidingView,
  
} from "react-native";

import ActionSheet from "../../../../components/ActionSheet";

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Entypo from 'react-native-vector-icons/Entypo'



import {
  NavigationContext,
  StackActions,
  useNavigation,
  useRoute,
} from "@react-navigation/native";

import Constants from "../../../../utils/Constants";
import HeaderBar from "../../../../components/HeaderBar";


import GradientButton from "../../../../components/GradientButton";

import RestAPI, { uploadsHostUrl } from "../../../../utils/RestAPI";
import Utils from "../../../../utils/Utils";
import VideoPlayerModal from '../../../../components/VideoPlayerModal'


export function ModelPhotoItem({
  item,
  itemWidth,
  onTapTrash,
  showTrash = true,
}) {
  let width = itemWidth ? itemWidth : Constants.WINDOW_WIDTH * 0.4;
  let height = (width * 4) / 3;
  return (
    <View
      style={{
        width: width,
        height: height,
        // marginHorizontal: 10,
      }}
    >
      <Image
        resizeMode={"cover"}
        style={{ width: "100%", height: "100%" }}
        source={item.src}
      />
      {showTrash && (
        <TouchableOpacity
          style={{
            position: "absolute",
            right: 15,
            top: 3,
            width: 26,
            height: 26,
            borderRadius: 13,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: Constants.opacityBlack,
          }}
          onPress={() => {
            Alert.alert(
              "Confirm",
              "Are you sure you want to remove this photo?",
              [
                {
                  text: "No",
                  style: "cancel",
                },
                {
                  text: "Yes",
                  style: "default",
                  onPress: () => {
                    if (onTapTrash) {
                      onTapTrash(item.id);
                    }
                  },
                },
              ]
            );
          }}
        >
          <Entypo name="trash" size={16} color={"white"} />
        </TouchableOpacity>
      )}
    </View>
  );
}

class ModelProfilePage extends React.Component {
  static contextType = NavigationContext;

  constructor(props) {
    super(props);

    this.state = {
      isPlay: false,
      images: [],
      videoUri: null,
      location: null,
      style: null,
      locationList: null,
      styleList: null,
      height: null,
      waist: null,
      bust: null,
      hip: null,
      videoFullShow: false,
      demoVideoShow: false,
    };
  }
  onLogout = async () => {
    const { navigation, route } = this.props;

    global.curUser = null;
    await Utils.saveCurUser(null);
    navigation.popToTop();
  };

  loadData = () => {
    showPageLoader(true);

    RestAPI.generalPost("location/list")
      .then((res) => {
        showPageLoader(false);
        this.setState({ locationList: res });
      })
      .catch((err) => {
        showPageLoader(false);
        Alert.alert("Error", err.msg || JSON.stringify(err));
      });

    RestAPI.generalPost("style/list")
      .then((res) => {
        this.setState({ styleList: res });
      })
      .catch((err) => {
        console.log(err);
        Alert.alert("Error", err.msg || JSON.stringify(err));
      });

    RestAPI.generalPost("profile/show", { model_id: global.curUser.id })
      .then((res) => {
        const images = res.images.map((one) => {
          return {
            id: one.id,
            isRemote: true,
            src: { uri: uploadsHostUrl + one.image },
          };
        });

        this.setState({
          style: res.profile?.style,
          userStyles: res.styles,
          location: res.profile?.location,
          videoUri: res.videos && res.videos.length > 0 ? ( uploadsHostUrl + res.videos[0].short_video ): null,
          images: images,
          isRemoteVideo: true,
          height: res.profile?.height,
          waist: res.profile?.waist,
          bust: res.profile?.bust,
          hip: res.profile?.hip,
          experience: res.profile?.experience,
          description: res.profile?.description,
        });
      })
      .catch((err) => {
        Alert.alert("Oops", err.msg || JSON.stringify(err));
      });
  };
  componentDidMount() {
    const { navigation, route } = this.props;

    this._unsubscribe = navigation.addListener("focus", () => {
      this.loadData();
    });
  }

  componentWillUnmount() {
    this._unsubscribe();
  }

  onTapPickVideo = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Videos,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      Alert.alert("", result.uri);
      this.setState({
        videoUri: result.uri,
        isRemoteVideo: false,
      });
    }
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

  onTapPickVideoRecord = async (isCamera) => {

    await this.checkCameraPermission();

    let result = isCamera ? await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Videos,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    }) : await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Videos,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    })

    if (result.duration > 40000) {
      Alert.alert("Oops", "You can record video in 30 seconds only.");
    } else {
      if (!result.cancelled) {

        console.log('video take result : ', result)
        let w = result.width
        let h = result.height
        if(result.rotation == 90 || result.rotation == 270) {
          w = result.height;
          h = result.width;
        }

        this.setState({
          videoUri: result.uri,
          videoSize:{
            width: w,
            height: h
          },
          isRemoteVideo: false,
        });
      }
    }

    this.setState({showVideoOption: false})
  };


  onTapPickVideoOption = ()=>{
    this.setState({showVideoOption: true})
  }

  onTapAddPhoto = ()=>{
    this.setState({showPhotoOption: true})
  }

  onTapPickPhoto = async (isCamera)=>{
    await this.checkCameraPermission();
    if(isCamera){
      await this.onTapPickImageFromCamera()
    }else{
      await this.onTapPickImage()
    }
    
  }

  onTapPickImage = async () => {
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
    this.setState({showPhotoOption: false})
  };

  onTapPickImageFromCamera = async () => {
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
    this.setState({showPhotoOption: false})
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

  validation = () => {
    const {
      images,
      videoUri,
      location,
      userStyles,
      height,
      waist,
      hip,
      bust,
      experience,
    } = this.state;
    if (images == null || images.length == 0) {
      Alert.alert(
        "Validation Error",
        "Please take your photo to show designers."
      );
      return false;
    }

    if (videoUri == null) {
      Alert.alert(
        "Validation Error",
        "Please take simple video to show designer."
      );
      return false;
    }
    if (userStyles == null || userStyles.length == 0) {
      Alert.alert("Validation Error", "Please select your style.");
      return false;
    }

    if (location == null) {
      Alert.alert("Validation Error", "Please select your location.");
      return false;
    }

    if (waist === null) {
      Alert.alert("Validation Error", "Please enter your waist.");
      return false;
    }

    if (height === null) {
      Alert.alert("Validation Error", "Please enter your height.");
      return false;
    }

    if (hip === null) {
      Alert.alert("Validation Error", "Please enter your hip.");
      return false;
    }

    if (bust === null) {
      Alert.alert("Validation Error", "Please enter your bust.");
      return false;
    }

    if (experience === null) {
      Alert.alert("Validation Error", "Please enter your experience years.");
      return false;
    }

    return true;
  };
  onSubmit = () => {
    const {
      images,
      videoUri,
      location,
      style,
      userStyles,
      height,
      waist,
      hip,
      bust,
      experience,
      description,
    } = this.state;

    if (this.validation() == false) {
      return;
    }

    // TODO make style_id_list for userStyles
    let style_id_list = ''
    

    if(userStyles && userStyles.length > 0) {
      const idList = userStyles.map(one=>one.id)
      style_id_list = idList.join(',')  
    }

    let data = new FormData();
    data.append("user_id", global.curUser.id);
    data.append("location_id", location.id);
    data.append('style_id_list', style_id_list)
    // data.append("style_id", style.id);

    data.append("height", height);
    data.append("waist", waist);
    data.append("hip", hip);
    data.append("bust", bust);
    data.append("experience", experience);
    data.append("description", description);

    if(videoUri && this.state.videoSize){
      data.append("video", {
        uri: videoUri,
        type: "video/mp4",
        name: "video",
      });

      data.append('video_width', this.state.videoSize.width)
      data.append('video_height', this.state.videoSize.height)
    }
    

    let idx = 0;
    images.forEach((one, index) => {
      // if (!one.isRemote) {
      data.append("images[" + idx + "]", {
        uri: one.src.uri,
        type: "image/jpeg",
        name: Utils.getFileName(one.src.uri),
      });
      idx += 1;
      // }
    });

    showPageLoader(true);
    RestAPI.generalFormPost("profile/create", data)
      .then(async(res) => {
        showPageLoader(false);
        // Alert.alert("Success", "Successfully submitted.");
        
        // const isShown = await AsyncStorage.getItem("model_submit_demo_shown");

        if(res.showPopup){

          Alert.alert('FashionArmy', 'Thanks, for your info, you will receive a notification about your profile status.', [
            {
              text:'Ok',
              onPress:()=>{
                // this.setState({ demoVideoShow: true})
                this.props.navigation.navigate('models')
              },
              style:'default'
            }
          ])
          
          // await AsyncStorage.setItem("model_submit_demo_shown", 'true');
        }else{
          this.props.navigation.navigate('models')
        }
        
        
      })
      .catch((err) => {
        showPageLoader(false);
        Alert.alert("Failed", err.msg || JSON.stringify(err));
      });
  };

  onTapPlay = async () => {
    this.setState({videoFullShow: true})
    return;
    
    let status = await this.refs.videoRef.getStatusAsync();
    // console.log('status', status)

    if (status.isPlaying == true) {
      this.refs.videoRef.pauseAsync();
    } else if (status.positionMillis == 0) {
      this.refs.videoRef.playAsync();
    } else if (status.positionMillis < status.durationMillis) {
      this.refs.videoRef.playAsync();
    } else {
      this.refs.videoRef.replayAsync();
    }
  };


  selectStyle = (style)=>{
    const {userStyles} = this.state
    let isContained = false
    let newStyles = []

    if(userStyles &&  userStyles.length > 0){
      console.log('if(userStyles &&  userStyles.length > 0)  : ')
      for(let i=0; i<userStyles.length; i++ ) {
        if(userStyles[i].id == style.id) {
          isContained = true;          
        }else{
          newStyles.push(userStyles[i])
        }
      }
    }

    if(isContained ==false){
      newStyles.push(style)
    }

    // Alert.alert('userstyles count : ', JSON.stringify(newStyles))
    this.setState({ userStyles: newStyles})

  }
  render() {
    const selStyleNames = this.state.userStyles ? (this.state.userStyles?.map(one=>one.name)).join(',') : ''
    return (
      <>
        <SafeAreaView
          style={{ flex: 0, backgroundColor: Constants.backColor }}
        />
        <SafeAreaView style={{ flex: 1, backgroundColor: Constants.backColor }}>
          <View style={styles.container}>
            <HeaderBar
              title={"My Profile"}
              isShowRight={true}
              isShowLeft={false}
              rightIcon={
                <MaterialCommunityIcons
                  name="logout"
                  size={26}
                  color={Constants.lightGold}
                />
              }
              onRightButton={this.onLogout}
            />
            <KeyboardAvoidingView
              style={styles.container}
              behavior={Platform.OS == "ios" ? "padding" : "height"}
            >
              <ScrollView
                style={{ flex: 1, padding: 10, marginTop: 50 }}
                contentContainerStyle={{ paddingBottom: 50 }}
              >
                <View style={styles.scrollContainer}>
                  <View>
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                      }}
                    >
                      <View style={{ flex: 1, marginRight: 10 }}>
                        <Text style={styles.label}>Height (Inches)</Text>
                        <TextInput
                          ref={"heightRef"}
                          blurOnSubmit={false}
                          placeholder="Height"
                          style={styles.input}
                          keyboardType="default"
                          value={this.state.height?.toString()}
                          onChangeText={(height) => this.setState({ height })}
                          onSubmitEditing={() => {
                            this.refs.waistRef.focus();
                          }}
                        />
                      </View>
                      <View style={{ flex: 1 }}>
                        <Text style={styles.label}>Waist (Inches)</Text>
                        <TextInput
                          ref={"waistRef"}
                          blurOnSubmit={false}
                          placeholder="Waist"
                          style={styles.input}
                          keyboardType="default"
                          value={this.state.waist?.toString()}
                          onChangeText={(waist) => this.setState({ waist })}
                          onSubmitEditing={() => {
                            this.refs.hipRef.focus();
                          }}
                        />
                      </View>
                    </View>
                    <View style={{ flexDirection: "row" }}>
                      <View style={{ flex: 1, marginRight: 10 }}>
                        <Text style={styles.label}>Hip (Inches)</Text>
                        <TextInput
                          ref={"hipRef"}
                          blurOnSubmit={false}
                          placeholder="Hip"
                          style={styles.input}
                          keyboardType="default"
                          value={this.state.hip?.toString()}
                          onChangeText={(hip) => this.setState({ hip })}
                          onSubmitEditing={() => {
                            this.refs.bustRef.focus();
                          }}
                        />
                      </View>
                      <View style={{ flex: 1 }}>
                        <Text style={styles.label}>Bust (Inches)</Text>
                        <TextInput
                          ref={"bustRef"}
                          blurOnSubmit={false}
                          placeholder="Bust"
                          style={styles.input}
                          keyboardType="default"
                          value={this.state.bust?.toString()}
                          onChangeText={(bust) => this.setState({ bust })}
                          onSubmitEditing={() => {
                            this.refs.experienceRef.focus();
                          }}
                        />
                      </View>
                    </View>

                    <Text style={styles.label}>
                      Modeling Experience (years)
                    </Text>
                    <TextInput
                      ref={"experienceRef"}
                      blurOnSubmit={true}
                      placeholder="Experience Years"
                      style={styles.input}
                      keyboardType="default"
                      value={this.state.experience?.toString()}
                      onChangeText={(experience) =>
                        this.setState({ experience })
                      }
                    />
                    <Text style={styles.label}>Tell More About Yourself</Text>
                    <TextInput
                      multiline={true}
                      style={{
                        width: "100%",
                        height: 100,
                        borderColor: "red",
                        borderWidth: 1,
                        color: Constants.lightGold,
                        padding: 10,
                        textAlignVertical: "top",
                        borderRadius: 10,
                        borderColor: Constants.lightGold,
                        borderWidth: 1,
                      }}
                      contentContainerStyle={{
                        padding: 10,
                      }}
                      value={this.state.description}
                      onChangeText={(val) => {
                        this.setState({ description: val });
                      }}
                    ></TextInput>
                    <Text style={styles.label}>
                      Select Location : {this.state.location?.name}
                    </Text>
                    <FlatList
                      style={{
                        width: "100%",
                        height: Constants.WINDOW_WIDTH * 0.28,
                      }}
                      data={this.state.locationList}
                      horizontal={true}
                      renderItem={({ item, index }) => {
                        return (
                          <TouchableOpacity
                            style={{
                              width: Constants.WINDOW_WIDTH * 0.28,
                              height: Constants.WINDOW_WIDTH * 0.28,
                              marginHorizontal: 10,
                              borderColor:
                                this.state.location?.id == item.id
                                  ? Constants.darkGold
                                  : Constants.backColor,
                              borderWidth: 1,
                            }}
                            onPress={() => {
                              this.setState({ location: item });
                            }}
                          >
                            <Image
                              source={{ uri: uploadsHostUrl + item.image }}
                              resizeMode={"cover"}
                              style={{ flex: 1 }}
                            />
                            <Text
                              style={{
                                position: "absolute",
                                bottom: 0,
                                left: 0,
                                width: "100%",
                                backgroundColor: Constants.opacityBlack,
                                textAlign: "center",
                                textAlignVertical: "center",
                                color: Constants.lightGold,
                              }}
                            >
                              {item.name}
                            </Text>
                          </TouchableOpacity>
                        );
                      }}
                      keyExtractor={(_item, index) =>
                        "location-" + index.toString()
                      }
                    />
                  </View>

                  <View>
                    <Text style={styles.label}>
                      Select Style : {selStyleNames}
                    </Text>
                    <FlatList
                      style={{
                        width: "100%",
                        height: Constants.WINDOW_WIDTH * 0.28,
                      }}
                      data={this.state.styleList}
                      horizontal={true}
                      renderItem={({ item, index }) => {
                        let isSel = false;
                        if(this.state.userStyles && this.state.userStyles.length > 0){
                          for(let i =0; i<this.state.userStyles.length ; i++) {
                            const one = this.state.userStyles[i]
                            if(one.id == item.id){
                              isSel = true
                            }
                          }                         
                        }
                        
                        return (
                          <TouchableOpacity
                            style={{
                              width: Constants.WINDOW_WIDTH * 0.28,
                              height: Constants.WINDOW_WIDTH * 0.28,
                              marginHorizontal: 10,
                              backgroundColor: Constants.opacityBlack,
                              borderColor:
                                isSel
                                  ? Constants.darkGold
                                  : Constants.backColor,
                              borderWidth: 1,
                            }}
                            onPress={() => {
                              this.selectStyle(item)
                            }}
                          >
                            <Image
                              source={{ uri: uploadsHostUrl + item.image }}
                              resizeMode={"cover"}
                              style={{ flex: 1 }}
                            />

                            <Text
                              style={{
                                position: "absolute",
                                bottom: 0,
                                left: 0,
                                width: "100%",
                                backgroundColor: Constants.opacityBlack,
                                textAlign: "center",
                                textAlignVertical: "center",
                                color: Constants.lightGold,
                              }}
                            >
                              {item.name}
                            </Text>
                          </TouchableOpacity>
                        );
                      }}
                      keyExtractor={(_item, index) =>
                        "style-" + index.toString()
                      }
                    />
                  </View>

                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      width: "100%",
                      paddingHorizontal: 10,
                    }}
                  >
                    <View style={{ flexDirection: "row", marginTop: 10 }}>
                     
                      <Text style={styles.label}>Pick Short Video</Text>
                    </View>

                    <View style={{ flexDirection: "row", marginTop: 20 }}>
                     
                      <TouchableOpacity
                        style={{ marginHorizontal: 10 }}
                        onPress={this.onTapPickVideoOption}
                      >
                        <FontAwesome
                          name="video-camera"
                          size={28}
                          color={Constants.lightGold}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>

                  <Text
                    style={{
                      fontSize: 12,
                      marginLeft: 35,
                      color: Constants.white,
                    }}
                  >
                    You can only upload one short video within 30 secs.
                  </Text>
                  
                  <View
                    style={{
                      height: Constants.WINDOW_WIDTH * 0.8,                      
                      marginVertical: 10,
                      // backgroundColor: "black",
                      
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                  
                    <Video
                      ref={"videoRef"}
                      source={{
                        uri: this.state.videoUri,
                      }}
                      // rate={1.0}
                      volume={1.0}
                      isMuted={false}
                      resizeMode="contain"
                      shouldPlay={false}
                      isLooping={false}
                      onReadyForDisplay={(e)=>{
                        console.log("onReadyForDisplay: ", e)
                        
                      }}
                      style={{ width:'100%', height:'100%' }}
                      onPlaybackStatusUpdate={(status) => {
                        if (status.didJustFinish) {
                          this.setState({ isPlay: false });
                        }
                        if (status.isPlaying) {
                          this.setState({ isPlay: true });
                        } else {
                          this.setState({ isPlay: false });
                        }
                      }}
                    />
                    <TouchableOpacity
                      style={{
                        backgroundColor: Constants.opacityBlack,
                        borderRadius: 30,
                        width: 60,
                        height: 60,
                        zIndex: 1000,
                        paddingLeft: 5,
                        position: "absolute",
                        alignItems: "center",
                        justifyContent: "center",
                        top: Constants.WINDOW_WIDTH * 0.4 - 30,
                        left: Constants.WINDOW_WIDTH * 0.5 - 30,
                      }}
                      onPress={this.onTapPlay}
                    >
                      {this.state.isPlay ? (
                        <FontAwesome5
                          name="pause"
                          size={24}
                          color={Constants.white}
                        />
                      ) : (
                        <FontAwesome5
                          name="play"
                          size={24}
                          color={Constants.white}
                        />
                      )}
                    </TouchableOpacity>
                  </View>

                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      paddingHorizontal: 10,
                    }}
                  >
                    <View style={{ flexDirection: "row" }}>
                      {/* <AntDesign
									name="plussquareo"
									size={24}
									color={Constants.lightGold}
								/> */}
                      <Text style={styles.label}>Pick Photos</Text>
                    </View>

                    <View style={{ flexDirection: "row", marginTop: 5 }}>
                      {/* <TouchableOpacity
                        style={{ marginHorizontal: 10 }}
                        onPress={this.onTapPickImage}
                      >
                        <Ionicons
                          name="ios-images"
                          size={30}
                          color={Constants.lightGold}
                        />
                      </TouchableOpacity> */}
                      <TouchableOpacity
                        style={{ marginHorizontal: 10 }}
                        onPress={this.onTapAddPhoto}
                      >
                        <FontAwesome5
                          name="camera-retro"
                          size={28}
                          color={Constants.lightGold}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>

                  <Text
                    style={{
                      fontSize: 12,
                      marginLeft: 35,
                      color: Constants.white,
                    }}
                  >
                    You can only upload photos up to 5.
                  </Text>

                  <FlatList
                    style={{
                      flex: 1,
                      paddingVertical: 10,
                      height: Constants.WINDOW_WIDTH * 0.8,
                    }}
                    horizontal={true}
                    renderItem={({ item, index, separate }) => {
                      return (
                        <ModelPhotoItem
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
                <View
                  style={{
                    width: "100%",
                    alignItems: "center",
                    justifyContent: "center",
                    paddingVertical: 10,
                  }}
                >
                  <GradientButton
                    title={"Submit"}
                    style={{ height: 45, width: "90%" }}
                    onPress={this.onSubmit}
                  />
                </View>
              </ScrollView>
            </KeyboardAvoidingView>
          </View>
        </SafeAreaView>

        <VideoPlayerModal
          uri={this.state.videoUri}
          height={this.state.videoSize?.height}
          width={this.state.videoSize?.width}
          onTapClose={()=>{
            this.setState({videoFullShow: false})
          }}
          isShow={this.state.videoFullShow}
        />

      {/* <VideoPlayerModal
          src ={ require('../../assets/videos/model_submit_profile.mp4')}
          height={this.state.videoSize?.height}
          width={this.state.videoSize?.width}
          shouldPlay={true}
          onTapClose={()=>{
            this.setState({demoVideoShow: false}, ()=>{
              this.props.navigation.navigate('models')
            })
          }}
          isShow={this.state.demoVideoShow}
        /> */}

        <ActionSheet
          isShow={this.state.showVideoOption}
          title={"Choose Option"}
          titleList={['Camera', 'Gallery']}
          onTapItem={(index, title)=>{            
            this.onTapPickVideoRecord(index == 0);            
          }}
          onCancel={()=>{ 
            this.setState({showVideoOption: false})
           }}
        />

        <ActionSheet
          isShow={this.state.showPhotoOption}
          title={"Choose Option"}
          titleList={['Camera', 'Gallery']}
          onTapItem={(index, title)=>{            
            this.onTapPickPhoto(index == 0);
          }}
          onCancel={()=>{ 
            this.setState({showPhotoOption: false})
           }}
        />

      </>
    );
  }
}

export default function (props) {
  const navigation = useNavigation();
  const route = useRoute();

  return <ModelProfilePage {...props} navigation={navigation} route={route} />;
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
    // backgroundColor: "white",
  },
  label: {
    color: Constants.white,
    fontSize: 15,
    marginTop: 20,
    marginBottom: 5,
  },
});
