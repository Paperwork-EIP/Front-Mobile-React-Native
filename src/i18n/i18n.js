import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import Language from './Languages.js';

import en from './json/en.json';
import fr from './json/fr.json';
import de from './json/de.json';
import es from './json/es.json';
import id from './json/id.json';
import ko from './json/ko.json';

let defaultLanguage = Language.EN;

const resources = {
    en: {
        translation: en
    },
    fr: {
        translation: fr
    },
    de: {
        translation: de
    },
    es: {
        translation: es
    },
    id: {
        translation: id
    },
    ko: {
        translation: ko
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
