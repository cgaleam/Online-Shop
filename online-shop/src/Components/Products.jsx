import './Products.css'
import { AddToCartIcon } from './Icons'

// Icono de corazón
const HeartIcon = ({ filled = false }) => (
  <svg 
    width="20" 
    height="20" 
    viewBox="0 0 24 24" 
    fill={filled ? "currentColor" : "none"} 
    stroke="currentColor" 
    strokeWidth="2"
  >
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
  </svg>
)

export const Products = ({
  products, 
  addToCart, 
  searchTerm, 
  toggleWishlist, 
  isInWishlist
}) => {
    
    const handleAddToCart = (product) => {
        addToCart(product)
    }

    const handleToggleWishlist = (product) => {
        toggleWishlist(product)
    }

    // Función para resaltar el texto de búsqueda
    const highlightSearchTerm = (text, searchTerm) => {
        if (!searchTerm || !text) return text
        
        const regex = new RegExp(`(${searchTerm})`, 'gi')
        const parts = text.split(regex)
        
        return parts.map((part, index) => 
            regex.test(part) ? 
                <mark key={index} className="highlight">{part}</mark> : 
                part
        )
    }

    const hasResults = products.length > 0
    const isSearching = searchTerm && searchTerm.trim().length > 0

    return ( 
        <main className="products">
            {isSearching && (
                <div className="search-info">
                    <p>
                        {hasResults 
                            ? `${products.length} producto${products.length !== 1 ? 's' : ''} encontrado${products.length !== 1 ? 's' : ''} para "${searchTerm}"`
                            : `No se encontraron productos para "${searchTerm}"`
                        }
                    </p>
                </div>
            )}
            
            {!hasResults && isSearching && (
                <div className="no-results">
                    <h3>🔍 No se encontraron productos</h3>
                    <p>Intenta con:</p>
                    <ul>
                        <li>Palabras más cortas o generales</li>
                        <li>Verificar la ortografía</li>
                        <li>Buscar por marca o categoría</li>
                    </ul>
                </div>
            )}

            {hasResults && (
                <ul>
                    {
                        products.slice(0, 10).map(product => (
                            <li key={product.id}>
                                <img src={product.thumbnail} alt={product.title}/>
                                <div>
                                    <strong>
                                        {highlightSearchTerm(product.title, searchTerm)}
                                    </strong> - ${product.price}
                                    {product.brand && (
                                        <small className="product-brand">
                                            {highlightSearchTerm(product.brand, searchTerm)}
                                        </small>
                                    )}
                                </div>
                                <div className="product-actions">
                                    <button 
                                        onClick={() => handleToggleWishlist(product)}
                                        className={`wishlist-toggle ${isInWishlist(product.id) ? 'in-wishlist' : ''}`}
                                        title={isInWishlist(product.id) ? 'Quitar de lista de deseos' : 'Agregar a lista de deseos'}
                                    >
                                        <HeartIcon filled={isInWishlist(product.id)} />
                                    </button>
                                    <button 
                                        onClick={() => handleAddToCart(product)}
                                        className="add-to-cart"
                                        title={`Agregar ${product.title} al carrito`}
                                    >
                                        <AddToCartIcon/>
                                    </button>
                                </div>
                            </li>
                        )) 
                    }
                </ul>
            )}
        </main>
    )
}