import React from "react";
import { Text, TouchableOpacity, GestureResponderEvent, TextStyle, View } from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';

import { calendar_items } from "../../../styles/components/calendar/calendar_items";

interface CalendarItemsProps {
    item: any;
    colorMode: string;
    onPressCard?: (event: GestureResponderEvent) => void;
    onPressButton?: (event: GestureResponderEvent) => void;
}

function CalendarItems(props: CalendarItemsProps) {
    const colorBorder = props.item.color;
    const colorMode = props.colorMode;

    return (
        <View style={[colorMode === 'light' ? calendar_items.container : calendar_items.containerDark, {
            borderLeftColor: colorBorder,
            borderLeftWidth: 10,
        }]}>
            <TouchableOpacity onPress={props.onPressCard} style={calendar_items.item}>
                <Text numberOfLines={1} style={colorMode === 'light' ? calendar_items.item.title as TextStyle : calendar_items.item.titleDark as TextStyle}>
                    {props.item.title}
                </Text>
                <TouchableOpacity onPress={props.onPressButton} style={calendar_items.item.button}>
                    <Ionicons name="chevron-forward-outline" size={15} color="white" />
                </TouchableOpacity>
            </TouchableOpacity>

        </View>
    );
}

export default React.memo(CalendarItems);