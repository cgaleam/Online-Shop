import "./Cart.css"
import { useEffect, useRef } from "react"
import { CartIcon, ClearCartIcon} from "./Icons.jsx"


export function Cart({ 
  cart, 
  addToCart, 
  removeFromCart, 
  clearCart, 
  totalItems, 
  isOpen, 
  onToggle, 
  onClose 
}) {
    const cartRef = useRef(null)
    const isEmpty = cart.length === 0

    const getTotalPrice = () => {
        return cart.reduce((total, item) => total + (item.price * item.quantity), 0)
    }

    // Cerrar al hacer clic fuera del carrito
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (cartRef.current && !cartRef.current.contains(event.target)) {
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
                className="cart-button"
                onClick={onToggle}
                aria-label="Abrir carrito"
            >
                <CartIcon />
                {totalItems > 0 && (
                    <span className="cart-badge">{totalItems}</span>
                )}
            </button>

            <aside 
                ref={cartRef}
                className={`cart ${isOpen ? 'cart-open' : ''}`}
            >
                <h3>🛒 Carrito</h3>
                
                {isEmpty ? (
                    <div className="cart-empty">
                        <p>Tu carrito está vacío</p>
                    </div>
                ) : (
                    <>
                        <ul>
                            {cart.map(item => (
                                <li key={item.id}>
                                    <img src={item.thumbnail} alt={item.title}/>
                                    <div className="item-info">
                                        <strong>{item.title}</strong>
                                        <small>${item.price}</small>
                                    </div>
                                    <footer>
                                        <small>Qty: {item.quantity}</small>
                                        <button 
                                            onClick={() => addToCart(item)}
                                            title="Aumentar cantidad"
                                        >
                                            +
                                        </button>
                                        <button 
                                            onClick={() => removeFromCart(item.id)}
                                            title="Disminuir cantidad"
                                        >
                                            -
                                        </button>
                                    </footer>
                                </li>
                            ))}
                        </ul>

                        <div className="cart-total">
                            <strong>Total: ${getTotalPrice().toFixed(2)}</strong>
                        </div>

                        <button 
                            className="clear-cart"
                            onClick={clearCart}
                        >
                            <ClearCartIcon />
                            Vaciar carrito
                        </button>
                    </>
                )}
            </aside>
        </>
    )
}