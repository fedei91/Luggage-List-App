import i18next from "i18next";
import { initReactI18next } from "react-i18next";

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

i18next.use(initReactI18next)
.init({
  resources,
  lng:"en",
});

export default i18next;