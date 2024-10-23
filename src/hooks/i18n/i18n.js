import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import Backend from "i18next-http-backend";

i18n
  .use(Backend)
  .use(initReactI18next)
  .init({
    backend: {
      loadPath: "/locales/{{lng}}/{{ns}}.json",
    },
    fallbackLng: "ch",
    // 預設語言
    lng: sessionStorage.getItem('local') || "ch",
    interpolation: {
      escapeValue: false,
    },
  });

// i18n範例
// const { t, i18n } = useTranslation();
// i18n.changeLanguage('en');
//     sessionStorage.setItem('local','en')
// <div className={'bg-white'}> {t('becomeHost')}</div>


export default i18n;
