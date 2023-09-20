import { StyleSheet } from "react-native";

const help = StyleSheet.create({
container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#F7F7F7',
  },
  content: {
    marginBottom: 16,
  },
  title: {
      fontSize: 26,
      fontWeight: 'bold',
      marginBottom: 24,
      color: '#333',
      textAlign: 'center',
      textTransform: 'uppercase',
      letterSpacing: 1,
    },
    homebtn: {
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'left',
          marginBottom: "5%",
          marginTop: "5%",

          text: {
              color: 'black',
              fontSize: 24,
              fontWeight: 'bold'
          }
      },
  faqContainer: {
    marginBottom: 24,
    backgroundColor: '#FFF',
    borderRadius: 8,
    elevation: 2,
    padding: 16,
  },
  faqHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  faqQuestion: {
    fontSize: 20,
    color: '#333',
  },
  faqAnswer: {
    marginTop: 12,
    fontSize: 16,
    color: '#666',
  },
  faqImage: {
    width: '50%',
    height: undefined,
    alignSelf: 'center',
    resizeMode: 'contain',
    aspectRatio: 1,
  },
});

export { help };