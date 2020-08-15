import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Image
} from "react-native";
import * as Animatable from 'react-native-animatable'
import { Camera } from "expo-camera";
import { storeValue, getValue } from "../storageFuncs";
import Card from "../components/Card";
import LoadingIcon from "../components/LoadingIcon"
import { getString } from "../translations";
import { BarCodeScanner } from "expo-barcode-scanner"
import { showMessage, hideMessage } from "react-native-flash-message";


const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;
const ScanningScreen = ({
  lang,
  cardNum,
  setCardNum,
  setLang,
  setIsScanning,
}) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanPaused, setScanPaused] = useState(false);
  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  async function wait(ms) {
    return new Promise(resolve => {
      setTimeout(resolve, ms);
    });
  }

  const delayNextScan = async () => {
    await wait(3000);
    setScanPaused(false);
  }

  const handleBarCodeScanned = ({ type, data }) => {
    if (data.length == 13 && !scanPaused && cardNum !== data) {
      setCardNum(data);
      storeValue("@cardNum", data);
      tada();
      showMessage({
        message: getString(lang, "scanSuccess"),
        style: { backgroundColor: "#ff3b3b" },
        titleStyle: { fontSize: 18 },
        icon: "success"
      });
      setScanPaused(true);
      delayNextScan();
    }
  };

  if (hasPermission === null) {
    return (<View style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
      <LoadingIcon />
      <Text style={{ fontSize: height / 20 }}>Loading</Text>
    </View>);
  }
  if (hasPermission === false) {
    return (
      <View>
        <Text>
          No Camera? No Problem you can type in your card number down below
        </Text>
      </View>
    );
  }

  //Card Animation
  let handleViewRef = ref => view = ref;
  let tada = () => view.tada(800)

  return (
    <View style={styles.container}>
      <Camera
        onBarCodeScanned={handleBarCodeScanned}
        ratio='16:9'
        style={[StyleSheet.absoluteFillObject]}
        barCodeScannerSettings={{
          barCodeTypes: [BarCodeScanner.Constants.BarCodeType.ean13],
        }}
      />

      <Image
        style={{ height: 128, width: 256, margin: 75 }}
        source={require('../assets/barcodeOutline.png')}
      />
      <Animatable.View ref={handleViewRef}>
        <Card cardNumber={cardNum} />
      </Animatable.View>

      <TouchableOpacity
        style={styles.button}
        onPress={() => setIsScanning(false)}
      >
        <Text style={styles.buttonText}>{getString(lang, 'back')}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
    backgroundColor: "#000000",
  },
  loadingContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000000"
  },
  button: {
    height: 50,
    padding: 20,
    paddingHorizontal: 40,
    alignItems: "center",
    backgroundColor: "#ff3b3b",
    borderRadius: 10,
    margin: 20,
    borderWidth: 1,
    borderColor: "#000000",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  buttonText: {
    fontFamily: "sans-serif-light",
    color: "#fff"
  }
});

export default ScanningScreen;
