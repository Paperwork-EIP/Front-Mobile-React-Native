import { StyleSheet } from 'react-native';
import { darkSecondaryBackgroundColor, darkTextColor, lightSecondaryBackgroundColor, lightTextColor } from '../../colors';

const calendar_items = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        borderWidth: 1,
        borderRightColor: 'lightgrey',
        borderBottomColor: 'lightgrey',
        borderTopColor: 'lightgrey',
        borderRadius: 8,
        backgroundColor: lightSecondaryBackgroundColor,
    },
    containerDark: {
        flex: 1,
        padding: 20,
        borderWidth: 1,
        borderRightColor: lightTextColor,
        borderBottomColor: lightTextColor,
        borderTopColor: lightTextColor,
        borderRadius: 8,
        backgroundColor: darkSecondaryBackgroundColor,
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

        titleDark: {
            fontSize: 14,
            fontWeight: 'bold',
            width: '85%',
            color: darkTextColor,
        },

        button: {
            padding: 5,
            borderRadius: 5,
            backgroundColor: '#FC6976',
        }
    },
});

export { calendar_items };