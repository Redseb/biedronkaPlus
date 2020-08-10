import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions} from 'react-native';
import {LinearGradient } from 'expo-linear-gradient';
//Components
import Card from '../components/Card';
import {storeValue, getValue} from "../storageFuncs";

const height=Dimensions.get('window').height;
const width=Dimensions.get('window').width;

const MainScreen = ({lang, cardNum}) => {

  return (
    <View style={styles.container}>
      <LinearGradient colors={['#edd382', '#CC2f0f']}
          style={styles.linGrad}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}/>
      <Card cardNumber={cardNum} pin={"123"} />

      <TouchableOpacity style={styles.button} onPress={()=>{
        storeValue('@cardNum', "123456789222");
        setCardNum("123456789222");
        }}>
        <Text>Add a new card</Text>
      </TouchableOpacity>
      <StatusBar style="auto" />
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    height: 50,
    width: width-50,
    alignItems: "center",
    backgroundColor: 'white',
    borderRadius: 20,
    margin: 20
  },
  linGrad:{
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: height+50,
  }
});

export default MainScreen;