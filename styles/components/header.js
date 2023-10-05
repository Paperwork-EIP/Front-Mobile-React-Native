import { StyleSheet } from "react-native";

const headerLight = StyleSheet.create({
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: "5%",
    },
    text: {
        color: "black",
        fontSize: 24,
        fontWeight: 'bold',
    },
    modalContainer: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
    },
    menuContainer: {
        backgroundColor: 'white',
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
});

// DARK MODE

const headerDark = StyleSheet.create({
    headerContainer: {
        ...headerLight.headerContainer,
    },
    text: {
        ...headerLight.text,
        color: 'white',
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
});

export { headerLight, headerDark };