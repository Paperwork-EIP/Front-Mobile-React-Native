import React from "react";
import { TouchableOpacity, Text } from "react-native";

import { add_button } from "../../styles/components/add_button";

interface AddButtonProps {
    style?: any;
    onPress: () => void;
}

function AddButton(props: AddButtonProps) {
    return (
        <TouchableOpacity
            style={props.style ? props.style : add_button.button}
            onPress={props.onPress}
        >
            <Text style={add_button.button.text}>+</Text>
        </TouchableOpacity>
    );
}

export default AddButton;