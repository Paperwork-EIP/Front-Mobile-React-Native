import { StyleSheet } from 'react-native';

const calendar_items = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: 'lightgrey',
        position: 'relative',
    },
    item: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',

        title: {
            fontSize: 14,
            fontWeight: 'bold',
            width: '85%',
        },

        button: {
            padding: 5,
            borderRadius: 5,
            backgroundColor: '#FC6976',
        }
    },
});

export { calendar_items };