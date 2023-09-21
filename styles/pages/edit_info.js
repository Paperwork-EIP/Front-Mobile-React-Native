import { StyleSheet } from 'react-native';

const edit = StyleSheet.create({
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
        marginTop: 15,
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
    shadow: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 10,
    },
    // header: {
    //     flexDirection: 'row',
    //     width,
    //     height: 50,
    //     alignItems: 'center',
    //     justifyContent: 'center',
    //     backgroundColor: '#F6F6F6',
    // },
    // headerTitle: { color: '#000', fontWeight: 'bold', fontSize: 16 },
    // saveAreaViewContainer: { flex: 1, backgroundColor: '#FFF' },
    // viewContainer: { flex: 1, width, backgroundColor: '#FFF' },
    // scrollViewContainer: {
    //     flexGrow: 1,
    //     justifyContent: 'space-between',
    //     alignItems: 'center',
    //     paddingVertical: '10%',
    //     paddingBottom: '20%',
    // },

    // dropdown1BtnStyle: {
    //     width: '80%',
    //     height: 50,
    //     backgroundColor: '#FFF',
    //     borderRadius: 8,
    //     borderWidth: 1,
    //     borderColor: '#444',
    // },
    // dropdown1BtnTxtStyle: { color: '#444', textAlign: 'left' },
    // dropdown1DropdownStyle: { backgroundColor: '#EFEFEF' },
    // dropdown1RowStyle: { backgroundColor: '#EFEFEF', borderBottomColor: '#C5C5C5' },
    // dropdown1RowTxtStyle: { color: '#444', textAlign: 'left' },
})

export { edit };