import { useTranslation as useTranslationI18n } from 'react-i18next';

/**
 * Hook personalizado para acceder a las traducciones
 * Proporciona: t() para obtener traducciones, i18n para cambiar idioma
 * 
 * Uso:
 * const { t, i18n } = useTranslation();
 * console.log(t('title')); // Imprime el título traducido
 */
export const useTranslation = () => {
  return useTranslationI18n();
};
