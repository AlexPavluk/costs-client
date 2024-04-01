import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import detector from "i18next-browser-languagedetector";
import Cookies from "universal-cookie";

//Import all translation files
import translationEnglish from './locales/en/translation.json'
import translationUkrainean from './locales/ua/translation.json'
import translationRomanian from './locales/ro/translation.json'
import translationRussian from './locales/ru/translation.json'
import translationPolish from './locales/pl/translation.json'

const cookie = new Cookies();

const getLanguage = cookie.get('language');

const changeLanguages = () => {
    let lang = getLanguage
    if ( !lang ) {
       return lang = "pl"
    }
    return lang
}


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
    pl: { 
        translation: translationPolish,
    },
}

i18next
.use(detector)
.use(initReactI18next)
.init({
  resources,
  lng: changeLanguages(), //default language
});

export default i18next;