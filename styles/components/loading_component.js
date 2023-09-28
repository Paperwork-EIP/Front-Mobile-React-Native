import { StyleSheet } from "react-native";

const loading_component = StyleSheet.create({
    container: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#00000080',
        zIndex: 9999,

        loading: {
            transform: [{ scale: 2 }]
        }
    }
});

export { loading_component };