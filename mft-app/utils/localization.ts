import AsyncStorage from "@react-native-async-storage/async-storage";
import { i18n } from "i18next";

export const setLanguage = async (lang: string, i18n: i18n) => {
  try {
    await AsyncStorage.setItem("lang", lang);
    if (i18n.language != lang) {
      i18n.changeLanguage(lang);
    }
  } catch (e) {
    console.log(e);
  }
};

export const getSavedLanguage = async (): Promise<string | null> => {
  try {
    const lang = await AsyncStorage.getItem("lang");
    return lang;
  } catch (e) {
    console.log(e);
    return null;
  }
};
