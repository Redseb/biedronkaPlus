import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
//Components
import Card from "../components/Card";
import { storeValue, getValue } from "../storageFuncs";

const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;

const MainScreen = ({ lang, cardNum, setIsScanning }) => {
  return (
    <View style={styles.container}>
      <Card cardNumber={cardNum} pin={"123"} />

      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          setIsScanning(true);
        }}
      >
        <Text style={styles.buttonText}>Update Card Info</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    height: 50,
    padding: 20,
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 20,
    margin: 20,
    borderWidth: 1,
    borderColor: "#000000",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    backgroundColor: "#f2eb8a",
  },
  buttonText: {
    fontFamily: "sans-serif-light",
  },
});

export default MainScreen;
