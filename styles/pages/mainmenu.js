import { StyleSheet } from "react-native";

const mainmenu = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: '#F7F7F7',
  },
  sectionContainer: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    padding: 16,
    paddingVertical: 0,
    marginVertical: 7,
    backgroundColor: '#FFFFFF',
    shadowColor: 'grey',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
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
    color: '#333',
  },
  processPercentage: {
    fontSize: 16,
    color: '#555',
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
    borderColor: '#cecece',
    backgroundColor: '#f8f9fa',
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
    color: '#333',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  content: {
    fontSize: 16,
    color: '#555',
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