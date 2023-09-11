import { StyleSheet } from 'react-native';

const calendar_items = StyleSheet.create({
    item: {
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: 'lightgrey',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',

        title: {
            fontSize: 16,
            fontWeight: 'bold',
        },

        button: {
            padding: 5,
            borderRadius: 5,
            backgroundColor: '#FC6976',
        }
    },
});

export { calendar_items };