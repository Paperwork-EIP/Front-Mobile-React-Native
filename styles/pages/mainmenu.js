import { StyleSheet } from "react-native";

const mainmenu = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#F7F7F7',
  },
  sectionContainer: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    marginTop: 20, // Ajout de la marge en haut
    backgroundColor: '#FFFFFF', // Ajout d'un fond blanc
    shadowColor: '#000', // Ajout d'une ombre
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2, // Pour Android
  },
  processContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  processName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 8,
    color: '#333', // Couleur du texte en gras
  },
  processPercentage: {
    fontSize: 16,
    color: '#555', // Couleur du texte pourcentage
  },
  buttonContainer: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    backgroundColor: '#FFFFFF', // Ajout d'un fond blanc
    shadowColor: '#000', // Ajout d'une ombre
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2, // Pour Android
  },
  buttonContainerWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20, // Ajout de la marge en haut
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 12,
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
});

export { mainmenu };
