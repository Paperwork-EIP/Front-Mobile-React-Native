import React from 'react';

import { getItem, storeItem } from './Storage';

async function setColorModeInLocalStorage(value: string) {
    await storeItem('@colorMode', value);
}

function getColorModeFromLocalStorage() {
    return getItem('@colorMode')
}

export { setColorModeInLocalStorage, getColorModeFromLocalStorage };