import { StyleSheet } from "react-native";
import { darkBackgroundColor, darkTextColor, lightBackgroundColor, lightTextColor } from '../colors';

const home = StyleSheet.create({
    container: {
        width: "100%",
        height: "100%",
    },

    tabBar: {
        backgroundColor: lightBackgroundColor,
    },
    tabBarDark: {
        backgroundColor: darkBackgroundColor,
    },

    header: {
        backgroundColor: lightBackgroundColor,
        borderBottomWidth: 1,
        borderBottomColor: "lightgrey",
    },
    headerDark: {
        backgroundColor: darkBackgroundColor,
        borderBottomWidth: 1,
        borderBottomColor: lightTextColor,
    },
    headerTitle: {
        color: lightTextColor,
    },
    headerTitleDark: {
        color: darkTextColor,
    },
});

export { home };