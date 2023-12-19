import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons';

interface Props {
    onPress: () => void;
    title: string;
    styleButton: object;
    styleText: object;
    testID: string;
    iconName: string;
    light: boolean;
}

const LongIconButton: React.FC<Props> = ({ onPress, title, styleButton, styleText, testID, iconName, light }) => {
    return (
        <TouchableOpacity
            style={styleButton}
            onPress={onPress}
            testID={testID}
        >
           <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Ionicons name={iconName as keyof typeof Ionicons.glyphMap} size={24} color={light ? "white" : "black"} style={{ marginRight: 10 }} />
                   <Text style={styleText}>{title}</Text>
                 </View>
        </TouchableOpacity>
    );
}

export default LongIconButton;
