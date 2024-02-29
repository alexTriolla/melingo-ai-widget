import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './en.json';
import he from './he.json';

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: { ...en } },
    he: { translation: { ...he } },
  },
  fallbackLng: 'en',
  debug: true,
  interpolation: {
    escapeValue: false,
  },
});
