import React from "react";
import { Text, TouchableOpacity } from "react-native";

function LongHorizontalButton({ onPress, title, styleButton, styleText, testID }) {
    return (
        <TouchableOpacity
            style={styleButton}
            onPress={onPress}
            testID={testID}
            >
            <Text style={styleText}>{title}</Text>
        </TouchableOpacity>
    );
}

export default LongHorizontalButton;
