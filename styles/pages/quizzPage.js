import { StyleSheet } from 'react-native';
import { darkBackgroundColor, darkSecondaryBackgroundColor, darkTextColor, lightBackgroundColor, lightSecondaryBackgroundColor, lightTextColor } from '../colors';

const quizzPage = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        backgroundColor: lightBackgroundColor,
        alignItems: 'center',
        justifyContent: 'center',
        // paddingTop: 50
    },
    containerDark: {
        width: '100%',
        height: '100%',
        backgroundColor: darkBackgroundColor,
        alignItems: 'center',
        justifyContent: 'center',
        // paddingTop: 50
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'black',
        marginTop: 15,
        marginLeft: 5
    },
    center: {
        width: '50%',
        height: '20%',
        alignItems: 'center',
        justifyContent: 'center',
        // backgroundColor: 'green',
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
    dropdownTxtStyle: { color: lightTextColor, textAlign: 'left' },
    dropdownTxtStyleDark: { color: darkTextColor, textAlign: 'left' },
    dropdown1DropdownStyle: { backgroundColor: '#EFEFEF', borderWidth: 2, borderRadius: 10 },
    dropdown1DropdownStyleDark: { backgroundColor: darkSecondaryBackgroundColor, borderWidth: 2, borderRadius: 10 },
    dropdownRowStyle: { backgroundColor: 'white', borderBottomColor: '#C5C5C5' },
    dropdownRowStyleDark: { backgroundColor: 'dark', borderBottomColor: darkTextColor },
    dropdownRowTxtStyle: { color: 'black', textAlign: 'left' },
    dropdownRowTxtStyleDark: { color: 'white', textAlign: 'left' },
    input: {
        width: '100%',
        backgroundColor: '#f2f2f2',
        color: 'gray',
        borderWidth: 0,
        marginBottom: 12,
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 15,
    },
    button: {
        width: '40%',
        backgroundColor: '#29C9B3',
        color: 'gray',
        borderWidth: 0,
        marginTop: 40,
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
})

export { quizzPage };