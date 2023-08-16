import React, { useState } from "react";
import { View, Button } from "react-native";
import { Calendar, LocaleConfig } from 'react-native-calendars';

import { calendar_component } from "../../styles/components/calendar_component.js";

function CalendarComponent() {
    const [selected, setSelected] = useState('');

    return (
        <View style={calendar_component.container}>
            <Calendar
                onDayPress={day => {
                    setSelected(day.dateString);
                    console.log('selected day', day);
                }}
                style={{
                    borderWidth: 1,
                    borderColor: 'gray',
                    height: 350
                }}
                markedDates={{
                    [selected]: {
                        selected: true,
                        disableTouchEvent: true,
                        selectedColor: 'orange',
                    },
                    '2023-07-01': { selected: true, marked: true, selectedColor: 'blue' },
                    '2023-07-02': { marked: true },
                    '2023-07-03': { selected: true, marked: true, selectedColor: 'blue' }
                }}
            />
        </View >
    );
}

export default CalendarComponent;