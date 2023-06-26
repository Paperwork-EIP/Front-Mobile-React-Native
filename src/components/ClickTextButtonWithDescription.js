import React from "react";
import { Text, TouchableOpacity } from "react-native";

function ClickTextButtonWithDescription({ onPress, title, descriptionText, styleButton, styleTitle, styleDescriptionText, testID }) {
    return (
        <TouchableOpacity
            style={styleButton}
            onPress={onPress}
            testID={testID}
        >
            <Text style={styleTitle}>{title}</Text>
            <Text style={styleDescriptionText}>{descriptionText}</Text>
        </TouchableOpacity>
    );
}

export default ClickTextButtonWithDescription;
