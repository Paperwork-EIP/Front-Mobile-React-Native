import React from "react";
import { Text, TouchableOpacity } from "react-native";

function ClickTextButtonWithDescription({ onPress, title, descriptionText, styleButton, styleTitle, styleDescriptionText }) {
    return (
        <TouchableOpacity
            style={styleButton}
            onPress={onPress}>
            <Text style={styleTitle}>{title}</Text>
            <Text style={styleDescriptionText}>{descriptionText}</Text>
        </TouchableOpacity>
    );
}

export default ClickTextButtonWithDescription;
