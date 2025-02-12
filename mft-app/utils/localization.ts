/**
 * Localization utilities for managing language preferences
 *
 * Handles saving and retrieving language settings using AsyncStorage
 * and updating i18n instance language.
 */
import AsyncStorage from "@react-native-async-storage/async-storage";
import { i18n } from "i18next";

/**
 * Sets and saves the application language
 * @param lang - Language code to set
 * @param i18n - i18next instance
 */
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

/**
 * Retrieves the saved language preference
 * @returns Promise resolving to saved language code or null
 */
export const getSavedLanguage = async (): Promise<string | null> => {
  try {
    const lang = await AsyncStorage.getItem("lang");
    return lang;
  } catch (e) {
    console.log(e);
    return null;
  }
};
