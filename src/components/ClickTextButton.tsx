import React from "react";
import { Text, TouchableOpacity } from "react-native";

interface Props {
    onPress: () => void;
    title: string;
    testID: string;
    styleButton: any;
    styleTitle: any;
}

const ClickTextButton: React.FC<Props> = ({ onPress, title, testID, styleButton, styleTitle }) => {
    return (
        <TouchableOpacity
            style={styleButton}
            onPress={onPress}
            testID={testID}
        >
            <Text style={styleTitle}>{title}</Text>
        </TouchableOpacity>
    );
}

export default ClickTextButton;
