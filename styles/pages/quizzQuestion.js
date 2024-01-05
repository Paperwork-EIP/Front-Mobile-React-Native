import { StyleSheet } from 'react-native';
import { darkBackgroundColor, darkSecondaryBackgroundColor, darkTextColor, lightBackgroundColor, lightSecondaryBackgroundColor, lightTextColor } from '../colors';

const quizzQuestion = StyleSheet.create({
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
    center: {
        // width: '30%',
        // height: '20%',
        alignItems: 'center',
        justifyContent: 'center',
        // backgroundColor: 'green',
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
    button: {
        alignContent: 'center',
        flexDirection: 'row',
        alignItems: 'center',
    },
    buttonYes: {
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
        }
    },
    buttonNo: {
        width: '30%',
        backgroundColor: '#FC6976',
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

export { quizzQuestion };