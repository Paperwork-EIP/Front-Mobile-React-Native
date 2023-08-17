import React, { FC, ReactNode } from "react";
import { Alert, StyleSheet, View, Text, TouchableOpacity, Button, GestureResponderEvent } from "react-native";

interface CalendarItemsProps {
    item: any;
}

const CalendarItems = (props: CalendarItemsProps) => {
    const styles = StyleSheet.create({
        item: {
            padding: 20,
            backgroundColor: 'white',
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

    function itemPressed() {
        Alert.alert('Item has been pressed');
    }

    function buttonPressed() {
        Alert.alert('Button has been pressed');
    }

    return (
        <TouchableOpacity onPress={itemPressed} style={styles.item}>
            <View>
                <Text style={styles.itemHourText}>{props.item.hour}</Text>
                <Text style={styles.itemDurationText}>{props.item.duration}</Text>
            </View>
            <Text style={styles.itemTitleText}>{props.item.title}</Text>
            <View style={styles.itemButtonContainer}>
                <Button color={'grey'} title={'Info'} onPress={buttonPressed} />
            </View>
        </TouchableOpacity>
    );
}

export default React.memo(CalendarItems);