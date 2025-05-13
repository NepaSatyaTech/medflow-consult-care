
import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'en' | 'ne' | 'hi';

type TranslationsType = {
  [key: string]: {
    [lang in Language]: string;
  };
};

// Add translations for common UI elements
const translations: TranslationsType = {
  "home": {
    en: "Home",
    ne: "गृहपृष्ठ",
    hi: "होम"
  },
  "medicines": {
    en: "Medicines",
    ne: "औषधिहरू",
    hi: "दवाइयां"
  },
  "bookAppointment": {
    en: "Book Appointment",
    ne: "अपोइन्टमेन्ट बुक गर्नुहोस्",
    hi: "अपॉइंटमेंट बुक करें"
  },
  "contact": {
    en: "Contact",
    ne: "सम्पर्क",
    hi: "संपर्क"
  },
  "login": {
    en: "Login / Register",
    ne: "लगइन / दर्ता",
    hi: "लॉगिन / रजिस्टर"
  },
  "yourHealth": {
    en: "Your Health, Our Priority",
    ne: "तपाईंको स्वास्थ्य, हाम्रो प्राथमिकता",
    hi: "आपका स्वास्थ्य, हमारी प्राथमिकता"
  },
  "browseMedicines": {
    en: "Browse Medicines",
    ne: "औषधिहरू हेर्नुहोस्",
    hi: "दवाइयां ब्राउज़ करें"
  },
  "featuredMedicines": {
    en: "Featured Medicines",
    ne: "विशेष औषधिहरू",
    hi: "विशेष दवाइयां"
  },
  "viewAllMedicines": {
    en: "View All Medicines",
    ne: "सबै औषधिहरू हेर्नुहोस्",
    hi: "सभी दवाइयां देखें"
  },
  "readyToTake": {
    en: "Ready to Take Control of Your Health?",
    ne: "तपाईंको स्वास्थ्यको नियन्त्रण लिन तयार हुनुहुन्छ?",
    hi: "अपने स्वास्थ्य का नियंत्रण लेने के लिए तैयार हैं?"
  },
  "keyServices": {
    en: "Our Key Services",
    ne: "हाम्रा प्रमुख सेवाहरू",
    hi: "हमारी प्रमुख सेवाएं"
  },
  "medicineCategories": {
    en: "Medicine Categories",
    ne: "औषधि वर्गहरू",
    hi: "दवा श्रेणियाँ"
  }
};

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(() => {
    const savedLanguage = localStorage.getItem('language') as Language;
    return savedLanguage || 'en';
  });

  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  const t = (key: string): string => {
    if (translations[key] && translations[key][language]) {
      return translations[key][language];
    }
    return key; // Return the key itself if translation not found
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
