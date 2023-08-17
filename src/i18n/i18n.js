import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import Language from './Languages.js';

import en from './json/en.json';
import fr from './json/fr.json';

let defaultLanguage = Language.EN;

const resources = {
    en: {
        translation: en
    },
    fr: {
        translation: fr
    }
};

i18n.use(initReactI18next).init(
    {
        resources,
        compatibilityJSON: 'v3',
        lng: defaultLanguage,

        interpolation: {
            escapeValue: false
        }
    }
);

export default i18n;
