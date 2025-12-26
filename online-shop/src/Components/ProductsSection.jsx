import './ProductsSection.css'

export function ProductsSection({ children, searchTerm }) {
  const hasSearchResults = searchTerm && searchTerm.trim() !== ''
  
  return (
    <section className="products-section">
      <div className="products-header">
        <h2 className="products-title">
          {hasSearchResults 
            ? `Resultados para "${searchTerm}"` 
            : 'Nuestros productos destacados'
          }
        </h2>
        <p className="products-subtitle">
          {hasSearchResults 
            ? 'Encuentra exactamente lo que necesitas' 
            : 'Descubre la mejor tecnología al mejor precio'
          }
        </p>
      </div>
      <div className="products-container">
        {children}
      </div>
    </section>
  )
}
