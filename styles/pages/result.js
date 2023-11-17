import { StyleSheet } from 'react-native';
import { darkBackgroundColor, darkSecondaryBackgroundColor, darkTextColor, lightBackgroundColor, lightSecondaryBackgroundColor, lightTextColor } from '../colors';

const result = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        backgroundColor: '#fff',
        alignItems: 'center',
    },
    text: {
            fontSize: 18,
            fontWeight: 'bold',
            color: 'black',
            marginTop: 15,
            marginLeft: 5
    },
    scrollview: {

    },
    checkboxContainer: {
        flexDirection: "column",
        alignItems: 'center',
        marginBottom: 20,
    },
    checkbox: {
        alignSelf: "left",
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
        }
    },
})

export { result };