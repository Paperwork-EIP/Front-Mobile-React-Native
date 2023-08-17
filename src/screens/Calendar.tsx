import React, { useEffect } from "react";
import { View, Button } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import CalendarComponent from "../components/CalendarComponent";

import { calendar } from "../../styles/pages/screen/calendar";

function Calendar({ navigation }: { navigation: any }) {
    async function getToken() {
        try {
            const value = await AsyncStorage.getItem('loginToken');
            if (value !== null) {
                console.log(value);
            }
        } catch (error) {
            console.log(error);
        }
    }

    async function removeToken() {
        try {
            await AsyncStorage.removeItem('loginToken');
            navigation.navigate('Login');
            navigation.reset({
                index: 0,
                routes: [{ name: 'Login' }],
            });
        } catch (error) {
            console.log(error);
        }
    }

    async function clearAsyncStorage() {
        try {
            removeToken();
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getToken();
    }, []);

    // return (
    //     <View style={calendar.container}>
    //         <Button title="Disconnect" onPress={clearAsyncStorage} />
    //     </View >
    // );

    return (
        <View style={calendar.container}>
            <CalendarComponent />
            <Button title="Disconnect" onPress={clearAsyncStorage} />
        </View >
    );
};

export default Calendar;