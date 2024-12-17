import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import { getLocales } from "expo-localization";

import fi from "@/lcales/fi.json";
import en from "@/lcales/en.json";

const resources = {
  fi: { translation: fi },
  en: { translation: en },
};

i18next.use(initReactI18next).init({
  resources,
  lng: getLocales()[0].languageCode === "fi" ? "fi" : "en",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18next;
