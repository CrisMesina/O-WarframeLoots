import { useTranslation } from '../hooks/useTranslation';

export const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const handleLanguageChange = (e) => {
    const lang = e.target.value;
    i18n.changeLanguage(lang);
    localStorage.setItem('language', lang); // Guardar preferencia
  };

  const languages = [
    { code: 'es', name: '🇪🇸 Español', label: 'Español' },
    { code: 'en', name: '🇬🇧 English', label: 'English' }
  ];

  return (
    <div className="language-switcher">
      <select
        value={i18n.language}
        onChange={handleLanguageChange}
        className="px-4 py-2 rounded-lg border border-cyan-500/30 bg-white/10 text-white font-medium hover:border-cyan-500/50 hover:bg-white/20 transition-all cursor-pointer backdrop-blur-sm focus:outline-none focus:border-cyan-500"
      >
        {languages.map((lang) => (
          <option key={lang.code} value={lang.code} className="bg-slate-900">
            {lang.name}
          </option>
        ))}
      </select>
    </div>
  );
};
