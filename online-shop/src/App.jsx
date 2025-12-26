//Componente frontend para mostrar la lista de productos y la interación con ellos.
import {products as initialProducts} from "./mocks/products.json"
import { Products } from "./Components/Products.jsx"
import { useState, useMemo } from "react"
import { Header } from "./Components/Header.jsx"
import { Cart } from "./Components/Cart.jsx"
import { ThemeToggle } from "./Components/ThemeToggle.jsx"
import { CompactSearchBox } from "./Components/CompactSearchBox.jsx"
import { useTheme } from "./hooks/useTheme.js"
import { useCart } from "./hooks/useCart.js"
import { useSearch } from "./hooks/useSearch.js"


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

  //Hook para manejo del buscador
  const { searchTerm, setSearchTerm, searchProducts, getSuggestions, clearSearch } = useSearch()

  //Inicializo los productos
  const[products]= useState(initialProducts)

  const {filterProducts, setFilters} = useFilters()

  //Combinar filtros y búsqueda
  const processedProducts = useMemo(() => {
    // Primero aplicar filtros
    let filtered = filterProducts(products)
    
    // Luego aplicar búsqueda
    if (searchTerm.trim()) {
      filtered = searchProducts(filtered, searchTerm)
    }
    
    return filtered
  }, [products, filterProducts, searchProducts, searchTerm])

  //Obtener sugerencias de búsqueda
  const searchSuggestions = useMemo(() => {
    return getSuggestions(products, searchTerm)
  }, [products, searchTerm, getSuggestions])

  //Handlers para la búsqueda
  const handleSearchChange = (term) => {
    setSearchTerm(term)
  }

  const handleSuggestionClick = (suggestion) => {
    setSearchTerm(suggestion)
  }

  const handleClearSearch = () => {
    clearSearch()
  }

  //muestro los datos
  return (
    <>
    <ThemeToggle theme={theme} onToggle={toggleTheme} />
    <CompactSearchBox 
      searchTerm={searchTerm}
      onSearchChange={handleSearchChange}
      suggestions={searchSuggestions}
      onSuggestionClick={handleSuggestionClick}
      onClear={handleClearSearch}
      placeholder="Buscar..."
    />
    <Header changeFilters={setFilters} />
    <Cart 
      cart={cart}
      addToCart={addToCart}
      removeFromCart={removeFromCart}
      clearCart={clearCart}
      totalItems={getTotalItems()}
    />
    <Products 
      products={processedProducts}
      addToCart={addToCart}
      searchTerm={searchTerm}
    />
    </>
  )
}

export default App
