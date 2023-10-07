import { StyleSheet } from 'react-native';
import { lightTextColor, lightBackgroundColor, darkTextColor, darkBackgroundColor, darkSecondaryBackgroundColor } from '../colors';

const login = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        backgroundColor: lightBackgroundColor,
        alignItems: 'center',
        justifyContent: 'center'
    },
    containerDark: {
        width: '100%',
        height: '100%',
        backgroundColor: darkBackgroundColor,
        alignItems: 'center',
        justifyContent: 'center'
    },
    content: {
        width: '100%',
        flex: 2,
    },
    form: {
        flex: 2,
        alignItems: 'center',
        justifyContent: 'center',
    },
    center: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    logo: {
        width: 100,
        height: 100,
        marginTop: 40
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: lightTextColor,
        marginBottom: 20
    },
    titleDark: {
        fontSize: 20,
        fontWeight: 'bold',
        color: darkTextColor,
        marginBottom: 20
    },
    input: {
        color: lightTextColor,
        width: '90%',
        backgroundColor: '#f2f2f2',
        borderWidth: 0,
        marginBottom: 12,
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 15,
    },
    inputDark: {
        color: darkTextColor,
        width: '90%',
        backgroundColor: darkSecondaryBackgroundColor,
        borderColor: darkTextColor,
        borderWidth: 0.5,
        marginBottom: 12,
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 15,
    },
    placeholder: {
        color: lightTextColor
    },
    placeholderDark: {
        color: darkTextColor
    },
    button: {
        width: '90%',
        backgroundColor: '#29C9B3',
        color: 'gray',
        borderWidth: 0,
        marginTop: 15,
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
    passwordContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '90%',
        backgroundColor: '#f2f2f2',
        marginBottom: 12,
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 15,

        input: {
            width: '85%',
            color: lightTextColor,
            borderWidth: 0,
        },
    },
    passwordContainerDark: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '90%',
        backgroundColor: darkSecondaryBackgroundColor,
        borderColor: darkTextColor,
        borderWidth: 0.5,
        marginBottom: 12,
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 15,

        input: {
            width: '85%',
            color: darkTextColor,
            borderWidth: 0,
        },
    },
    forgotButton: {
        backgroundColor: 'transparent',
        alignContent: 'center',
        justifyContent: 'center',
        marginTop: 20,

        text: {
            color: '#FC6976',
            fontSize: 16,
            fontWeight: 'bold'
        }
    },
    bottom: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        flex: 1,

        buttons: {
            width: '100%',
            alignItems: 'center',
            justifyContent: 'space-evenly',
            flexDirection: 'row',
            marginBottom: 20,

            googleButton: {
                width: '40%',
                borderWidth: 1,
                borderColor: '#29C9B3',
                paddingVertical: 10,
                paddingHorizontal: 15,
                borderRadius: 15,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',

                image: {
                    width: 20,
                    height: 20,
                    marginRight: 10
                },
                text: {
                    color: '#DB4437',
                    fontSize: 14,
                    fontWeight: 'bold'
                }
            },
            facebookButton: {
                width: '40%',
                borderWidth: 1,
                borderColor: '#29C9B3',
                paddingVertical: 10,
                paddingHorizontal: 15,
                borderRadius: 15,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',

                image: {
                    width: 20,
                    height: 20,
                    marginRight: 10
                },
                text: {
                    color: '#3b5998',
                    fontSize: 14,
                    fontWeight: 'bold'
                }
            },
        },

        noAccountButton: {
            width: '100%',
            backgroundColor: 'transparent',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            marginVertical: 20,

            text: {
                color: lightTextColor,
                fontSize: 16,
                fontWeight: 'bold',
                marginRight: 10
            },
            textDark: {
                color: darkTextColor,
                fontSize: 16,
                fontWeight: 'bold',
                marginRight: 10
            },
            register: {
                color: '#29C9B3',
                fontSize: 16,
                fontWeight: 'bold'
            }
        },

        picker: {
            color: lightTextColor,
            width: 200,
            backgroundColor: 'transparent',
            borderWidth: 0,
            paddingVertical: 10,
            paddingHorizontal: 15,
        },
        pickerDark: {
            width: 200,
            backgroundColor: darkBackgroundColor,
            color: darkTextColor,
            borderWidth: 0,
            paddingVertical: 10,
            paddingHorizontal: 15,
        }
    },
});

export { login };