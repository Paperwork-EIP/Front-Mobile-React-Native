import React from "react";
import { Alert, StyleSheet, View, Text, TouchableOpacity, Button, GestureResponderEvent } from "react-native";

interface CalendarItemsProps {
    item: any;
    onPressCard: (event: GestureResponderEvent) => void;
    onPressButton: (event: GestureResponderEvent) => void;
}

const CalendarItems = (props: CalendarItemsProps) => {
    const styles = StyleSheet.create({
        item: {
            padding: 20,
            borderBottomWidth: 1,
            borderBottomColor: 'lightgrey',
            flexDirection: 'row'
        },
        itemHourText: {
            color: 'black'
        },
        itemDurationText: {
            color: 'grey',
            fontSize: 12,
            marginTop: 4,
            marginLeft: 4
        },
        itemTitleText: {
            color: 'black',
            marginLeft: 16,
            fontWeight: 'bold',
            fontSize: 16
        },
        itemButtonContainer: {
            flex: 1,
            alignItems: 'flex-end'
        },
        emptyItem: {
            paddingLeft: 20,
            height: 52,
            justifyContent: 'center',
            borderBottomWidth: 1,
            borderBottomColor: 'lightgrey'
        },
        emptyItemText: {
            color: 'lightgrey',
            fontSize: 14
        }
    });

    if (props.item.empty) {
        return (
            <View style={styles.emptyItem}>
                <Text style={styles.emptyItemText}>No Events Planned Today</Text>
            </View>
        );
    }

    return (
        <TouchableOpacity onPress={props.onPressCard} style={styles.item}>
            <Text style={styles.itemTitleText}>{props.item.title}</Text>
            <View style={styles.itemButtonContainer}>
                <Button title={'Info'} onPress={props.onPressButton} />
            </View>
        </TouchableOpacity>
    );
}

export default React.memo(CalendarItems);