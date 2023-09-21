import { StyleSheet } from "react-native";

const settingsLight = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
        paddingVertical: "20%",
        color: "black",
        backgroundColor: '#E6E6E6',
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
            color: "black",
            fontSize: 24,
            fontWeight: 'bold'
        }
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'gray',
    },
    settingsContainer: {
        width: '100%',
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 10,
    },
    section: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: '5%',
        paddingHorizontal: '10%',
    },
    lineBetween: {
        width: "100%",
        borderBottomWidth: 1,
        borderBottomColor: '#E6E6E6',
    },
    disconnectButton: {
        backgroundColor: "#FC6976",
        borderRadius: 10,
        paddingVertical: "3%",
        paddingHorizontal: "5%",
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
        paddingVertical: "3%",
        paddingHorizontal: "5%",
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
        paddingVertical: "3%",
        paddingHorizontal: "5%",
        alignItems: 'center',
        justifyContent: 'center',

        text: {
            color: "white",
        },
    },
    confirmButton: {
        backgroundColor: '#29C9B3',
        borderRadius: 10,
        paddingVertical: "3%",
        paddingHorizontal: "5%",
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
        paddingHorizontal: "5%",
        paddingBottom: "40%",

        center: {
            backgroundColor: "white",
            padding: "5%",
            borderRadius: 10,
            width: "90%",
        },

        text: {
            color: "black",
        }
    }
});

// DARK MODE

const settingsDark = StyleSheet.create({
    container: {
        ...settingsLight.container,
        backgroundColor: '#121212',
        color: 'white'
    },
    content: {
        ...settingsLight.content,
    },
    homeBtn: {
        ...settingsLight.homeBtn,

        text: {
            ...settingsLight.homeBtn.text,
            color: 'white',
        }
    },
    title: {
        ...settingsLight.title,
        color: 'white',
    },
    settingsContainer: {
        ...settingsLight.settingsContainer,
        backgroundColor: '#343434',
    },
    section: {
        ...settingsLight.section,
    },
    lineBetween: {
        ...settingsLight.lineBetween,
        borderBottomColor: 'white',
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