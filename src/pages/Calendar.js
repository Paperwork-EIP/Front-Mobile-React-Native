import React from "react";
import { Alert, View, Image, TextInput, Text } from "react-native";
import { useTranslation } from 'react-i18next';
import { REACT_APP_BASE_URL } from "@env";

import axios from "axios";

import { calendar } from "../../styles/calendar";

function Calendar({ navigation }) {
    const { t, i18n } = useTranslation();

    return (
        <View style={calendar.container}>
            <Text>Calendar</Text>
        </View >
    );
};

export default Calendar;