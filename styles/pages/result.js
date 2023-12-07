import { StyleSheet } from 'react-native';
import { darkBackgroundColor, darkSecondaryBackgroundColor, darkTextColor, lightBackgroundColor, lightSecondaryBackgroundColor, lightTextColor } from '../colors';

const result = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        backgroundColor: lightBackgroundColor,
        alignItems: 'center',
    },
    containerDark: {
        width: '100%',
        height: '100%',
        backgroundColor: darkBackgroundColor,
        alignItems: 'center',
    },
    text: {
            fontSize: 18,
            fontWeight: 'bold',
            color: lightTextColor,
            marginTop: 15,
            marginLeft: 5
    },
    textDark: {
        fontSize: 18,
        fontWeight: 'bold',
        color: darkTextColor,
        marginTop: 15,
        marginLeft: 5
    },
    scrollview: {
        height: '80%',
    },
    itemCheckboxContainer: {
        flexDirection: "column",
    },
    checkboxContainer: {
        // backgroundColor: lightSecondaryBackgroundColor,
        width: '100%',
        flexDirection: "row",
        alignItems: 'center',
    },
    checkboxContainerDark: {
        // backgroundColor: darkBackgroundColor,
        width: '100%',
        flexDirection: "row",
        alignItems: 'center',
        marginBottom: 10,
    },
    checkbox: {
        // alignSelf: "left",
        width: '85%',
        backgroundColor: 'transparent',
    },
    link: {
        width: '5%',
    },
    underSteps: {
        alignItems: 'center',
        width: '70%',
        marginLeft: '15%',
        backgroundColor: 'transparent',
    },
    doneButton: {
        width: '30%',
        backgroundColor: '#29C9B3',
        color: 'gray',
        borderWidth: 0,
        marginTop: 40,
        marginBottom: 20,
        marginHorizontal: 10,
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',

        text: {
            color: 'white',
            fontSize: 16,
            fontWeight: 'bold'
        },
    },
})

export { result };