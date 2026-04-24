import { useTranslation } from '../hooks/useTranslation';
import { Navbar } from '../components/Navbar';
import './Landing.css';

export const Landing = ({ onStartClick }) => {
  const { t } = useTranslation();

  const features = [
    {
      title: 'Búsqueda Avanzada',
      description: 'Encuentra exactamente lo que necesitas con filtros y búsqueda en tiempo real'
    },
    {
      title: 'Filtro por Rareza',
      description: 'Organiza los loot por rareza: Común, Poco Común, Raro y Legendario'
    },
    {
      title: 'Probabilidades',
      description: 'Consulta el porcentaje de obtención de cada ítem en sus diferentes fuentes'
    },
    {
      title: 'Multiidioma',
      description: 'Disponible en Español e Inglés con cambio instantáneo'
    },
    {
      title: 'Datos en Vivo',
      description: 'Información actualizada directamente de la API oficial de Warframe'
    },
    {
      title: 'Responsive',
      description: 'Funciona perfectamente en cualquier dispositivo'
    },
  ];

  return (
    <div className="landing-page">
      <Navbar />

      {/* Hero Section */}
      <section className="hero-section">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,_rgba(56,189,248,0.25),transparent_40%),radial-gradient(circle_at_70%_80%,_rgba(34,197,94,0.15),transparent_40%)]" />
        
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="hero-title">Warframe Loot</h1>
            <p className="hero-subtitle">Tu guía definitiva de loots y recompensas en Warframe</p>
            <p className="hero-description">
              Descubre todas las recompensas disponibles en Warframe, consulta probabilidades y encuentra exactamente lo que buscas con nuestro catálogo completo y actualizado.
            </p>
            <button onClick={onStartClick} className="hero-button">
              Explorar Catálogo
              <span className="arrow">→</span>
            </button>
          </div>

          <div className="hero-stats">
            <div className="stat-item">
              <span className="stat-number">1000+</span>
              <span className="stat-label">Ítems</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">50+</span>
              <span className="stat-label">Fuentes</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">100%</span>
              <span className="stat-label">Actualizado</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="features-container">
          <h2 className="section-title">Características Principales</h2>
          <div className="features-grid">
            {features.map((feature, index) => (
              <div key={index} className="feature-card">
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-description">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-content">
          <h2>¿Listo para explorar?</h2>
          <p>Encuentra los loots que buscas y optimiza tu experiencia en Warframe</p>
          <button onClick={onStartClick} className="cta-button">
            Ir al Catálogo
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="landing-footer">
        <p>&copy; Warframe Loot. Datos de <a href="https://warframestat.us/" target="_blank" rel="noopener noreferrer">warframestat.us</a></p>
        <p>Warframe es una marca registrada de Digital Extremes</p>
      </footer>
    </div>
  );
};
