import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  TouchableWithoutFeedback
} from "react-native";
import * as Animatable from 'react-native-animatable';
import { WebView } from 'react-native-webview';

//Components
import Card from "../components/Card";
import ToggleLanguageButton from "../components/ToggleLanguageButton";
import { storeValue, getValue } from "../storageFuncs";
import { getString } from "../translations";

const height = Dimensions.get("screen").height;
const width = Dimensions.get("window").width;

const MainScreen = ({ lang, cardNum, setIsScanning, setLang }) => {
  //Card Animation
  let handleViewRef = ref => view = ref;
  let tada = () => view.tada(800)

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View style={styles.container}>
        <View style={styles.toolbar}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              setIsScanning(true);
            }}
          >
            <Text style={styles.buttonText}>{getString(lang, 'updateCardInfo')}</Text>
          </TouchableOpacity>
          <ToggleLanguageButton lang={lang} setLang={setLang} />
        </View>

        <View style={styles.webpageContainer}>
          <Text style={{ color: '#ffffff', fontSize: 15, marginLeft: 10 }}>biedronka.pl</Text>
          <WebView source={{ uri: 'https://www.biedronka.pl/pl' }} style={styles.webpage} />
        </View>
        <TouchableWithoutFeedback onPress={() => { tada() }}>
          <Animatable.View ref={handleViewRef}>
            <Card cardNumber={cardNum} pin={"123"} />
          </Animatable.View>
        </TouchableWithoutFeedback>




      </View>
    </ScrollView>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f542",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  toolbar: {
    display: "flex",
    flexDirection: 'row',
    justifyContent: "space-between",
    width: width,
    padding: 10
  },
  button: {
    height: height / 20,
    backgroundColor: "#ff3b3b",
    paddingHorizontal: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#000000",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  buttonText: {
    fontFamily: "sans-serif-light",
    color: "#fff"
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
