import './Products.css'
import { AddToCartIcon } from './Icons'

export const Products = ({products, addToCart}) => {
    
    const handleAddToCart = (product) => {
        addToCart(product)
    }

    return ( 
        <main className="products">
            <ul>
                {
                    products.slice(0, 10).map(product => (
                        <li key={product.id}>
                            <img src={product.thumbnail} alt={product.title}/>
                            <div>
                                <strong>{product.title}</strong> - ${product.price}
                            </div>
                            <div>
                                <button 
                                    onClick={() => handleAddToCart(product)}
                                    title={`Agregar ${product.title} al carrito`}
                                >
                                    <AddToCartIcon/>
                                </button>
                            </div>
                        </li>
                    )) 
                }
            </ul>
        </main>
    )
}