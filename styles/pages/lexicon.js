import { StyleSheet } from "react-native";
import {
  lightTextColor,
  lightBackgroundColor,
  darkTextColor,
  darkBackgroundColor,
  darkSecondaryBackgroundColor,
} from '../colors';

const lexicon = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#F7F7F7',
  },
  containerDark: {
    flex: 1,
    padding: 16,
    backgroundColor: darkBackgroundColor,
  },
  content: {
    marginBottom: 16,
  },
  homebtn: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'left',
      marginBottom: "5%",
      marginTop: "5%",
  },
  form: {
      alignItems: 'left',
      justifyContent: 'center',
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
  faqContainer: {
    marginBottom: 24,
    backgroundColor: '#FFF',
    borderRadius: 8,
    elevation: 2,
    padding: 16,
  },
  faqContainerDark: {
    marginBottom: 24,
    backgroundColor: darkSecondaryBackgroundColor,
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
  faqQuestionDark: {
    fontSize: 20,
    color: darkTextColor,
  },
  faqAnswer: {
    marginTop: 12,
    fontSize: 16,
    color: '#666',
  },
  faqAnswerDark: {
    marginTop: 12,
    fontSize: 16,
    color: darkTextColor,
  },
  faqImage: {
    width: '50%',
    height: undefined,
    alignSelf: 'center',
    resizeMode: 'contain',
    aspectRatio: 1,
  },
});

export { lexicon };
