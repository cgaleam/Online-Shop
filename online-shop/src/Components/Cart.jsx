import "./Cart.css"
import { useId } from "react"
import { CartIcon, ClearCartIcon} from "./Icons.jsx"


export function Cart({ cart, addToCart, removeFromCart, clearCart, totalItems }) {
    const cartCheckboxId = useId()   

    const isEmpty = cart.length === 0

    const getTotalPrice = () => {
        return cart.reduce((total, item) => total + (item.price * item.quantity), 0)
    }

    return (
        <>
            <label className="cart-button" htmlFor={cartCheckboxId}>
                <CartIcon />
                {totalItems > 0 && (
                    <span className="cart-badge">{totalItems}</span>
                )}
            </label>
            <input id={cartCheckboxId} type="checkbox" hidden/>

            <aside className='cart'>
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