import React from 'react';
import { View, Modal, Alert, Text, Pressable } from 'react-native';

import { calendar_modal } from '../../../styles/components/calendar/calendar_modal';

interface CalendarModalProps {
    modalVisible: boolean;
    setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

function CalendarModal(props: CalendarModalProps) {
    return (
        <View style={calendar_modal.centeredView}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={props.modalVisible}
                onRequestClose={() => {
                    Alert.alert('Modal has been closed.');
                    props.setModalVisible(!props.modalVisible);
                }}>
                <View style={calendar_modal.centeredView}>
                    <View style={calendar_modal.modalView}>
                        <Text style={calendar_modal.modalText}>Hello World!</Text>
                        <Pressable
                            style={[calendar_modal.button, calendar_modal.buttonClose]}
                            onPress={() => props.setModalVisible(!props.modalVisible)}>
                            <Text style={calendar_modal.textStyle}>Hide Modal</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
        </View>
    )
}

export default CalendarModal;