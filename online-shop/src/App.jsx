//Componente frontend para mostrar la lista de productos y la interación con ellos.
import {products as initialProducts} from "./mocks/products.json"
import { Products } from "./Components/Products.jsx"
import { useState } from "react"
import { Header } from "./Components/Header.jsx"
import { Cart } from "./Components/Cart.jsx"
import { ThemeToggle } from "./Components/ThemeToggle.jsx"
import { useTheme } from "./hooks/useTheme.js"
import { useCart } from "./hooks/useCart.js"


function useFilters (){   //hub que se encarga de los filtros
  //inicializo los filtros
  const[filters, setFilters] = useState({
    category: 'all',
    minPrice: 0
  })

  //funcion para filtrar los productos
  const filterProducts= (products) => {
    return products.filter(product => {
      return (product.price>= filters.minPrice && 
        (filters.category === 'all' || product.category === filters.category))
    })
  }

  return { filterProducts, setFilters}
}


function App() {

  //Hook para manejo de temas
  const { theme, toggleTheme } = useTheme()

  //Hook para manejo del carrito
  const { cart, addToCart, removeFromCart, clearCart, getTotalItems } = useCart()

  //Inicializo los productos
  const[products]= useState(initialProducts)

  const {filterProducts, setFilters} = useFilters()

  //aplico los filtros a los productos
  const filteredProducts= filterProducts(products)  

  //muestro los datos
  return (
    <>
    <ThemeToggle theme={theme} onToggle={toggleTheme} />
    <Header changeFilters={setFilters}/>
    <Cart 
      cart={cart}
      addToCart={addToCart}
      removeFromCart={removeFromCart}
      clearCart={clearCart}
      totalItems={getTotalItems()}
    />
    <Products 
      products={filteredProducts}
      addToCart={addToCart}
    />
    </>
  )
}

export default App
