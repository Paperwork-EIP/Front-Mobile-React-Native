import { StyleSheet } from "react-native";
import { lightTextColor, darkTextColor } from "../colors";

const hide_password_button = StyleSheet.create({
    button: {
        color: lightTextColor,
    },

    buttonDark: {
        color: darkTextColor,
    }
});

export { hide_password_button };