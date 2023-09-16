import { StyleSheet } from 'react-native';

const calendar_modal = StyleSheet.create({
    item: {
        flex: 1,

        centeredView: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 22,
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
        },
        modalView: {
            margin: 20,
            backgroundColor: 'white',
            borderRadius: 10,
            padding: 15,
            height: "80%",
            width: "90%",
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'space-between',
            shadowColor: 'black',
            shadowOffset: {
                width: 0,
                height: 2,
            },
            shadowOpacity: 0.55,
            shadowRadius: 4,
            elevation: 5,
        },
        modalHeader: {
            width: "100%",
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
            borderBottomColor: 'grey',
            borderBottomWidth: 1,
            marginBottom: 10,
            paddingBottom: 10,
            paddingTop: 5,
    
            text: {
                fontSize: 20,
                fontWeight: 'bold',
            },
        },
        modalContent: {
            width: "100%",
            alignItems: 'center',
            justifyContent: 'flex-start',
            gap: 20,
    
            header: {
                width: "100%",
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: 10,
    
                sectionLeft: {
                    width: "50%",
                    flexDirection: 'column',
                    justifyContent: 'flex-start',
                    alignItems: 'flex-start',
                    paddingBottom: 10,
                    paddingLeft: 10,
    
                    title: {
                        fontSize: 20,
                        fontWeight: 'bold',
                    },
    
                    text: {
                        fontSize: 16,
                    },
                },
    
                sectionRight: {
                    width: "50%",
                    flexDirection: 'column',
                    justifyContent: 'flex-end',
                    alignItems: 'flex-end',
                    paddingBottom: 10,
                    paddingRight: 10,
    
                    title: {
                        fontSize: 20,
                        fontWeight: 'bold',
                    },
    
                    text: {
                        fontSize: 16,
                    },
                }
            },
    
            section: {
                width: "100%",
                flexDirection: 'column',
                justifyContent: 'flex-start',
                alignItems: 'flex-start',
                paddingBottom: 10,
                paddingLeft: 10,
                paddingRight: 10,
                overflow: 'scroll',
    
                title: {
                    fontSize: 20,
                    fontWeight: 'bold',
                },
    
                text: {
                    fontSize: 16,
                },
            }
        },
        modalFooter: {
            width: "100%",
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            borderTopColor: 'grey',
            borderTopWidth: 1,
            paddingTop: 20,
    
            button: {
                borderRadius: 20,
                padding: 10,
                height: 40,
                width: 130,
                elevation: 3,
                backgroundColor: "#29C9B3",
    
                text: {
                    color: 'white',
                    fontWeight: 'bold',
                    textAlign: 'center',
                }
            },
        }
    },

    actions: {
        flex: 1,

        centeredView: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 22,
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
        },
        modalView: {
            margin: 20,
            backgroundColor: 'white',
            borderRadius: 10,
            padding: 15,
            height: "80%",
            width: "90%",
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'space-between',
            shadowColor: 'black',
            shadowOffset: {
                width: 0,
                height: 2,
            },
            shadowOpacity: 0.55,
            shadowRadius: 4,
            elevation: 5,
        },

        modalHeader: {
            width: "100%",
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
    
            containerTitle: {
                width: "60%",
                title: {
                    fontSize: 20,
                    color: 'grey',
                    paddingLeft: 10,
                },
            }
        },
        modalContent: {
            width: "100%",
            alignItems: 'center',
            justifyContent: 'center',
        },

        modalFooter: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingTop: 15,
    
            buttonEdit: {
                borderRadius: 20,
                padding: 10,
                height: 40,
                width: 100,
                elevation: 3,
                backgroundColor: "#29C9B3",
    
                text: {
                    color: 'white',
                    fontWeight: 'bold',
                    textAlign: 'center',
                }
            },

            buttonDelete: {
                borderRadius: 20,
                padding: 10,
                height: 40,
                width: 100,
                elevation: 3,
                marginLeft: 20,
                backgroundColor: "#E74C3C",
    
                text: {
                    color: 'white',
                    fontWeight: 'bold',
                    textAlign: 'center',
                }
            },
        }
    }
});

export { calendar_modal };