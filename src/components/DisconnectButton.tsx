import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

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

    return (
        <TouchableOpacity style={props.styleButton} onPress={disconnect}>
            <Text style={props.styleText}>{props.text}</Text>
        </TouchableOpacity>
    )
}

export default DisconnectButton;