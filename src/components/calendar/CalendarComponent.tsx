import React, { useCallback, useEffect } from "react";
import { useTranslation } from 'react-i18next';
import { AgendaList, CalendarProvider, ExpandableCalendar, LocaleConfig } from 'react-native-calendars';
import CalendarItems from "./CalendarItems";

function CalendarComponent(props: any) {
    const { t, i18n } = useTranslation();

    LocaleConfig.locales['fr'], LocaleConfig.locales['en'] = {
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

    
    const renderItem = useCallback((item: any) => {
        return (
            <CalendarItems item={item} />
        );
    }, []);

    useEffect(() => {
        LocaleConfig.defaultLocale = i18n.language;
    }, [i18n.language]);

    return (
        <CalendarProvider
            date={Date()}
            showTodayButton={true}
            disabledOpacity={0.6}
        >
            <ExpandableCalendar
                minDate={Date()}
                firstDay={1}
                onDayPress={props.onDayPress}
                markingType="multi-dot"
                markedDates={props.markedDates}
                testID="expandableCalendar"
            />
            <AgendaList
                sections={props.items}
                renderItem={renderItem}
            />
        </CalendarProvider>

    );
}

export default CalendarComponent;