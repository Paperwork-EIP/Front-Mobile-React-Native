import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { cross_button } from '../../styles/components/cross_button';
import { TouchableOpacity } from 'react-native';

interface CrossButtonProps {
    onPress: () => void;
}

function CrossButton(props: CrossButtonProps) {
    return (
        <TouchableOpacity style={cross_button.button as any} onPress={props.onPress}>
            <Ionicons name="close" size={20} color="grey" />
        </TouchableOpacity>
    );
}

export default CrossButton;