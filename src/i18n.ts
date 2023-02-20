import i18next from "i18next";
import { initReactI18next } from "react-i18next";

//Import all translation files
import translationEnglish from './locales/en/translation.json'
import translationUkrainean from './locales/ua/translation.json'
import translationRomanian from './locales/ro/translation.json'
import translationRussian from './locales/ru/translation.json'

//Import translation2 file


//---Using translation
const resources = {
    en: {
        translation: translationEnglish,
    },
    ro: {
        translation: translationRomanian,
    },
    ru: {
        translation: translationRussian,
    },
    ua: {
        translation: translationUkrainean,
    },
}

i18next
.use(initReactI18next)
.init({
  resources,
  lng:"ru", //default language
});

export default i18next;