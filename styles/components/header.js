import { StyleSheet } from "react-native";
import { darkBackgroundColor, darkSecondaryBackgroundColor, darkTextColor, lightBackgroundColor, lightSecondaryBackgroundColor, lightTextColor } from '../colors';

const headerLight = StyleSheet.create({
    headerContainer: {
        height: 60,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: '5%',
        backgroundColor: lightBackgroundColor,
    },
    text: {
        color: lightTextColor,
        fontSize: 20,
        fontWeight: 'bold',
    },
    modalContainer: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
    },
    menuContainer: {
        backgroundColor: lightSecondaryBackgroundColor,
        elevation: 5,
        padding: 25,
        justifyContent: 'center',
        alignSelf: 'center',
        alignItems: 'center',
        width: '75%',
        borderRadius: 5,
    },
    navTitle: {
        fontSize: 18,
    },
    navText: {
        fontSize: 16,
        fontWeight: "bold",
    },
    navButton: {
        paddingTop: 25,
    },
    logo: {
        width: '20%',
        height: undefined,
        alignSelf: 'center',
        resizeMode: 'contain',
        aspectRatio: 1,
    }
});

const headerDark = StyleSheet.create({
    headerContainer: {
        ...headerLight.headerContainer,
        backgroundColor: darkBackgroundColor,
    },
    text: {
        ...headerLight.text,
        color: darkTextColor,
    },
    modalContainer: {
        ...headerLight.modalContainer,
    },
    menuContainer: {
        ...headerLight.menuContainer,
    },
    navTitle: {
        ...headerLight.navTitle,
    },
    navText: {
        ...headerLight.navText,
    },
    navButton: {
        ...headerLight.navButton,
    },
    logo: {
        ...headerLight.logo,
    },
});

export { headerLight, headerDark };