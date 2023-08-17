import React, { useState } from "react";
import { useTranslation } from 'react-i18next';
import { Calendar, LocaleConfig } from 'react-native-calendars';

import { calendar_component } from "../../styles/components/calendar_component.js";

function CalendarComponent() {
    const { t, i18n } = useTranslation();

    const dot_color = '#FC6976';

    const [selected, setSelected] = useState('');

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

    LocaleConfig.defaultLocale = i18n.language;

    return (
        <Calendar
            onDayPress={day => {
                setSelected(day.dateString);
                console.log('selected day', day);
            }}
            style={calendar_component.calendar}
            markedDates={{
                [selected]: {
                    selected: true,
                    disableTouchEvent: true,
                    selectedColor: dot_color,
                },
                '2023-07-01': { selected: true, marked: true, selectedColor: 'blue' },
                '2023-07-02': { marked: true },
                '2023-07-03': { selected: true, marked: true, selectedColor: 'blue' }
            }}
        />
    );
}

export default CalendarComponent;