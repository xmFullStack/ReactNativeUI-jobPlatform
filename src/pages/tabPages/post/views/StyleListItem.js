import React, { useState, useRef } from "react";
import { StyleSheet, TouchableOpacity, Image, View, Text } from "react-native";


import Constants from "../../../../utils/Constants";
import { uploadsHostUrl } from "../../../../utils/RestAPI";

const StyleListItem = ({ item, onStyleItemShow }) => {
	const width = Constants.WINDOW_WIDTH * 0.9;
	const height = (width * 3) / 4;

	const onTapSelect = () => {
		if (onStyleItemShow) {
			onStyleItemShow(item);
		}
	};

	return (
		<View
			style={{ justifyContent: "center", paddingTop: 10, paddingBottom: 10 , flex:1,}}
		>
			<TouchableOpacity
				activeOpacity={0.7}
				onPress={onTapSelect}
			>
				<View style={styles.shadow}>
					<Image
						source={{ uri: uploadsHostUrl + item.image }}
						resizeMode="cover"
						style={{
							width: "100%",
							borderTopLeftRadius: 10,
							borderTopRightRadius: 10,
							borderBottomLeftRadius: 10,
							borderBottomRightRadius: 10,
							height: Constants.WINDOW_HEIGHT * 0.3,
						}}
					/>
					<View
						style={{ width:'100%', flexDirection: "row", justifyContent: "space-between" , paddingHorizontal: 10}}
					>
						<Text style={styles.cardTitle}>{item.name}</Text>						
						<Text style={styles.cardSubTitle}>Available Models ({item.__meta__.users_count})</Text>
					</View>
				</View>
			</TouchableOpacity>
		</View>
	);
};

const styles = StyleSheet.create({
	shadow: {
		flex: 1,
		width: "100%",
		flexDirection: "column",
		backgroundColor: Constants.black,
		justifyContent: "center",
		alignItems: "center",
		shadowOffset: { width: 0, height: 6 },
		shadowColor: "#000",
		shadowOpacity: 0.39,
		shadowRadius: 30,
		borderRadius: 10,
		elevation: 3,
	},

	cardTitle: {		
		height: 40,		
		marginTop: 10,
		textAlignVertical: "top",
		textAlign: "left",
		fontSize: 16,
		color: Constants.darkGold,
		fontWeight: "bold",
	},
	cardSubTitle:{		
		height: 60,
		marginTop: 14,		
		textAlignVertical: "top",
		textAlign: "left",
		fontSize: 13,
		color: Constants.darkGold,		
	},
});

export default StyleListItem