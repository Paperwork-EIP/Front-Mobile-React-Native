import React, { useCallback, useEffect, useState } from "react";
import { Text, View } from "react-native";
import { useTranslation } from 'react-i18next';
import { AgendaList, CalendarProvider, ExpandableCalendar, LocaleConfig } from 'react-native-calendars';

import CalendarItems from "./CalendarItems";
import AddButton from "../AddButton";
import { CalendarActionsModal, CalendarAddModal, CalendarItemModal } from "./CalendarModals";

import { calendar_component } from "../../../styles/components/calendar/calendar_component.js";

function CalendarComponent(props: any) {
    const [itemModalVisible, setItemModalVisible] = useState(false);
    const [actionsModalVisible, setActionsModalVisible] = useState(false);
    const [addModalVisible, setAddModalVisible] = useState(false);
    const [itemModalData, setItemModalData] = React.useState();

    const { t, i18n } = useTranslation();

    LocaleConfig.locales['fr'] = {
        monthNames: [
            t('calendar.months.january'),
            t('calendar.months.february'),
            t('calendar.months.march'),
            t('calendar.months.april'),
            t('calendar.months.may'),
            t('calendar.months.june'),
            t('calendar.months.july'),
            t('calendar.months.august'),
            t('calendar.months.september'),
            t('calendar.months.october'),
            t('calendar.months.november'),
            t('calendar.months.december')
        ],
        monthNamesShort: [
            t('calendar.months.short.january'),
            t('calendar.months.short.february'),
            t('calendar.months.short.march'),
            t('calendar.months.short.april'),
            t('calendar.months.short.may'),
            t('calendar.months.short.june'),
            t('calendar.months.short.july'),
            t('calendar.months.short.august'),
            t('calendar.months.short.september'),
            t('calendar.months.short.october'),
            t('calendar.months.short.november'),
            t('calendar.months.short.december')
        ],
        dayNames: [
            t('calendar.days.sunday'),
            t('calendar.days.monday'),
            t('calendar.days.tuesday'),
            t('calendar.days.wednesday'),
            t('calendar.days.thursday'),
            t('calendar.days.friday'),
            t('calendar.days.saturday')
        ],
        dayNamesShort: [
            t('calendar.days.short.sunday'),
            t('calendar.days.short.monday'),
            t('calendar.days.short.tuesday'),
            t('calendar.days.short.wednesday'),
            t('calendar.days.short.thursday'),
            t('calendar.days.short.friday'),
            t('calendar.days.short.saturday')
        ],
        today: t('calendar.today')
    };

    LocaleConfig.locales['en'] = LocaleConfig.locales['fr'];

    function itemPressed(item: any) {
        if (itemModalData !== item) {
            setItemModalData(item);
            setItemModalVisible(true);
        }
    }

    function buttonPressed(item: any) {
        if (itemModalData !== item) {
            setItemModalData(item);
            setActionsModalVisible(true);
        }
    }

    function addButtonPressed() {
        setAddModalVisible(true);
    }

    const renderItem = useCallback((item: any) => {
        return (
            <CalendarItems
                item={item.item}
                onPressCard={() => itemPressed(item)}
                onPressButton={() => buttonPressed(item)}
            />
        );
    }, [props.items]);

    function displayAgendaItems() {
        if (props.items.length === 0) {
            return (
                <View style={props.styleEmpty}>
                    <Text style={props.styleEmptyText}>No event planned</Text>
                </View>
            );
        } else {
            return (
                <AgendaList
                    sections={props.items}
                    renderItem={renderItem}
                />
            );
        }
    }

    function displayItemModal(item: any) {
        const title = item.item.title;
        const processTitle = item.section.processTitle;
        const stepDescription = item.section.stepDescription;
        const date = item.section.title;

        return (
            <CalendarItemModal
                modalVisible={itemModalVisible}
                setModalVisible={setItemModalVisible}
                title={title}
                processTitle={processTitle}
                stepDescription={stepDescription}
                date={date}
            />
        )
    }

    function displayActionsModal(item: any) {
        const title = item.item.title;
        const userProcessId = item.section.userProcessId;
        const stepId = item.section.stepId;

        return (
            <CalendarActionsModal
                title={title}
                userProcessId={userProcessId}
                stepId={stepId}
                modalVisible={actionsModalVisible}
                setModalVisible={setActionsModalVisible}
            />
        )
    }

    function displayAddModal() {
        return (
            <CalendarAddModal
                modalVisible={addModalVisible}
                setModalVisible={setAddModalVisible}
            />
        )
    }

    function displayModals() {
        if (itemModalData) {
            if (itemModalVisible) {
                return displayItemModal(itemModalData);
            } else if (actionsModalVisible) {
                return displayActionsModal(itemModalData);
            } else {
                return null;
            }
        }
        if (addModalVisible) {
            return displayAddModal();
        }
    }

    useEffect(() => {
        LocaleConfig.defaultLocale = i18n.language;
    }, [i18n.language]);

    return (
        <>
            {displayModals()}
            <CalendarProvider
                date={Date()}
                showTodayButton={true}
                disabledOpacity={0.6}
            >
                <ExpandableCalendar
                    minDate={Date()}
                    firstDay={1}
                    onDayPress={props.onDayPress}
                    markedDates={props.markedDates}
                    markingType="multi-dot"
                    testID="expandableCalendar"
                />
                {displayAgendaItems()}
            </CalendarProvider>
            <AddButton
                style={calendar_component.addButton}
                onPress={addButtonPressed}
            />
        </>
    );
}

export default CalendarComponent;