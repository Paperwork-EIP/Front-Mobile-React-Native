import { StyleSheet } from 'react-native';
import {
  lightTextColor,
  lightBackgroundColor,
  darkTextColor,
  darkBackgroundColor,
  darkSecondaryBackgroundColor,
} from '../colors';

const forgotPassword = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: lightBackgroundColor,
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerDark: {
    flex: 1,
    backgroundColor: darkBackgroundColor,
    alignItems: 'center',
    justifyContent: 'center',
  },
  formContainer: {
    width: '100%',
    maxWidth: 400,
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 40,
  },
  content: {
    width: '100%',
    flex: 2,
  },
  form: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 70,
  },
  titleDark: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 70,
  },
  button: {
    width: '90%',
    backgroundColor: '#29C9B3',
    color: 'gray',
    borderWidth: 0,
    marginTop: 20,
    marginBottom: 30,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',

    text: {
      color: 'white',
      fontSize: 18,
      fontWeight: 'bold',
    },
  },
  input: {
    color: 'black',
    width: '90%',
    backgroundColor: '#f2f2f2',
    borderWidth: 0,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 15,
    fontSize: 16,
  },
  inputDark: {
    color: 'white',
    width: '90%',
    backgroundColor: darkSecondaryBackgroundColor,
    borderColor: darkTextColor,
    borderWidth: 0.5,
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 15,
    fontSize: 16,
  },
  Image: {
    width: '50%',
    height: undefined,
    alignSelf: 'center',
    resizeMode: 'contain',
    aspectRatio: 1,
    marginTop: -60,
    marginBottom: 20,
  },
  placeholder: {
    color: lightTextColor,
  },
  placeholderDark: {
    color: darkTextColor,
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
  successText: {
    color: 'green',
    marginBottom: 10,
  },
  center: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottom: {
      width: '100%',
      alignItems: 'center',
      justifyContent: 'space-evenly',
      flex: 1,
      returnToLogin: {
          width: '100%',
          backgroundColor: 'transparent',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          marginVertical: 20,
          text: {
              color: '#FC6976',
              fontSize: 16,
              fontWeight: 'bold',
              marginRight: 10
          },
          textDark: {
              color: "white",
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
  },
});

export { forgotPassword };


