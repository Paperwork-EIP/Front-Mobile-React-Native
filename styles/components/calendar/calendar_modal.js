import { StyleSheet } from 'react-native';
import { lightTextColor, lightBackgroundColor, darkTextColor, darkBackgroundColor, darkSecondaryBackgroundColor, lightSecondaryBackgroundColor } from '../../colors';

const calendar_modal = StyleSheet.create({
    item: {
        flex: 1,

        centeredView: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
        },
        modalView: {
            margin: 20,
            backgroundColor: lightBackgroundColor,
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
        modalViewDark: {
            margin: 20,
            backgroundColor: darkBackgroundColor,
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
                color: lightTextColor,
            },
            textDark: {
                fontSize: 20,
                fontWeight: 'bold',
                color: darkTextColor,
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
                        color: lightTextColor,
                    },
                    titleDark: {
                        fontSize: 20,
                        fontWeight: 'bold',
                        color: darkTextColor,
                    },

                    text: {
                        fontSize: 16,
                        color: lightTextColor,
                    },
                    textDark: {
                        fontSize: 16,
                        color: darkTextColor,
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
                        color: lightTextColor,
                    },
                    titleDark: {
                        fontSize: 20,
                        fontWeight: 'bold',
                        color: darkTextColor,
                    },

                    text: {
                        fontSize: 16,
                        color: lightTextColor,
                    },
                    textDark: {
                        fontSize: 16,
                        color: darkTextColor,
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
                    color: lightTextColor,
                },
                titleDark: {
                    fontSize: 20,
                    fontWeight: 'bold',
                    color: darkTextColor,
                },

                text: {
                    fontSize: 16,
                    color: lightTextColor,
                },
                textDark: {
                    fontSize: 16,
                    color: darkTextColor,
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
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
        },
        modalView: {
            margin: 20,
            backgroundColor: lightBackgroundColor,
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
        modalViewDark: {
            margin: 20,
            backgroundColor: darkBackgroundColor,
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
                    color: lightTextColor,
                    paddingLeft: 10,
                },
                titleDark: {
                    fontSize: 20,
                    color: darkTextColor,
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
    },

    add: {
        flex: 1,

        centeredView: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
        },
        modalView: {
            margin: 20,
            backgroundColor: lightBackgroundColor,
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
        modalViewDark: {
            margin: 20,
            backgroundColor: darkBackgroundColor,
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
                    color: lightTextColor,
                    paddingLeft: 10,
                },

                titleDark: {
                    fontSize: 20,
                    color: darkTextColor,
                    paddingLeft: 10,
                },
            }
        },
        modalContent: {
            width: "100%",
            alignItems: 'center',
            justifyContent: 'center',

            section: {
                width: "100%",

                title: {
                    fontSize: 16,
                    color: lightTextColor,
                },
                titleDark: {
                    fontSize: 16,
                    color: darkTextColor,
                },

                picker: {
                    width: "100%",
                    marginBottom: 20,
                    color: lightTextColor,

                    item: {
                        backgroundColor: lightSecondaryBackgroundColor,
                        text: {
                            fontSize: 12,
                        },
                    },
                    container : {
                        backgroundColor: lightSecondaryBackgroundColor,
                    },
                },
                pickerDark: {
                    width: "100%",
                    marginBottom: 20,
                    color: darkTextColor,

                    item: {
                        backgroundColor: darkSecondaryBackgroundColor,
                        text: {
                            fontSize: 12,
                        },
                    },
                    container : {
                        backgroundColor: darkSecondaryBackgroundColor,
                    },
                },

                datePicker: {
                    color: lightTextColor,
                },
                datePickerDark: {
                    color: darkTextColor,
                },
            }
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