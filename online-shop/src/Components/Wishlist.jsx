import { useEffect, useRef } from "react"
import './Wishlist.css'

// Icono de corazón para la wishlist
const HeartIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
  </svg>
)

// Icono para limpiar wishlist
const ClearWishlistIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="3,6 5,6 21,6"></polyline>
    <path d="m19,6v14a2,2 0 0,1-2,2H7a2,2 0 0,1-2-2V6m3,0V4a2,2 0 0,1,2-2h4a2,2 0 0,1,2,2v2"></path>
    <line x1="10" y1="11" x2="10" y2="17"></line>
    <line x1="14" y1="11" x2="14" y2="17"></line>
  </svg>
)

export function Wishlist({ 
  wishlist, 
  removeFromWishlist, 
  clearWishlist, 
  totalItems, 
  addToCart,
  isInCart,
  isOpen,
  onToggle,
  onClose
}) {
  const wishlistRef = useRef(null)
  const isEmpty = wishlist.length === 0

  const handleAddToCart = (product) => {
    addToCart(product)
  }

  const handleRemoveFromWishlist = (productId) => {
    removeFromWishlist(productId)
  }

  // Cerrar al hacer clic fuera de la wishlist
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wishlistRef.current && !wishlistRef.current.contains(event.target)) {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen, onClose])

  return (
    <>
      <button 
        className="wishlist-button"
        onClick={onToggle}
        aria-label="Abrir lista de deseos"
      >
        <HeartIcon />
        {totalItems > 0 && (
          <span className="wishlist-badge">{totalItems}</span>
        )}
      </button>

      <aside 
        ref={wishlistRef}
        className={`wishlist ${isOpen ? 'wishlist-open' : ''}`}
      >
        <h3>💖 Lista de Deseos</h3>
        
        {isEmpty ? (
          <div className="wishlist-empty">
            <p>Tu lista de deseos está vacía</p>
            <small>Haz clic en el ❤️ de los productos que te gusten</small>
          </div>
        ) : (
          <>
            <ul>
              {wishlist.map(item => (
                <li key={item.id}>
                  <img src={item.thumbnail} alt={item.title}/>
                  <div className="wishlist-item-info">
                    <strong>{item.title}</strong>
                    <small>${item.price}</small>
                    {item.brand && (
                      <span className="wishlist-brand">{item.brand}</span>
                    )}
                  </div>
                  <div className="wishlist-actions">
                    <button 
                      onClick={() => handleAddToCart(item)}
                      className="add-to-cart-btn"
                      title="Agregar al carrito"
                    >
                      🛒
                    </button>
                    <button 
                      onClick={() => handleRemoveFromWishlist(item.id)}
                      className="remove-wishlist-btn"
                      title="Quitar de la lista de deseos"
                    >
                      ❌
                    </button>
                  </div>
                </li>
              ))}
            </ul>

            <div className="wishlist-summary">
              <p><strong>{totalItems} producto{totalItems !== 1 ? 's' : ''} en tu lista</strong></p>
            </div>

            <button 
              className="clear-wishlist"
              onClick={clearWishlist}
            >
              <ClearWishlistIcon />
              Limpiar lista de deseos
            </button>
          </>
        )}
      </aside>
    </>
  )
}
