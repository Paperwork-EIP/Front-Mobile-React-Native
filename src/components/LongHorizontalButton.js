import React from "react";
import { Text, TouchableOpacity } from "react-native";

function LongHorizontalButton({ onPress, title, styleButton, styleText }) {
    return (
        <TouchableOpacity
            style={styleButton}
            onPress={onPress}>
            <Text style={styleText}>{title}</Text>
        </TouchableOpacity>
    );
}

export default LongHorizontalButton;
