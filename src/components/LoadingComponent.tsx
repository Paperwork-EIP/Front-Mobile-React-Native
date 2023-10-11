import React from 'react';
import { ActivityIndicator, View } from 'react-native';

import {loading_component} from "../../styles/components/loading_component";

interface LoadingComponentProps {
    color?: string;
    size?: number | "small" | "large" | undefined;
    styleContainer?: object;
}

function LoadingComponent(props: LoadingComponentProps) {
    const color = props.color ? props.color : '#29C9B3';
    const size = props.size ? props.size : 'large';
    const styleContainer = props.styleContainer ? props.styleContainer : loading_component.container;

    return (
        <View style={styleContainer}>
            <ActivityIndicator size={size} style={loading_component.container.loading} color={color} />
        </View>
    );
}

export default LoadingComponent;