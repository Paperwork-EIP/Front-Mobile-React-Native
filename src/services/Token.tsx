import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

async function getToken(value: string) {
    try {
        return await AsyncStorage.getItem(value);
    } catch (error) {
        console.log(error);
    }
}

async function storeToken(value: string, token: string) {
    try {
        await AsyncStorage.setItem(value, token);
    } catch (error) {
        console.log(error);
    }
}

async function removeToken(navigation: any, value: string, route: string) {
    try {
        await AsyncStorage.removeItem(value);
        navigation.navigate(route);
        navigation.reset({
            index: 0,
            routes: [{ name: route }],
        });
    } catch (error) {
        console.log(error);
    }
}

export { getToken, storeToken, removeToken };