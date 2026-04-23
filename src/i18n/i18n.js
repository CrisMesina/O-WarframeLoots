import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Importar los recursos de traducción
import en from './locales/en.json';
import es from './locales/es.json';

// Configuración de i18next
i18n
  .use(initReactI18next) // Pasar i18n al hook de React
  .init({
    resources: {
      en: { translation: en },
      es: { translation: es },
    },
    lng: localStorage.getItem('language') || 'es', // Idioma por defecto (guardado en localStorage)
    fallbackLng: 'es', // Idioma de respaldo
    interpolation: {
      escapeValue: false, // React ya protege contra XSS
    },
  });

export default i18n;
