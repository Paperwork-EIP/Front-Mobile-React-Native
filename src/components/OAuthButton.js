import React from "react";
import { Image, Text, TouchableOpacity } from "react-native";

function OAuthButton({ onPress, title, source, styleButton, styleImage, styleText }) {
    return (
        <TouchableOpacity
            style={styleButton}
            onPress={onPress}>
            <Image source={source} style={styleImage} />
            <Text style={styleText}>{title}</Text>
        </TouchableOpacity>
    );
}

export default OAuthButton;
