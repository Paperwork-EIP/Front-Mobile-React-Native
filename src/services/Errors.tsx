import React from 'react';

import { Alert } from 'react-native';

function AlertErrorSomethingWrong(error: any, t: any) {
    console.error(error.response);
    Alert.alert(
        t('login.error.title'),
        t('login.error.somethingWrong'),
        [
            { text: t('login.error.button') }
        ]
    );
}

export default AlertErrorSomethingWrong;