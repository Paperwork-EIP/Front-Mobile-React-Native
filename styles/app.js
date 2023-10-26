import { StyleSheet } from 'react-native';
import { lightBackgroundColor, darkBackgroundColor, darkTextColor } from './colors';
import { DefaultTheme } from '@react-navigation/native';

const app = StyleSheet.create({
    container: {
        backgroundColor: lightBackgroundColor,
    },

    containerDark: {
        backgroundColor: darkBackgroundColor,
    }
});

const themeLight = DefaultTheme;

const themeDark = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        background: darkBackgroundColor,
        card: darkBackgroundColor,
        text: darkTextColor,
        border: 'white',
        notification: 'white',
    },
};

export { app, themeLight, themeDark };