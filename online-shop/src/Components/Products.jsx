import './Products.css'
import { AddToCartIcon } from './Icons'

export const Products = ({products, addToCart, searchTerm}) => {
    
    const handleAddToCart = (product) => {
        addToCart(product)
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
            )}
        </main>
    )
}