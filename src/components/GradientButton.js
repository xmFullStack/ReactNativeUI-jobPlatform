import React, { memo } from "react";
import {
	ImageBackground,
	ScrollView,
	StyleSheet,
  KeyboardAvoidingView,
  TouchableOpacity,
  Text

} from "react-native";
// import { LinearGradient } from "expo-linear-gradient";
import LinearGradient from 'react-native-linear-gradient';
import Constants from "../utils/Constants";

const GradientButton = ({ style, title, onPress }) => (

	<TouchableOpacity
		style={{...style}}
		onPress={() => {
			if (onPress) {
				onPress();
			}
		}}
	>
		<LinearGradient
			colors={[Constants.lightGold, Constants.darkGold]}
			style={{ flex: 1, justifyContent:'center', alignItems:'center', borderRadius:5, }}
		>
			<Text style={{ color: Constants.checkoutBackDark, fontSize: style.fontSize || 18 }}>{title}</Text>
		</LinearGradient>
	</TouchableOpacity>
);

const styles = StyleSheet.create({
	background: {
		flex: 1,
		width: "100%",
		color: "#FFFFFF",
	},

	container: {
		flex: 1,
		padding: 20,
		width: "100%",
		maxWidth: "100%",
		alignSelf: "center",
		alignItems: "center",
		justifyContent: "center",
	},
});

export default GradientButton;
