// forgotPassword.js

import { StyleSheet } from 'react-native';
import { lightTextColor, lightBackgroundColor, darkTextColor, darkBackgroundColor, darkSecondaryBackgroundColor } from '../colors';

const forgotPassword = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: lightBackgroundColor,
        alignItems: 'center',
        justifyContent: 'center'
    },
    containerDark: {
        flex: 1,
        backgroundColor: darkBackgroundColor,
        alignItems: 'center',
        justifyContent: 'center'
    },
    formContainer: {
        width: '80%',
        maxWidth: 400,
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: lightTextColor, // Adjust as needed
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
    input: {
        width: '100%',
        height: 40,
        marginBottom: 20,
        padding: 10,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: lightTextColor, // Adjust as needed
        color: lightTextColor, // Adjust as needed
    },
    errorText: {
        color: 'red',
        marginBottom: 10,
    },
    successText: {
        color: 'green',
        marginBottom: 10,
    },
    submitButton: {
        backgroundColor: 'blue', // Adjust as needed
        padding: 10,
        borderRadius: 5,
    },
    submitButtonText: {
        color: 'white',
        textAlign: 'center',
        fontWeight: 'bold',
    },
    center: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    bottom: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        flex: 1,
        returnToLogin: {
            width: '100%',
            backgroundColor: 'transparent',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            marginVertical: 10,

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
    },
});

export { forgotPassword };
