import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  RefreshControl
} from "react-native";
import { WebView } from 'react-native-webview';

//Components
import Card from "../components/Card";
import { storeValue, getValue } from "../storageFuncs";

const height = Dimensions.get("screen").height;
const width = Dimensions.get("window").width;

const MainScreen = ({ lang, cardNum, setIsScanning }) => {
  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View style={styles.container}>
        <View style={styles.webpageContainer}>
          <Text style={{ color: '#ffffff', fontSize: 15, marginLeft: 10 }}>biedronka.pl</Text>
          <WebView source={{ uri: 'https://www.biedronka.pl/pl' }} style={styles.webpage} />
        </View>
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
    </ScrollView>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2eb8a",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    height: 50,
    padding: 20,
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 10,
    margin: 20,
    borderWidth: 1,
    borderColor: "#000000",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    backgroundColor: "#ffffff",
  },
  buttonText: {
    fontFamily: "sans-serif-light",
  },
  webpageContainer: {
    height: height / 2,
    width: width - 20,
    marginBottom: 20,
    backgroundColor: "#ff3b3b",
    borderWidth: 2,
  },
  webpage: {
    flex: 1,
    height: height / 3,
    width: width - 20,
  }
});

export default MainScreen;
