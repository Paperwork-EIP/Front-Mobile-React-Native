import { StyleSheet } from 'react-native';
import { darkBackgroundColor, darkSecondaryBackgroundColor, darkTextColor, lightBackgroundColor, lightSecondaryBackgroundColor, lightTextColor } from '../colors';

const profile = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 20,
        paddingHorizontal: 25,
        backgroundColor: lightBackgroundColor
    },
    containerDark: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 20,
        paddingHorizontal: 25,
        backgroundColor: darkBackgroundColor
    },
    content: {
        flex: 3,
        width: '100%',
    },
    settingsButton: {
        marginRight: 20,

        icon: {
            color: lightTextColor,
        },

        iconDark: {
            color: darkTextColor,
        },
    },
    editWrapper: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    editButton: {
        alignItems: 'center',
        justifyContent: 'center',
        gap: 6,
        flexDirection: 'row',
    },
    profileWrapper: {
        width: '100%',
        overflow: 'hidden',
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 20,
    },
    profilePictureWrapper: {
        elevation: 20,
        borderRadius: 50,
        shadowColor: '#FC6976',
        borderColor: '#FC6976',
        borderWidth: 2,
        marginBottom: 18,
    },
    profilePicture: {
        height: 80,
        width: 80,
        borderRadius: 40,
    },
    profileTexts: {
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    },
    profileText: {
        fontSize: 20,
        fontWeight: '500',
        letterSpacing: 0.8,
        color: lightTextColor,
    },
    profileTextDark: {
        fontSize: 20,
        fontWeight: '500',
        letterSpacing: 0.8,
        color: darkTextColor,
    },
    profileTextUsername: {
        fontSize: 16,
        letterSpacing: 1.3,
        color: lightTextColor,
    },
    profileTextUsernameDark: {
        fontSize: 16,
        letterSpacing: 1.3,
        color: darkTextColor,
    },
    textsInfo: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        paddingVertical: 9,
        paddingHorizontal: 12,
        borderRadius: 15,
        backgroundColor: 'transparent',
    },
    leftPartInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        gap: 10,
    },
    rightPartInfo: {
        alignItems: 'flex-end',
        justifyContent: 'center',
    },
    leftPartInfoText: {
        fontSize: 12,
        fontWeight: '400',
    },
    leftPartInfoTextDark: {
        fontSize: 12,
        fontWeight: '400',
        color: darkTextColor,
    },
    rightPartInfoText: {
        fontSize: 13,
        fontWeight: '500',
    },
    rightPartInfoTextDark: {
        fontSize: 13,
        fontWeight: '500',
        color: darkTextColor,
    },
    noProcess: {
        marginTop: 10,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f2f2f2',
        borderRadius: 15,
        paddingVertical: 25,
    },
    noProcessText: {
        fontSize: 16,
        opacity: 0.5,
        fontWeight: '500',
        color: 'black',
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
    },
    title: {
        fontSize: 14,
        fontWeight: '600',
        color: lightTextColor
    },
    titleDark: {
        fontSize: 14,
        fontWeight: '600',
        color: darkTextColor
    },
    edit: {
        fontSize: 14,
        fontWeight: '500',
        color: '#FC6976',
    },
    info: {
        backgroundColor: lightSecondaryBackgroundColor,
        borderRadius: 10,
        marginTop: 10,
        marginBottom: 30,
    },
    infoDark: {
        backgroundColor: darkSecondaryBackgroundColor,
        borderRadius: 10,
        marginTop: 10,
        marginBottom: 30,
    },
    text: {
        fontSize: 13,
        paddingVertical: 9,
        paddingHorizontal: 10,
    },
    line: {
        borderBottomColor: 'grey',
        borderBottomWidth: StyleSheet.hairlineWidth,
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
    processContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 8,
        marginBottom: 8,
    },
    processName: {
        fontSize: 16,
        fontWeight: 'bold',
        marginRight: 5,
        color: '#333',
    },
    processPercentage: {
        fontSize: 16,
        color: '#555',
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