import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  Button,
  TouchableOpacity,
  Dimensions,
} from "react-native";
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

  return (
    <View style={styles.container}>
      <Camera
        onBarCodeScanned={handleBarCodeScanned}
        ratio='16:9'
        style={[StyleSheet.absoluteFillObject]}
      />
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          marginTop: 20,
        }}
      >
        <Card cardNumber={cardNum} />
      </View>

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
    display: "flex",
    flexDirection: "column",
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
