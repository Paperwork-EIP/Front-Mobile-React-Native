import React from 'react';
import { ActivityIndicator, View } from 'react-native';

import {loading_component} from "../../styles/components/loading_component";

interface LoadingComponentProps {
    color?: string;
}

function LoadingComponent(props: LoadingComponentProps) {
    const color = props.color ? props.color : '#29C9B3';

    return (
        <View style={loading_component.container}>
            <ActivityIndicator size="large" style={loading_component.container.loading} color={color} />
        </View>
    );
}

export default LoadingComponent;