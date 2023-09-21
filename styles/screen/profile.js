import { StyleSheet } from 'react-native';

const profile = StyleSheet.create({
    toSettings: {
        alignContent: 'left',
    },
    profilePicture: {
        width: '80%',
        height: '70%',
        // backgroundColor: '#000000',
        borderRadius: 100,
    },
    shadowProp: {
        shadowColor: '#171717',
        shadowOffset: {width: -2, height: 4},
        shadowOpacity: 0.2,
        shadowRadius: 3,
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
    content: {
        flex: 2,
        width: '100%',
        paddingTop: 20,
        paddingLeft: 20,
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
    logo: {
        width: '100%',
        height: 150
    },
    container: {
        width: '100%',
        height: '100%',
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        // paddingTop: 50
    },
    header: {
        width: '100%',
        alignItems: 'flex-end',
        marginRight: 20,
    },
    center: {
        width: '30%',
        height: '20%',
        alignItems: 'center',
        justifyContent: 'center',
        // backgroundColor: '#c6c8cc',
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'black',
        marginTop: 15,
        marginLeft: 5
    },
    edit: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#29c9b3',
        marginLeft: 50,
        textAlign: 'right',
    },
    info : {
        backgroundColor: '#f0f0f0',
        width: '85%',
        borderRadius: 10,
        marginTop: 10,
        marginBottom: 30,
    },
    text: {
        fontSize: 13,
        // fontWeight: 'bold',
        color: 'black',
        marginTop: 5,
        marginBottom: 5,
        marginLeft: 10,
        textAlign: 'left',
    },
    line : {
        borderBottomColor: 'black',
        borderBottomWidth: StyleSheet.hairlineWidth
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
});

const result = StyleSheet.create({
    logo: {
        width: '90%',
        height: 900
    },
    center: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
})

export { profile, result };