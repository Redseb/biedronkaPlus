import React from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import Barcode from "react-native-barcode-builder";
// import CardFlip from 'react-native-card-flip'; //TODO: Uninstall this dependency

const width=Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const Card = ({cardNumber, pin}) => {
    return(
        <View style={styles.container}>
            <Text style={styles.cardLogo}>Moja Biedronka</Text>
            <View style={styles.bottomContainer}>
                <Barcode background="#ffffff" text={cardNumber} height={135} style={styles.barcode} value={cardNumber} flat format="EAN13" />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#ff3b3b',
        borderRadius: 20,
        width: width-width/10,
        height: height/3,
    },
    cardLogo:{
        color: 'white',
        fontSize: height/20,
        alignSelf: 'center'
    }
});

export default Card;