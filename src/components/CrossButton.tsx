import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { cross_button } from '../../styles/components/cross_button';
import { TouchableOpacity } from 'react-native';

interface CrossButtonProps {
    colorMode: string;
    onPress: () => void;
}

function CrossButton(props: CrossButtonProps) {
    const colorMode = props.colorMode;

    return (
        <TouchableOpacity style={cross_button.button as any} onPress={props.onPress}>
            <Ionicons name="close" size={20} color={colorMode} />
        </TouchableOpacity>
    );
}

export default CrossButton;