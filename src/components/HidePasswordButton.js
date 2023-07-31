import React from "react";
import { Image, TouchableOpacity } from "react-native";

import { hide_password_button } from "../../styles/components/hide_password_button.js";

function HidePasswordButton({ onPress, icon, testID }) {
    return (
        <TouchableOpacity
            style={hide_password_button.hidePasswordButton}
            onPress={onPress}
            testID={testID}
            >
            <Image source={icon === 'show_password' ? require('../../assets/images/show_password.png') : require('../../assets/images/hide_password.png')} style={hide_password_button.hidePasswordButton.image} />
        </TouchableOpacity>
    );
}

export default HidePasswordButton;
