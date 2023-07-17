import React from "react";
import { Image, TouchableOpacity } from "react-native";

import { login } from "../../styles/login";

function HidePasswordButton({ onPress, icon, testID }) {
    return (
        <TouchableOpacity
            style={login.passwordContainer.hidePasswordButton}
            onPress={onPress}
            testID={testID}
            >
            <Image source={icon === 'show_password' ? require('../../assets/images/show_password.png') : require('../../assets/images/hide_password.png')} style={login.passwordContainer.hidePasswordButton.image} />
        </TouchableOpacity>
    );
}

export default HidePasswordButton;
