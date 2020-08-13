import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, Dimensions, View, Image } from "react-native";
// import { Flag } from 'react-native-svg-flagkit'

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

const plFlag = require("../assets/PL.png");
const gbFlag = require("../assets/GB.png");
const ruFlag = require("../assets/RU.png");

const ToggleLanguageButton = ({ lang, setLang }) => {
    const [flag, setFlag] = useState(plFlag);
    return (
        <TouchableOpacity style={styles.container} onPress={() => {
            //Language toggle loop: en -> pl -> ru -> en
            if (lang === 'en') {
                setLang('pl');
                setFlag(plFlag);
            }
            if (lang === 'pl') {
                setLang('ru');
                setFlag(ruFlag);
            }
            if (lang === 'ru') {
                setLang('en');
                setFlag(gbFlag);
            }
        }}>
            <View style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
                <Image source={flag} style={{ height: 24, width: 32 }} />
            </View>
            <View style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
                <Text style={styles.text}>{lang.toUpperCase()}</Text>
            </View>
        </TouchableOpacity >
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#ff3b3b',
        width: width / 4,
        borderRadius: 10,
        height: height / 20,
        display: "flex",
        justifyContent: "space-evenly",
        flexDirection: "row",
        borderWidth: 1,
        borderColor: "#000",
    },
    text: {
        textAlign: "center",
        color: "#ffffff"
    }
});

export default ToggleLanguageButton;