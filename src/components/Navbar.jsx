import { useTranslation } from '../hooks/useTranslation';
import { LanguageSwitcher } from './LanguageSwitcher';
import './Navbar.css';

export const Navbar = ({ onLogoClick }) => {
  const { t } = useTranslation();

  const navLinks = [
    { label: 'Home', url: '#' },
    { label: 'Wiki', url: 'https://warframe.fandom.com/wiki/Warframe_Wiki' },
    { label: 'Community', url: 'https://www.reddit.com/r/Warframe/' },
    { label: 'Discord', url: 'https://discord.com/invite/warframe' },
    { label: 'Official', url: 'https://www.warframe.com/' },
  ];

  const handleLogoClick = () => {
    if (onLogoClick) {
      onLogoClick();
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-brand" onClick={handleLogoClick} style={{ cursor: onLogoClick ? 'pointer' : 'default' }}>
          <span className="brand-name">Warframe Loot</span>
        </div>
        
        <ul className="nav-menu">
          {navLinks.map((link) => (
            <li key={link.label} className="nav-item">
              <a href={link.url} target="_blank" rel="noopener noreferrer" className="nav-link">
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        { 
        /* 
        <div className="navbar-lang-switcher">
          <LanguageSwitcher />
        </div> 
        */  
        }
      </div>
    </nav>
  );
};
