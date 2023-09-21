import { StyleSheet } from 'react-native';

const quizzPage = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        backgroundColor: '#fff',
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
        width: '30%',
        height: '20%',
        alignItems: 'center',
        justifyContent: 'center',
        // backgroundColor: 'green',
    },
    modifPicture: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
        // backgroundColor: 'red',
    },
    profilePicture: {
        width: '80%',
        height: '60%',
        marginTop: 30,
        // backgroundColor: '#000000',
        borderRadius: 100,
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
            color: 'gray',
            borderWidth: 0,
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
})

export { quizzPage };