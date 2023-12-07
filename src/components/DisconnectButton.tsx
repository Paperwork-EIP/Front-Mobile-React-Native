import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Ionicons from '@expo/vector-icons/Ionicons';
import { deleteItemAndRedirectTo } from '../services/Storage';

interface DisconnectButtonProps {
    navigation: any;
    text: string;
    styleButton?: any;
    styleText?: any;
}

function DisconnectButton(props: DisconnectButtonProps) {
    function disconnect() {
        AsyncStorage.clear();
        deleteItemAndRedirectTo(props.navigation, '@loginToken', 'Login');
    }

    const { styleButton, styleText, iconName, light } = props;

    return (
        <TouchableOpacity style={props.styleButton} onPress={disconnect} testID='disconnectButton'>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Ionicons name={iconName} size={24} color={light ? "white" : "black"} style={{ marginRight: 10 }} />
                <Text style={props.styleText}>{props.text}</Text>
            </View>
        </TouchableOpacity>
    )
}

export default DisconnectButton;