import React, { useEffect, useState } from "react";
import { View, Button } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import CalendarComponent from "../components/calendar/CalendarComponent";
import { getToken, removeToken } from "../services/Token";

import { calendar, brightRed } from "../../styles/screen/calendar";

function Calendar({ navigation }: { navigation: any }) {
    const [selected, setSelected] = useState('');
    const [items, setItems] = useState([{ title: '', data: [{ title: '', color: '' }] }]);

    const selectedDotColor = brightRed;

    let markedDates: any = {
        // [selected]: {
        //     selected: true,
        //     disableTouchEvent: true,
        //     selectedColor: selectedDotColor,
        // }
    };

    function handleDayPressed(day: { year?: number; month?: number; day?: number; timestamp?: number; dateString: any; }) {
        setSelected(day.dateString);
        console.log('selected day', day);
    }

    function handleOnItemPressed(item: any) {
        console.log('selected item', item);
    }

    function updateItems() {
        // Make request to API to get items and make the conversion
        setItems([
            {
                title: '2023-09-01',
                data: [
                    { title: 'Item 1 - any js object', color: brightRed },
                    { title: 'Item random - any js object', color: 'blue' },
                    { title: 'Item test - any js object', color: 'yellow' }
                ]
            },
            {
                title: '2023-09-20',
                data: [
                    { title: 'Item 2 - any js object', color: brightRed }
                ]
            },
            {
                title: '2023-10-03',
                data: [
                    { title: 'Item 3 - any js object', color: brightRed },
                    { title: 'Item 4 - any js object', color: 'orange' },
                    { title: 'Item 5 - any js object', color: 'green' }
                ]
            },
        ]);
    }

    function updateMarkedDates() {
        // Update marked dates when user selects a day
        markedDates[selected] = {
            selected: true,
            disableTouchEvent: true,
            selectedColor: selectedDotColor,
        };
    }

    function setDotMarkedDates() {
        items.forEach((item) => {
            markedDates[item.title] = {
                dots: item.data
            }
        });
    }

    useState(() => {
        setDotMarkedDates();
        updateItems();
    });

    useEffect(() => {
        getToken('loginToken');
        updateMarkedDates();
        setDotMarkedDates();
    }, [selected, markedDates, items]);

    return (
        <View style={calendar.container}>
            <CalendarComponent
                style={calendar.container.calendar}
                sectionStyle={calendar.container.section}
                styleEmpty={calendar.container.empty}
                styleEmptyText={calendar.container.empty.text}
                markedDates={markedDates}
                items={items}
                onDayPress={handleDayPressed}
                onItemPress={handleOnItemPressed}
            />
            <Button title="Disconnect" onPress={() => removeToken(navigation , 'loginToken', 'Login')} />
        </View >
    );
};

export default Calendar;