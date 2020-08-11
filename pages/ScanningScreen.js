import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  Button,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import { storeValue, getValue } from "../storageFuncs";
import Card from "../components/Card";

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
      const { status } = await BarCodeScanner.requestPermissionsAsync();
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
    return <Text>Requesting camera permission</Text>;
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

  return (
    <View style={styles.container}>
      <BarCodeScanner
        onBarCodeScanned={handleBarCodeScanned}
        style={styles.barcodescanner}
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
        <Text>Back</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
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
  barcodescanner: {
    height: height,
    width: width,
    backgroundColor: "#ffffff",
  },
});

export default ScanningScreen;
