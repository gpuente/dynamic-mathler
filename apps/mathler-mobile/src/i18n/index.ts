import 'intl-pluralrules';
import i18n, { Resource } from 'i18next';
import { initReactI18next } from 'react-i18next';

import translationEN from './locales/en.json';
import translationES from './locales/es.json';

const resources: Resource = {
  en: {
    code: 'en',
    name: 'English',
    translation: translationEN,
  },
  es: {
    code: 'es',
    name: 'Español',
    translation: translationES,
  },
};

i18n.use(initReactI18next).init({
  resources,
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n.init();
