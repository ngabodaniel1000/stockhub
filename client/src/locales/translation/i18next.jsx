import { initReactI18next } from "react-i18next";
import i18n from "i18next";
import English from "../en/translation.json";
import Kiswahili from "../ksw/translation.json";
import Kinyarwanda from "../kny/translation.json";
import French from "../fr/translation.json";

// Initialize with default language
const initializeI18n = async () => {
  try {
    // First create the instance with default language
    await i18n.use(initReactI18next).init({
      resources: {
        en: { translation: English },
        fr: { translation: French },
        ksw: { translation: Kiswahili },
        kny: { translation: Kinyarwanda },
      },
      lng: "en", // Default language
      fallbackLng: "en",
      interpolation: {
        escapeValue: false
      }
    });

    // Then fetch user settings and update language if needed
    const response = await fetch('http://localhost:8889/api/settings', {
      credentials: 'include'
    });
    
    if (response.ok) {
      const settings = await response.json();
      if (settings.success && settings.settings.language) {
        i18n.changeLanguage(settings.settings.language);
      }
    }
  } catch (error) {
    console.error("Failed to initialize i18n:", error);
  }
};

initializeI18n();

export default i18n;