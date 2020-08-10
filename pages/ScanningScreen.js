import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import {storeValue, getValue} from "../storageFuncs";

const ScanningScreen = ({lang,setCardNum,setLang, setIsScanning}) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    if(data.length == 13){
        setCardNum(data);
        storeValue('@cardNum', data);
        setIsScanning(false);
        setScanned(true);
        alert(data);
    } else {
        alert("Hmm.. That code doesn't seem right, try again");
    }
    // alert(`Bar code with type ${type} and data ${data} has been scanned!`);
};

  if (hasPermission === null) {
    return <Text>Requesting camera permission</Text>;
  }
  if (hasPermission === false) {
    return (
    <View>
        <Text>No Camera? No Problem you can type in your card number down below</Text>
    </View>
        );
  }

  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-end',
      }}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />

      {scanned && <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />}
    </View>
  );
}

export default ScanningScreen