import React from "react";
import { StyleSheet, Text, View, Dimensions, } from "react-native";
import Barcode from "react-native-barcode-builder";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

const barcodify = (cardNumber) => {
  const SPACING = "     ";
  return cardNumber.slice(0, 1) + SPACING + cardNumber.slice(1, 7) + SPACING + cardNumber.slice(7, 13);
}

const Card = ({ cardNumber, pin }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.cardLogo}>Moja Biedronka</Text>
      <View style={styles.bottomContainer}>
        <Barcode
          background="#ffffff"
          text={barcodify(cardNumber)}
          height={75}
          width={2}
          style={styles.barcode}
          value={cardNumber}
          flat
          format="EAN13"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ff3b3b",
    width: width - width / 10,
    height: height / 4,
    borderWidth: 2,
    borderColor: "#000000",
    borderRadius: 20,
    shadowColor: "#000",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  bottomContainer: {
    flex: 1
  },

  cardLogo: {
    color: "white",
    fontSize: height / 20,
    alignSelf: "center",
    fontFamily: "sans-serif-light",
  },
});

export default Card;
