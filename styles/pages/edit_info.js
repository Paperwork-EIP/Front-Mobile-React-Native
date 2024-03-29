import { StyleSheet } from 'react-native';
import { darkBackgroundColor, darkSecondaryBackgroundColor, darkTextColor, lightBackgroundColor, lightSecondaryBackgroundColor, lightTextColor } from '../colors';

const edit = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        backgroundColor: lightBackgroundColor,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 10
    },
    containerDark: {
        width: '100%',
        height: '100%',
        backgroundColor: darkBackgroundColor,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 10
    },
    homebtn: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'left',
        marginBottom: "5%",
        marginTop: "5%",

        text: {
            color: 'black',
            fontSize: 24,
            fontWeight: 'bold'
        }
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: lightTextColor,
        marginTop: 15,
        marginLeft: 5
    },
    titleDark: {
        fontSize: 18,
        fontWeight: 'bold',
        color: darkTextColor,
        marginTop: 15,
        marginLeft: 5
    },
    center: {
        width: '30%',
        height: '20%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    modifPicture: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
    },
    profilePicture: {
        width: '80%',
        height: '60%',
        marginTop: 30,
        borderRadius: 100,
    },
    input: {
        width: '95%',
        backgroundColor: lightSecondaryBackgroundColor,
        color: 'gray',
        borderWidth: 0,
        marginBottom: 12,
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 15,
    },
    inputDark: {
        width: '95%',
        backgroundColor: darkSecondaryBackgroundColor,
        color: darkTextColor,
        borderColor: darkTextColor,
        borderWidth: 0,
        marginBottom: 12,
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 15,
    },
    passwordContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '95%',
        backgroundColor: lightSecondaryBackgroundColor,
        marginTop: 15,
        marginBottom: 12,
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 15,

        input: {
            width: '85%',
            color: 'gray',
            borderWidth: 0,
            backgroundColor: lightSecondaryBackgroundColor,
        },
    },
    passwordContainerDark: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '95%',
        backgroundColor: darkSecondaryBackgroundColor,
        marginTop: 15,
        marginBottom: 12,
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 15,
        borderWidth: 0,
        borderColor: darkTextColor,
        color: darkSecondaryBackgroundColor,

        input: {
            width: '85%',
            color: darkSecondaryBackgroundColor,
            backgroundColor: darkSecondaryBackgroundColor,
        },
    },
    button: {
        width: '30%',
        backgroundColor: '#29C9B3',
        color: 'gray',
        borderWidth: 0,
        marginTop: 15,
        marginLeft: 250,
        marginBottom: 20,
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',

        text: {
            color: 'white',
            fontSize: 16,
            fontWeight: 'bold'
        }
    },
    shadow: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 10,
    },
    dropdown1BtnStyle: {
        width: '80%',
        height: 50,
        backgroundColor: '#FFF',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#444',
    },
    dropdownStyle: {
        width: '50%',
        height: 50,
        backgroundColor:lightSecondaryBackgroundColor,
        borderRadius: 8,
    },
    dropdownStyleDark: {
        width: '50%',
        height: 50,
        backgroundColor: darkSecondaryBackgroundColor,
        borderRadius: 8,
    },
    dropdownTxtStyle: { color: lightTextColor, textAlign: 'left', fontSize: 16 },
    dropdownTxtStyleDark: { color: darkTextColor, textAlign: 'left', fontSize: 16 },
    dropdown1DropdownStyle: { borderRadius: 10 },
    dropdown1DropdownStyleDark: { borderRadius: 10 },
    dropdownRowStyle: { backgroundColor: 'white', borderBottomColor: '#C5C5C5' },
    dropdownRowStyleDark: { backgroundColor: 'dark', borderBottomColor: darkTextColor },
    dropdownRowTxtStyle: { color: 'black', textAlign: 'left' },
    dropdownRowTxtStyleDark: { color: 'white', textAlign: 'left' },

    add: {
        flex: 1,

        centeredView: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
        },
        modalView: {
            margin: 20,
            backgroundColor: lightBackgroundColor,
            borderRadius: 10,
            padding: 15,
            height: "75%",
            width: "90%",
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'space-between',
            shadowColor: 'black',
            shadowOffset: {
                width: 0,
                height: 2,
            },
            shadowOpacity: 0.55,
            shadowRadius: 4,
            elevation: 5,
        },
        modalViewDark: {
            margin: 20,
            backgroundColor: darkBackgroundColor,
            borderRadius: 10,
            padding: 15,
            height: "75%",
            width: "90%",
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'space-between',
            shadowColor: 'black',
            shadowOffset: {
                width: 0,
                height: 2,
            },
            shadowOpacity: 0.55,
            shadowRadius: 4,
            elevation: 5,
        },

        modalHeader: {
            width: "100%",
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',

            containerTitle: {
                width: "60%",

                title: {
                    fontSize: 20,
                    color: lightTextColor,
                    paddingLeft: 10,
                },

                titleDark: {
                    fontSize: 20,
                    color: darkTextColor,
                    paddingLeft: 10,
                },
            }
        },
        modalContent: {
            width: "100%",
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',

            section: {
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
            },
            image: {
                height: 100,
                width: 100,
                borderRadius: 40,
                marginRight: 10,
                marginLeft: 10,
                marginBottom: 10,
            }
        },

        modalFooter: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingTop: 15,

            buttonEdit: {
                borderRadius: 20,
                padding: 10,
                height: 40,
                width: 100,
                elevation: 3,
                backgroundColor: "#29C9B3",

                text: {
                    color: 'white',
                    fontWeight: 'bold',
                    textAlign: 'center',
                }
            },
        }
    }
})

export { edit };