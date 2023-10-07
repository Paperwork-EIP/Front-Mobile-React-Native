import { StyleSheet } from "react-native";
import { lightTextColor, lightBackgroundColor, darkTextColor, darkBackgroundColor, darkSecondaryBackgroundColor, lightSecondaryBackgroundColor } from '../colors';

const mainmenu = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: lightBackgroundColor,
  },
  containerDark: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: darkBackgroundColor,
  },
  sectionContainer: {
    minHeight: 150,
    borderWidth: 1,
    borderColor: lightSecondaryBackgroundColor,
    borderRadius: 8,
    padding: 16,
    paddingVertical: 0,
    marginVertical: 7,
    backgroundColor: lightBackgroundColor,
    shadowColor: 'grey',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  sectionContainerDark: {
    minHeight: 150,
    borderRadius: 8,
    padding: 16,
    paddingVertical: 0,
    marginVertical: 7,
    backgroundColor: darkSecondaryBackgroundColor,
    shadowColor: 'grey',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  noProcessContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noProcessText: {
    fontSize: 16,
    color: '#555',
  },
  processContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
    paddingVertical: 4,
  },
  processName: {
    fontSize: 14,
    fontWeight: '400',
    color: lightTextColor,
  },
  processPercentage: {
    fontSize: 16,
    color: lightTextColor,
  },
  processNameDark: {
    fontSize: 14,
    fontWeight: '400',
    color: darkTextColor,
  },
  processPercentageDark: {
    fontSize: 16,
    color: darkTextColor,
  },
  button: {
    backgroundColor: '#29C9B3',
    marginTop: 5,
    marginBottom: 10,
    paddingVertical: 6,
    borderRadius: 15,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 14,
  },
  buttonContainer: {
    borderWidth: 1,
    borderColor: lightSecondaryBackgroundColor,
    backgroundColor: lightBackgroundColor,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 16,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  buttonContainerDark: {
    borderWidth: 1,
    borderColor: darkBackgroundColor,
    backgroundColor: darkSecondaryBackgroundColor,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 16,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  buttonContainerWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    paddingVertical: 12,
    color: lightTextColor,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  titleDark: {
    fontSize: 16,
    fontWeight: 'bold',
    paddingVertical: 12,
    color: darkTextColor,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  content: {
    fontSize: 16,
    color: lightTextColor
  },
  contentDark: {
    fontSize: 16,
    color: darkTextColor
  },
  image: {
    width: '40%',
    height: undefined,
    alignSelf: 'center',
    resizeMode: 'contain',
    aspectRatio: 1,
  },
  calendarContainer: {
    width: '100%',
    height: 310,
    paddingBottom: 16,
  },
  calendarWrapper: {
    height: '100%',
  }
});

export { mainmenu };