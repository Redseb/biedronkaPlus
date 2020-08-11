import { StatusBar } from "expo-status-bar";

import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { storeValue, getValue } from "./storageFuncs";
//Pages
import MainScreen from "./pages/MainScreen";
import ScanningScreen from "./pages/ScanningScreen";

const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;

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
  });
  if (!isScanning) {
    return (
      <>
        <StatusBar style="auto" />
        <MainScreen
          lang={lang}
          cardNum={cardNum}
          setLang={setLang}
          setIsScanning={setIsScanning}
        />
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
        <StatusBar style="light" backgroundColor={"#000000"} />
      </>
    );
  }
}

const styles = StyleSheet.create({});
