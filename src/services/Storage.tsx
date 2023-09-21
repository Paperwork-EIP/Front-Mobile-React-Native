import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

async function getItem(value: string) {
    try {
        return await AsyncStorage.getItem(value);
    } catch (error) {
        console.log(error);
    }
}

async function storeItem(value: string, token: string) {
    try {
        await AsyncStorage.setItem(value, token);
    } catch (error) {
        console.log(error);
    }
}

async function saveUserData(name: string, firstName: string, familyName: string, email: string, id: string, picture: string) {
    try {
        await storeItem('@userName', name);
        await storeItem('@userFirstName', firstName);
        await storeItem('@userFamilyName', familyName);
        await storeItem('@userEmail', email);
        await storeItem('@userId', id);
        await storeItem('@userPicture', picture);                    
    } catch (error) {
        console.log(error);
    }
}

async function getUserData() {
    try {
        const name = await getItem('@userName');
        const firstName = await getItem('@userFirstName');
        const familyName = await getItem('@userFamilyName');
        const email = await getItem('@userEmail');
        const id = await getItem('@userId');
        const picture = await getItem('@userPicture');

        return {
            name: name,
            firstName: firstName,
            familyName: familyName,
            email: email,
            id: id,
            picture: picture
        };
    } catch (error) {
        console.log(error);
    }
}

async function deleteItemAndRedirectTo(navigation: any, value: string, route: string) {
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

async function removeItem(value: string) {
    try {
        await AsyncStorage.removeItem(value);
    } catch (error) {
        console.log(error);
    }
}

export { getItem, storeItem, saveUserData, getUserData, deleteItemAndRedirectTo, removeItem };