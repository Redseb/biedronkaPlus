import React, { useRef, useEffect } from "react";
import { StyleSheet, Text, View, Dimensions, Image, Animated } from "react-native";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

let spinValue = new Animated.Value(0)

// First set up animation 
Animated.loop(
    Animated.timing(
        spinValue,
        {
            toValue: 1,
            duration: 400,
            // easing: Easing.linear,
            useNativeDriver: true
        }
    )
).start();

// Second interpolate beginning and end values (in this case 0 and 1)
const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg']
})

const LoadingIcon = () => {
    return (
        <View style={styles.container}>
            <Animated.Image
                style={{ transform: [{ rotate: spin }], height: 256, width: 256 }}
                source={require('../assets/icon512.png')}
            />
        </View>
    );
};

const styles = StyleSheet.create({

});

export default LoadingIcon;
