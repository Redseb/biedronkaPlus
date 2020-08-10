import AsyncStorage from '@react-native-community/async-storage';

const storeValue = async (key, value) => {
    try{
        await AsyncStorage.setItem(key, value)
    } catch (e) {
        console.log("ERROR storing")
    }
}

const getValue = async (key, value) => {
    try{
        const value = await AsyncStorage.getItem(key)
            return value
    } catch(e){
        console.log("ERROR retrieving")
    }
}

export {storeValue, getValue}