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
            fontSize: 16,
            fontWeight: 'bold',
            width: '80%',
        },

        button: {
            padding: 5,
            borderRadius: 5,
            backgroundColor: '#FC6976',
        }
    },
});

export { calendar_items };