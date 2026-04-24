import { useTranslation } from '../hooks/useTranslation';
import './LanguageSwitcher.css';

export const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const handleLanguageChange = (lang) => {
    i18n.changeLanguage(lang);
    localStorage.setItem('language', lang); // Guardar preferencia
  };

  return (
    <div className="language-switcher-container">
      <div className="language-slider">
        <button
          onClick={() => handleLanguageChange('es')}
          className={`language-btn language-btn-es ${i18n.language === 'es' ? 'active' : ''}`}
        >
          <span className="label">Español</span>
        </button>
        
        <div className="slider-toggle" style={{
          transform: i18n.language === 'en' ? 'translateX(108px)' : 'translateX(0)'
        }}></div>
        
        <button
          onClick={() => handleLanguageChange('en')}
          className={`language-btn language-btn-en ${i18n.language === 'en' ? 'active' : ''}`}
        >
          <span className="label">English</span>
        </button>
      </div>
    </div>
  );
};
