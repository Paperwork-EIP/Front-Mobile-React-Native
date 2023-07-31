import React, { useEffect } from "react";
import { Alert, View, Image, TextInput, Text, Button } from "react-native";
import { useTranslation } from 'react-i18next';
import { REACT_APP_BASE_URL } from "@env";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

import CalendarComponent from "../components/CalendarComponent";

import { calendar } from "../../styles/pages/calendar";

function Calendar({ navigation }) {
    const { t, i18n } = useTranslation();

    // async function getToken() {
    //     try {
    //         const value = await AsyncStorage.getItem('loginToken');
    //         if (value !== null) {
    //             console.log(value);
    //         }
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }

    // async function removeToken() {
    //     try {
    //         await AsyncStorage.removeItem('loginToken');
    //         navigation.navigate('Login');
    //         navigation.reset({
    //             index: 0,
    //             routes: [{ name: 'Login' }],
    //         });
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }

    // async function clearAsyncStorage() {
    //     try {
    //         removeToken();
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }

    // useEffect(() => {
    //     getToken();
    // }, []);

    // return (
    //     <View style={calendar.container}>
    //         <Button title="Disconnect" onPress={clearAsyncStorage} />
    //     </View >
    // );

    return (
        <View style={calendar.container}>
            <CalendarComponent />
        </View >
    );
};

export default Calendar;