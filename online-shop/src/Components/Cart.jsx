import "./Cart.css"
import { useId } from "react"
import { CartIcon, ClearCartIcon} from "./Icons.jsx"


export function Cart() {
    const cartCheckboxId= useId()   

    return (
        <>
            <label className="cart-button" htmlFor={cartCheckboxId}>
                <CartIcon />
            </label>
            <input id={cartCheckboxId} type="checkbox" hidden/>

            <aside className='cart'>
                <ul>
                    <li>
                    <img src="https://via.placeholder.com/150" alt="product"/>
                    <div>
                        <strong>Product Name</strong>
                        <small>$ 5.00</small>
                    </div>
                    <footer>
                        <small>Qt=1</small>
                        <button>+</button>
                    </footer>
                    </li>
                </ul>

                <button>
                <ClearCartIcon />
                </button>
            </aside>
      
    </>
    )
}