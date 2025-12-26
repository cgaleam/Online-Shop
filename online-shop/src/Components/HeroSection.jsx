import './HeroSection.css'

export function HeroSection() {
  return (
    <section className="hero-section">
      <div className="hero-content">
        <div className="hero-text">
          <h1 className="hero-title">
            Descubre la
            <span className="hero-highlight"> mejor tecnología</span>
          </h1>
          <p className="hero-subtitle">
            Encuentra smartphones, laptops y más con la mejor calidad y precios increíbles
          </p>
          <div className="hero-stats">
            <div className="stat-item">
              <span className="stat-number">500+</span>
              <span className="stat-label">Productos</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">98%</span>
              <span className="stat-label">Satisfacción</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">24/7</span>
              <span className="stat-label">Soporte</span>
            </div>
          </div>
        </div>
        <div className="hero-visual">
          <div className="hero-card">
            <div className="card-icon">📱</div>
            <h3>Smartphones</h3>
            <p>Última tecnología</p>
          </div>
          <div className="hero-card">
            <div className="card-icon">💻</div>
            <h3>Laptops</h3>
            <p>Alto rendimiento</p>
          </div>
        </div>
      </div>
      <div className="hero-bg-elements">
        <div className="bg-circle bg-circle-1"></div>
        <div className="bg-circle bg-circle-2"></div>
        <div className="bg-circle bg-circle-3"></div>
      </div>
    </section>
  )
}
