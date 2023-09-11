import React from "react";
import { Text, TouchableOpacity, GestureResponderEvent } from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';

import { calendar_items } from "../../../styles/components/calendar/calendar_items";

interface CalendarItemsProps {
    item: any;
    onPressCard: (event: GestureResponderEvent) => void;
    onPressButton: (event: GestureResponderEvent) => void;
}

const CalendarItems = (props: CalendarItemsProps) => {
    return (
        <TouchableOpacity onPress={props.onPressCard} style={calendar_items.item}>
            <Text numberOfLines={1} style={calendar_items.item.title}>{props.item.title}</Text>
            <TouchableOpacity onPress={props.onPressButton} style={calendar_items.item.button}>
                <Ionicons name="chevron-forward-outline" size={15} color="white" />
            </TouchableOpacity>
        </TouchableOpacity>
    );
}

export default React.memo(CalendarItems);