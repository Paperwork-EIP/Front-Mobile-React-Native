import { StyleSheet } from 'react-native';
import { lightBackgroundColor, darkBackgroundColor } from './colors';

const app = StyleSheet.create({
    container: {
        backgroundColor: lightBackgroundColor,
    },

    containerDark: {
        backgroundColor: darkBackgroundColor,
    }
});

export { app };