import { StyleSheet } from "react-native";
import { darkBackgroundColor, lightBackgroundColor, lightTextColor, lightSecondaryBackgroundColor, darkTextColor, darkSecondaryBackgroundColor } from "../../styles/colors";

const settingsLight = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
        paddingVertical: "20%",
        color: lightTextColor,
        backgroundColor: lightBackgroundColor,
    },
    content: {
        width: '100%',
        paddingHorizontal: '5%',
        alignItems: 'left',
        justifyContent: 'center',
    },
    homeBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'left',
        marginBottom: "5%",

        text: {
            color: lightTextColor,
            fontSize: 24,
            fontWeight: 'bold'
        }
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: lightTextColor,
    },
    settingsContainer: {
        width: '100%',
        alignItems: 'center',
        backgroundColor: lightSecondaryBackgroundColor,
        borderRadius: 10,
    },
    section: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 16,
        paddingHorizontal: 24,
    },
    lineBetween: {
        width: "100%",
        borderBottomWidth: 1,
        borderBottomColor: lightTextColor,
    },
    disconnectButton: {
        backgroundColor: "#FC6976",
        borderRadius: 10,
        paddingVertical: 9,
        paddingHorizontal: 12,
        alignItems: 'center',
        justifyContent: 'center',

        text: {
            color: 'white',
            fontSize: 16,
            fontWeight: 'bold'
        }
    },
    button: {
        backgroundColor: '#FC6976',
        borderRadius: 10,
        paddingVertical: 9,
        paddingHorizontal: 12,
        alignItems: 'center',
        justifyContent: 'center',

        text: {
            color: 'white',
            fontSize: 16,
            fontWeight: 'bold'
        }
    },
    cancelButton: {
        backgroundColor: '#FC6976',
        borderRadius: 10,
        paddingVertical: 9,
        paddingHorizontal: 12,
        alignItems: 'center',
        justifyContent: 'center',

        text: {
            color: "white",
        },
    },
    confirmButton: {
        backgroundColor: '#29C9B3',
        borderRadius: 10,
        paddingVertical: 9,
        paddingHorizontal: 12,
        alignItems: 'center',
        justifyContent: 'center',

        text: {
            color: "white",
        },
    },
    modal: {
        width: "100%",
        height: "100%",
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 20,

        center: {
            backgroundColor: lightSecondaryBackgroundColor,
            alignItems: "center",
            justifyContent: "center",
            paddingTop: 20,
            paddingBottom: 10,
            borderRadius: 10,
            width: "100%",
        },

        text: {
            color: lightTextColor,
        }
    }
});

// DARK MODE

const settingsDark = StyleSheet.create({
    container: {
        ...settingsLight.container,
        backgroundColor: darkBackgroundColor,
        color: darkTextColor,
    },
    content: {
        ...settingsLight.content,
    },
    homeBtn: {
        ...settingsLight.homeBtn,

        text: {
            ...settingsLight.homeBtn.text,
            color: darkTextColor,
        }
    },
    title: {
        ...settingsLight.title,
        color: darkTextColor,
    },
    settingsContainer: {
        ...settingsLight.settingsContainer,
        backgroundColor: darkSecondaryBackgroundColor,
    },
    section: {
        ...settingsLight.section,
    },
    lineBetween: {
        ...settingsLight.lineBetween,
        borderBottomColor: darkTextColor,
    },
    disconnectButton: {
        ...settingsLight.disconnectButton,

        text: {
            ...settingsLight.disconnectButton.text
        }
    },
    button: {
        ...settingsLight.button,

        text: {
            ...settingsLight.button.text,
        }
    },
    cancelButton: {
        ...settingsLight.cancelButton,

        text: {
            ...settingsLight.cancelButton.text,
        },
    },
    confirmButton: {
        ...settingsLight.confirmButton,

        text: {
            ...settingsLight.confirmButton.text,
        },
    },
    modal: {
        ...settingsLight.modal,

        center: {
            ...settingsLight.modal.center,
        },

        text: {
            ...settingsLight.modal.text,
        }
    }
});

export { settingsLight, settingsDark };