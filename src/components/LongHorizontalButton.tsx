import React from "react";
import { Text, TouchableOpacity } from "react-native";

interface Props {
    onPress: () => void;
    title: string;
    styleButton: object;
    styleText: object;
    testID: string;
}

const LongHorizontalButton: React.FC<Props> = ({ onPress, title, styleButton, styleText, testID }) => {
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
