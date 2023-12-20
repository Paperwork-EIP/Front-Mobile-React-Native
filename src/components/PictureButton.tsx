import React from "react";
import {TouchableOpacity, Image } from "react-native";

interface Props {
    onPress: () => void;
    styleButton: object;
    styleImage: object;
    testID: string;
}

const PictureButton: React.FC<Props> = ({ onPress, styleButton, styleImage, testID }) => {
    
    return (
        <TouchableOpacity
            style={styleButton}
            onPress={onPress}
            testID={testID}
        >
            <Image source={require('../assets/images/placeholder.png')} style={{ width: 100, height: 100, borderRadius: 50 }} />
        </TouchableOpacity>
    );
}

export default PictureButton;
