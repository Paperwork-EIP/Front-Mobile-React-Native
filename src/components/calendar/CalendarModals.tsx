import React, { useState } from 'react';
import { View, Modal, Text, Alert } from 'react-native';
import { useTranslation } from 'react-i18next';
import DatePicker from 'react-native-date-picker';
import axios from 'axios';
import moment from 'moment';

import LongHorizontalButton from '../LongHorizontalButton';
import CrossButton from '../CrossButton';

import { calendar_modal } from '../../../styles/components/calendar/calendar_modal';

interface CalendarModalProps {
    title: string;
    processTitle: string;
    stepDescription: string;
    date: string;
    modalVisible: boolean;
    setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

interface CalendarActionsModalProps {
    title: string;
    userProcessId: number
    stepId: number;
    modalVisible: boolean;
    setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

function CalendarItemModal(props: CalendarModalProps) {
    const hour = props.title.split('-')[0];
    const title = props.title.split('-')[1];
    const processTitle = props.processTitle;
    const stepDescription = props.stepDescription;
    const date = props.date;

    const { t } = useTranslation();

    function closeModal() {
        props.setModalVisible(!props.modalVisible);
    }

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={props.modalVisible}
        >
            <View style={calendar_modal.item.centeredView as any}>
                <View style={calendar_modal.item.modalView as any}>
                    <View style={calendar_modal.item.modalHeader as any}>
                        <Text style={calendar_modal.item.modalHeader.text as any}>{processTitle}</Text>
                    </View>
                    <View style={calendar_modal.item.modalContent as any}>
                        <View style={calendar_modal.item.modalContent.header as any}>
                            <View style={calendar_modal.item.modalContent.header.sectionLeft as any}>
                                <Text style={calendar_modal.item.modalContent.header.sectionLeft.title as any}>{t('calendar.modal.date')}</Text>
                                <Text style={calendar_modal.item.modalContent.header.sectionLeft.text}>{date}</Text>
                            </View>
                            <View style={calendar_modal.item.modalContent.header.sectionRight as any}>
                                <Text style={calendar_modal.item.modalContent.header.sectionRight.title as any}>{t('calendar.modal.hour')}</Text>
                                <Text style={calendar_modal.item.modalContent.header.sectionRight.text}>{hour}</Text>
                            </View>
                        </View>
                        <View style={calendar_modal.item.modalContent.section as any}>
                            <Text style={calendar_modal.item.modalContent.section.title as any}>{t('calendar.modal.title')}</Text>
                            <Text style={calendar_modal.item.modalContent.section.text}>{title}</Text>
                        </View>
                        <View style={calendar_modal.item.modalContent.section as any}>
                            <Text style={calendar_modal.item.modalContent.section.title as any}>{t('calendar.modal.description')}</Text>
                            <Text style={calendar_modal.item.modalContent.section.text}>{stepDescription}</Text>
                        </View>
                    </View>
                    <View style={calendar_modal.item.modalFooter as any}>
                        <LongHorizontalButton
                            title="Ok"
                            styleButton={calendar_modal.item.modalFooter.button}
                            styleText={calendar_modal.item.modalFooter.button.text as any}
                            onPress={closeModal}
                            testID="close-item-modal-button"
                        />
                    </View>
                </View>
            </View>
        </Modal>
    )
}

function CalendarActionsModal(props: CalendarActionsModalProps) {
    const [date, setDate] = useState(new Date());

    const { t, i18n } = useTranslation();

    const url = process.env.EXPO_PUBLIC_BASE_URL;

    function formatDate(date: Date) {
        const formattedDate = moment(date).format('YYYY-MM-DD HH:mm:ss');

        return formattedDate;
    }

    async function requestEditProcess() {
        if (props.userProcessId && props.stepId && date) {
            const convertedDate = formatDate(date);

            console.log(convertedDate);

            await axios.post(`${url}/calendar/set`, {
                'user_process_id': props.userProcessId,
                'step_id': props.stepId,
                'date': convertedDate
            }).then((response) => {
                console.log(response);
                Alert.alert(
                    t('calendar.modal.edit.title'),
                    response.data.message,
                    [
                        {
                            text: t('calendar.modal.edit.ok'),
                            onPress: () => props.setModalVisible(!props.modalVisible)
                        }
                    ]
                );
            }
            ).catch((error) => {
                console.log(error.message);
            });
        }
    }

    function requestDeleteProcess() {
        if (props.userProcessId && props.stepId) {
            Alert.alert(
                t('calendar.modal.delete.title'),
                t('calendar.modal.delete.message'),
                [
                    {
                        text: t('calendar.modal.delete.cancel'),
                        style: 'cancel',
                        onPress: () => props.setModalVisible(!props.modalVisible)
                    },
                    {
                        text: t('calendar.modal.delete.button'),
                        style: 'destructive',
                        onPress: async () => {
                            await axios.get(`${url}/calendar/delete?user_process_id=${props.userProcessId}&step_id=${props.stepId}`)
                                .then((response) => {
                                    Alert.alert(
                                        t('calendar.modal.delete.success'),
                                        response.data.message,
                                        [
                                            {
                                                text: t('calendar.modal.delete.ok'),
                                                onPress: () => props.setModalVisible(!props.modalVisible)
                                            }
                                        ]
                                    );
                                }).catch((error) => {
                                    console.log(error);
                                });
                        }
                    }
                ],
                { cancelable: true }
            );
        }
    }

    function closeModal() {
        props.setModalVisible(!props.modalVisible);
    }

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={props.modalVisible}
        >
            <View style={calendar_modal.actions.centeredView as any}>
                <View style={calendar_modal.actions.modalView as any}>
                    <View style={calendar_modal.actions.modalHeader as any}>
                        <View style={calendar_modal.actions.modalHeader.containerTitle as any}>
                            <Text style={calendar_modal.actions.modalHeader.containerTitle.title as any}>{t('calendar.modal.edit.title')}</Text>
                        </View>
                        <CrossButton onPress={closeModal} />
                    </View>
                    <View style={calendar_modal.actions.modalContent as any}>
                        <DatePicker
                            mode="datetime"
                            minimumDate={new Date()}
                            minuteInterval={5}
                            date={date}
                            onConfirm={setDate}
                            onDateChange={setDate}
                            locale={i18n.language}
                        />
                    </View>
                    <View style={calendar_modal.actions.modalFooter as any}>
                        <LongHorizontalButton
                            title={t('calendar.modal.edit.button')}
                            styleButton={calendar_modal.actions.modalFooter.buttonEdit}
                            styleText={calendar_modal.actions.modalFooter.buttonEdit.text as any}
                            onPress={requestEditProcess}
                            testID="edit-action-modal-button"
                        />
                        <LongHorizontalButton
                            title={t('calendar.modal.delete.button')}
                            styleButton={calendar_modal.actions.modalFooter.buttonDelete}
                            styleText={calendar_modal.actions.modalFooter.buttonDelete.text as any}
                            onPress={requestDeleteProcess}
                            testID="delete-action-modal-button"
                        />
                    </View>
                </View>
            </View>
        </Modal>
    )
}

export { CalendarItemModal, CalendarActionsModal };