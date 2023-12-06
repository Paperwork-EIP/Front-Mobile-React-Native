import { StyleSheet } from "react-native";
import { lightTextColor, lightBackgroundColor, darkTextColor, darkBackgroundColor, darkSecondaryBackgroundColor } from '../colors';

const processIdeaLight = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        backgroundColor: '#fff',
        alignItems: 'center',
        paddingVertical: "20%"
    },
    content: {
        width: '100%',
        paddingHorizontal: '5%',
    },
    homebtn: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'left',
        marginBottom: "5%",

        text: {
            color: 'black',
            fontSize: 24,
            fontWeight: 'bold'
        }
    },
    form: {
        alignItems: 'left',
        justifyContent: 'center',
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'gray',
        marginBottom: 20,
        marginLeft: 5,
    },
    helpLabel: {
        fontSize: 12,
        fontWeight: 'normal',
        color: 'gray',
        marginBottom: 20,
        marginLeft: 5,
    },
    errorLabel: {
        fontSize: 12,
        fontWeight: 'normal',
        color: 'red',
        marginBottom: 20,
        marginLeft: 5,
    },
    input: {
        width: '90%',
        backgroundColor: '#f2f2f2',
        color: 'gray',
        borderWidth: 0,
        marginBottom: 12,
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 15,
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
});



// DARK MODE

const processIdeaDark = StyleSheet.create({
    container: {
        ...processIdeaLight.container,
        backgroundColor: '#121212',
    },
    content: {
        ...processIdeaLight.content,
    },
    homebtn: {
        ...processIdeaLight.homebtn,

        text: {
            ...processIdeaLight.homebtn.text,
            color: 'white',
        }
    },
    form: {
        ...processIdeaLight.form,
    },
    title: {
        ...processIdeaLight.title,
        color: darkTextColor,
    },
    helpLabel: {
        ...processIdeaLight.helpLabel,
        color: 'gray',
    },
    errorLabel: {
        ...processIdeaLight.errorLabel,
    },
    input: {
        ...processIdeaLight.input,
        color: darkTextColor,
        backgroundColor: darkSecondaryBackgroundColor,
        borderColor: darkTextColor,
    },
    placeholder: {
        color: darkTextColor
    },
    button: {
        ...processIdeaLight.button,

        text: {
            ...processIdeaLight.button.text,
        }
    },
});

export { processIdeaLight, processIdeaDark };