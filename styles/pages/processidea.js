import { StyleSheet } from "react-native";

const processidea = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    },
    content: {
        width: '100%',
        flex: 2,
    },
    form: {
        flex: 2,
        paddingHorizontal: '5%',
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

export { processidea };