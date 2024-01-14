import React from "react";
import { Image, TouchableOpacity } from "react-native";
import Entypo from "react-native-vector-icons/Entypo";

import { hide_password_button } from "../../styles/components/hide_password_button.js";

interface Props {
    onPress: () => void;
    icon: string;
    testID: string;
    dark: boolean;
}

const HidePasswordButton: React.FC<Props> = (props: Props) => {
    const { onPress, icon, testID, dark } = props;

    return (
        <TouchableOpacity
            onPress={onPress}
            testID={testID}
            >
            <Entypo 
                name={icon === 'show_password' ? "eye" : "eye-with-line"}
                size={20}
                color={dark ? hide_password_button.buttonDark.color : hide_password_button.button.color}
                />
        </TouchableOpacity>
    );
}

export default HidePasswordButton;
