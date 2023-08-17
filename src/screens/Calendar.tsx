import React, { useCallback, useEffect, useState } from "react";
import { View, Button, TouchableOpacity, Text } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import CalendarComponent from "../components/calendar/CalendarComponent";

import { calendar, brightRed } from "../../styles/screen/calendar";

function Calendar({ navigation }: { navigation: any }) {

    const [selected, setSelected] = useState('');

    const selectedDotColor = brightRed;

    // For demo purposes only
    const today = new Date().toISOString().split('T')[0];
    const fastDate = getPastDate(3);
    const futureDates = getFutureDates(12);
    const dates = [fastDate, today].concat(futureDates);
    function getFutureDates(numberOfDays: number) {
        const array: string[] = [];

        for (let index = 1; index <= numberOfDays; index++) {
            let d = Date.now();
            if (index > 8) {
                const newMonth = new Date(d).getMonth() + 1;
                d = new Date(d).setMonth(newMonth);
            }
            const date = new Date(d + 864e5 * index);
            const dateString = date.toISOString().split('T')[0];
            array.push(dateString);
        }
        return array;
    }

    function getPastDate(numberOfDays: number) {
        return new Date(Date.now() - 864e5 * numberOfDays).toISOString().split('T')[0];
    }

    // let items: any = [];

    // For demo purposes only
    let items: any[] = [
        {
            title: dates[0],
            data: [{ hour: '12am', duration: '1h', title: 'First Yoga' }]
        },
        {
            title: dates[1],
            data: [
                { hour: '4pm', duration: '1h', title: 'Pilates ABC' },
                { hour: '5pm', duration: '1h', title: 'Vinyasa Yoga' }
            ]
        },
        {
            title: dates[2],
            data: [
                { hour: '1pm', duration: '1h', title: 'Ashtanga Yoga' },
                { hour: '2pm', duration: '1h', title: 'Deep Stretches' },
                { hour: '3pm', duration: '1h', title: 'Private Yoga' }
            ]
        },
        {
            title: dates[3],
            data: [{ hour: '12am', duration: '1h', title: 'Ashtanga Yoga' }]
        },
        {
            title: dates[4],
            data: [{}]
        },
        {
            title: dates[5],
            data: [
                { hour: '9pm', duration: '1h', title: 'Middle Yoga' },
                { hour: '10pm', duration: '1h', title: 'Ashtanga' },
                { hour: '11pm', duration: '1h', title: 'TRX' },
                { hour: '12pm', duration: '1h', title: 'Running Group' }
            ]
        },
        {
            title: dates[6],
            data: [
                { hour: '12am', duration: '1h', title: 'Ashtanga Yoga' }
            ]
        },
        {
            title: dates[7],
            data: [{}]
        },
        {
            title: dates[8],
            data: [
                { hour: '9pm', duration: '1h', title: 'Pilates Reformer' },
                { hour: '10pm', duration: '1h', title: 'Ashtanga' },
                { hour: '11pm', duration: '1h', title: 'TRX' },
                { hour: '12pm', duration: '1h', title: 'Running Group' }
            ]
        },
        {
            title: dates[9],
            data: [
                { hour: '1pm', duration: '1h', title: 'Ashtanga Yoga' },
                { hour: '2pm', duration: '1h', title: 'Deep Stretches' },
                { hour: '3pm', duration: '1h', title: 'Private Yoga' }
            ]
        },
        {
            title: dates[10],
            data: [
                { hour: '12am', duration: '1h', title: 'Last Yoga' }
            ]
        },
        {
            title: dates[11],
            data: [
                { hour: '1pm', duration: '1h', title: 'Ashtanga Yoga' },
                { hour: '2pm', duration: '1h', title: 'Deep Stretches' },
                { hour: '3pm', duration: '1h', title: 'Private Yoga' }
            ]
        },
        {
            title: dates[12],
            data: [
                { hour: '12am', duration: '1h', title: 'Last Yoga' }
            ]
        },
        {
            title: dates[13],
            data: [
                { hour: '12am', duration: '1h', title: 'Last Yoga' }
            ]
        }
    ];;
    let markedDates: any = {
        [selected]: {
            selected: true,
            disableTouchEvent: true,
            selectedColor: selectedDotColor,
        }
    };

    function handleDayPressed(day: { year?: number; month?: number; day?: number; timestamp?: number; dateString: any; }) {
        setSelected(day.dateString);
        console.log('selected day', day);
    }

    function handleOnItemPressed(item: any) {
        console.log('selected item', item);
    }

    function updateMarkedDates() {
        let newList = markedDates;

        // newList = Object.assign(newList, {
        //     '2023-10-01': { selected: true, marked: true, selectedColor: 'orange' },
        //     '2023-09-02': { marked: true },
        //     '2023-11-03': { selected: true, marked: true, selectedColor: 'blue' }
        // });

        items.forEach((item) => {
            if (item.data.length > 0) {
                const date = item.title;
                newList = Object.assign(newList, {
                    [date]: {
                        marked: true,
                        dotColor: 'orange'
                    }
                });
            }
        });

        markedDates = newList;
    }

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

    useState(() => {
        updateMarkedDates();
    });

    useEffect(() => {
        getToken();
        updateMarkedDates();
    }, [selected, markedDates]);

    return (
        <View style={calendar.container}>
            <CalendarComponent
                style={calendar.container.calendar}
                sectionStyle={calendar.container.section}
                markedDates={markedDates}
                items={items}
                onDayPress={handleDayPressed}
                onItemPress={handleOnItemPressed}
            />
            <Button title="Disconnect" onPress={clearAsyncStorage} />
        </View >
    );
};

export default Calendar;