import { StyleSheet } from 'react-native';
import { lightTextColor, lightBackgroundColor, darkTextColor, darkBackgroundColor } from '../colors';

const brightRed = '#FC6976';
const pastelRed = '#FDE0E6';
const brightGreen = '#29C9B3';
const pastelGreen = '#E0FDF7';

const calendar = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: lightBackgroundColor,

        calendar: {
            borderWidth: 0,
            width: '100%',
            flex: 1,
        },
        item: {
            borderRadius: 5,
            padding: 10,
            marginRight: 10,
            marginTop: 17,
        },
        section: {
            textTransform: 'capitalize',
        },

        empty: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',

            text: {
                fontSize: 20,
                color: lightTextColor
            },
        },
    },

    containerDark: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: darkBackgroundColor,

        calendar: {
            borderWidth: 0,
            width: '100%',
            flex: 1,
        },
        item: {
            borderRadius: 5,
            padding: 10,
            marginRight: 10,
            marginTop: 17,
        },
        section: {
            textTransform: 'capitalize',
        },

        empty: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',

            text: {
                fontSize: 20,
                color: darkTextColor
            },
        },
    },
});

const theme = {
    'stylesheet.calendar.header': {
        dayTextAtIndex0: {
            color: brightRed
        },
        dayTextAtIndex6: {
            color: brightGreen
        }
    }
};

export { calendar, theme, brightRed, pastelRed, brightGreen, pastelGreen };