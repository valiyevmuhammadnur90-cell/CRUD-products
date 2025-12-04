import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  uz: {
    translation: {
      "Home Page": "Websitemizga xush kelibsiz!",
      "About Page": "Bizning websitemiz haqida ma'lumotlar",
    },
  },
  ru: {
    translation: {
      "Home Page": "Добро пожаловать на наш сайт!",
      "About Page": "Информации o нашем сайте",
    },
  },
  en: {
    translation: {
      "Home Page": "Welcome to our website!",
      "About Page": "Informations about our website",
    },
  },
  ko: {
    translation: {
      "Home Page": "저희 웹사이트에 오신 것을 환영합니다!",
      "About Page": "당사 웹사이트에 대한 정보!",
    },
  },
  fr: {
    translation: {
      "Home Page": "Bienvenue sur notre site web!",
      "About Page": "Renseignements sur notre site web!",
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "uz",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
