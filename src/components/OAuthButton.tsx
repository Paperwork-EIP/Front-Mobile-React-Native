import React from "react";
import { Image, Text, TouchableOpacity } from "react-native";

interface Props {
    onPress: () => void;
    source: any;
    title: string;
    styleButton: any;
    styleImage: any;
    styleText: any;
    testID?: string;
}

const OAuthButton: React.FC<Props> = ({ onPress, source, title, styleButton, styleImage, styleText, testID }) => {
    return (
        <TouchableOpacity
            style={styleButton}
            onPress={onPress}
            testID={testID}
            >
            <Image source={source} style={styleImage} />
            <Text style={styleText}>{title}</Text>
        </TouchableOpacity>
    );
}

export default OAuthButton;
