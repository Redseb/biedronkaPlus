import { StatusBar } from "expo-status-bar";

import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Dimensions,
  BackHandler,
  View,
} from "react-native";
import { storeValue, getValue } from "./storageFuncs";
//Pages
import MainScreen from "./pages/MainScreen";
import ScanningScreen from "./pages/ScanningScreen";

const height = Dimensions.get("screen").height;
const width = Dimensions.get("window").width;
import Constants from 'expo-constants'

export default function App() {
  const [lang, setLang] = useState("pl");
  const [cardNum, setCardNum] = useState("123456789111");
  const [isScanning, setIsScanning] = useState(false);
  useEffect(() => {
    async function fetchData() {
      let tempVal = await getValue("@cardNum");
      if (tempVal !== null) setCardNum(tempVal);
      tempVal = await getValue("@lang");
      if (tempVal !== null) setLang(tempVal);
    }
    fetchData();
    BackHandler.addEventListener("hardwareBackPress", () => {
      if (isScanning) {
        setIsScanning(false);
      } else {
        return false;
      }
      return true;
    });
  });
  if (!isScanning) {
    return (
      <>
        <StatusBar style="light" backgroundColor={"#ff3b3b"} translucent={false} />

        <View style={{ height: height - Constants.statusBarHeight }}>
          <MainScreen
            lang={lang}
            cardNum={cardNum}
            setLang={setLang}
            setIsScanning={setIsScanning}
          />
        </View>
      </>
    );
  } else {
    return (
      <>
        <ScanningScreen
          cardNum={cardNum}
          lang={lang}
          setCardNum={setCardNum}
          setLang={setLang}
          setIsScanning={setIsScanning}
        />
        <StatusBar style="light" backgroundColor={"#ff3b3b"} translucent={false} />
      </>
    );
  }
}

const styles = StyleSheet.create({});
