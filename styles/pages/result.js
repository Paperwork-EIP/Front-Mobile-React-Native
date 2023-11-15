import { StyleSheet } from 'react-native';
import { darkBackgroundColor, darkSecondaryBackgroundColor, darkTextColor, lightBackgroundColor, lightSecondaryBackgroundColor, lightTextColor } from '../colors';

const result = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        backgroundColor: '#fff',
        alignItems: 'center',
        // justifyContent: 'center',
        // paddingTop: 50
        
    },
    text: {
            fontSize: 18,
            fontWeight: 'bold',
            color: 'black',
            marginTop: 15,
            marginLeft: 5
    },
    checkboxContainer: {
        flexDirection: "row",
        alignItems: 'center',
        marginBottom: 20,
    },
    checkbox: {
        alignSelf: "center",
    },
})

export { result };