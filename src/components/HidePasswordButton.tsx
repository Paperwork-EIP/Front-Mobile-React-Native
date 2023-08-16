import React from "react";
import { Image, ImageStyle, StyleProp, TouchableOpacity, ViewStyle } from "react-native";

import { hide_password_button } from "../../styles/components/hide_password_button.js";

interface Props {
    onPress: () => void;
    icon: string;
    testID: string;
}

const HidePasswordButton: React.FC<Props> = ({ onPress, icon, testID }) => {
    return (
        <TouchableOpacity
            style={hide_password_button.button as StyleProp<ViewStyle>}
            onPress={onPress}
            testID={testID}
            >
            <Image source={icon === 'show_password' ? require('../../assets/images/show_password.png') : require('../../assets/images/hide_password.png')} style={hide_password_button.button.image} />
        </TouchableOpacity>
    );
}

export default HidePasswordButton;
