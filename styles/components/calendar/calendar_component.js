import { StyleSheet } from 'react-native';
import { lightBackgroundColor, darkTextColor, lightTextColor, darkBackgroundColor } from '../../colors';

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
    },
    addButtonDark: {
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
    },
    agendaList: {
        paddingHorizontal: 10,
        backgroundColor: lightBackgroundColor,
    },
    agendaListDark: {
        paddingHorizontal: 10,
        backgroundColor: darkBackgroundColor,
    },
});

const theme_light = {
    backgroundColor: lightBackgroundColor,
    calendarBackground: lightBackgroundColor,
    textDisabledColor: darkTextColor,
    dayTextColor: lightTextColor,
    monthTextColor: lightTextColor,
};

const theme_dark = {
    backgroundColor: darkBackgroundColor,
    calendarBackground: darkBackgroundColor,
    textDisabledColor: lightTextColor,
    dayTextColor: darkTextColor,
    monthTextColor: darkTextColor,
};

const theme_dark_transparent_bg = {
    backgroundColor: 'transparent',
    calendarBackground: 'transparent',
    textDisabledColor: lightTextColor,
    dayTextColor: darkTextColor,
    monthTextColor: darkTextColor,
};

export { calendar_component, theme_dark, theme_light, theme_dark_transparent_bg };