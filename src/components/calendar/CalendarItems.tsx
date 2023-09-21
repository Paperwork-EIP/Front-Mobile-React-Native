import React from "react";
import { Text, TouchableOpacity, GestureResponderEvent, TextStyle, View } from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';

import { calendar_items } from "../../../styles/components/calendar/calendar_items";

interface CalendarItemsProps {
    item: any;
    onPressCard: (event: GestureResponderEvent) => void;
    onPressButton: (event: GestureResponderEvent) => void;
}

function CalendarItems(props: CalendarItemsProps) {
    return (
        <View style={calendar_items.container}>
            <TouchableOpacity onPress={props.onPressCard} style={calendar_items.item}>
                <Text numberOfLines={1} style={calendar_items.item.title as TextStyle}>
                    {props.item.title}
                </Text>
                <TouchableOpacity onPress={props.onPressButton} style={calendar_items.item.button}>
                    <Ionicons name="chevron-forward-outline" size={15} color="white" />
                </TouchableOpacity>
            </TouchableOpacity>
            <View style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: 7,
                height: 100,
                backgroundColor: props.item.color,
            }} />
        </View>
    );
}

export default React.memo(CalendarItems);