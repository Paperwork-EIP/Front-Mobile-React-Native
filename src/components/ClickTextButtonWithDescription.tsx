import React from "react";
import { Text, TouchableOpacity } from "react-native";

interface Props {
    onPress: () => void;
    title: string;
    descriptionText: string;
    testID: string;
    styleButton: any;
    styleTitle: any;
    styleDescriptionText: any;
}

const ClickTextButtonWithDescription: React.FC<Props> = ({ onPress, title, descriptionText, testID, styleButton, styleTitle, styleDescriptionText }) => {
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
