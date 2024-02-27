import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import Backend from "i18next-localstorage-backend";

//Import all translation files
import English from "./i18n/en.json";
import Spanish from "./i18n/es.json";

const resources = {
    en: {
      translation: English,
    },
    es: {
      translation: Spanish,
    }
}

i18next
    .use(Backend)
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources,
        fallbackLng: "en",
        detection: {
            order: ["localStorage", "navigator"],
            caches: ["localStorage"],
        },
        backend: {
            
            loadPath: "/locales/{{lng}}/{{ns}}.json",
        }
    });

export default i18next;