import { StyleSheet } from 'react-native';

const calendar_component = StyleSheet.create({
    addButton: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        width: 50,
        height: 50,
        borderRadius: 50,
        backgroundColor: '#FC6976',
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 5,
        shadowColor: '#000000',
        shadowOffset: { width: 1, height: 1 },
    }
});

export { calendar_component };