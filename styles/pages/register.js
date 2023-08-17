import { StyleSheet } from 'react-native';

const register = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 40
    },
    content: {
        width: '100%',
        flex: 2
    },
    form: {
        flex: 2,
        alignItems: 'center',
        justifyContent: 'center',
    },
    center: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    logo: {
        width: 100,
        height: 100
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'gray',
        marginBottom: 20
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

        hidePasswordButton: {
            color: 'gray',

            image: {
                width: 20,
                height: 20,
            }
        }
    },
    bottom: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        flex: 1,

        buttons: {
            width: '100%',
            alignItems: 'center',
            justifyContent: 'space-evenly',
            flexDirection: 'row',
            marginBottom: 20,

            googleButton: {
                width: '40%',
                borderWidth: 1,
                borderColor: '#29C9B3',
                paddingVertical: 10,
                paddingHorizontal: 15,
                borderRadius: 15,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',

                image: {
                    width: 20,
                    height: 20,
                    marginRight: 10
                },
                text: {
                    color: '#DB4437',
                    fontSize: 14,
                    fontWeight: 'bold'
                }
            },
            facebookButton: {
                width: '40%',
                borderWidth: 1,
                borderColor: '#29C9B3',
                paddingVertical: 10,
                paddingHorizontal: 15,
                borderRadius: 15,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',

                image: {
                    width: 20,
                    height: 20,
                    marginRight: 10
                },
                text: {
                    color: '#3b5998',
                    fontSize: 14,
                    fontWeight: 'bold'
                }
            },
        },
        alreadyHaveAccount: {
            width: '100%',
            backgroundColor: 'transparent',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            marginVertical: 10,

            text: {
                color: '#777888',
                fontSize: 16,
                fontWeight: 'bold',
                marginRight: 10
            },
            register: {
                color: '#29C9B3',
                fontSize: 16,
                fontWeight: 'bold'
            }
        },

        picker: {
            width: 200,
            backgroundColor: 'transparent',
            borderWidth: 0,
            paddingVertical: 10,
            paddingHorizontal: 15
        }
    },
});

export { register };