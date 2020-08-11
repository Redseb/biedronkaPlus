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
  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    if (data.length == 13) {
      setCardNum(data);
      storeValue("@cardNum", data);
      tada();
    } else {
      alert("Hmm.. That code doesn't seem right, try again");
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

  // return (<View style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
  //   <LoadingIcon />

  //   <Text style={{ fontSize: height / 20 }}>Loading</Text>
  // </View>);

  let handleViewRef = ref => view = ref;
  let tada = () => view.tada(800)

  return (
    <View style={styles.container}>
      <Camera
        onBarCodeScanned={handleBarCodeScanned}
        ratio='16:9'
        style={[StyleSheet.absoluteFillObject]}
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
        <Text style={styles.buttonText}>Back</Text>
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
  }
});

export default ScanningScreen;
