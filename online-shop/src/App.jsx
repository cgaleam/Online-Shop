//Componente frontend para mostrar la lista de productos y la interación con ellos.
import {products as initialProducts} from "./mocks/products.json"
import { Products } from "./Components/Products.jsx"
import { useState, useMemo } from "react"
import { Header } from "./Components/Header.jsx"
import { HeroSection } from "./Components/HeroSection.jsx"
import { ProductsSection } from "./Components/ProductsSection.jsx"
import { Cart } from "./Components/Cart.jsx"
import { Wishlist } from "./Components/Wishlist.jsx"
import { ThemeToggle } from "./Components/ThemeToggle.jsx"
import { CompactSearchBox } from "./Components/CompactSearchBox.jsx"
import { CategoryFilter } from "./Components/CategoryFilter.jsx"
import { useTheme } from "./hooks/useTheme.js"
import { useCart } from "./hooks/useCart.js"
import { useWishlist } from "./hooks/useWishlist.js"
import { useSearch } from "./hooks/useSearch.js"
import { usePanelManager } from "./hooks/usePanelManager.js"


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

  //función para cambiar solo la categoría
  const setCategory = (category) => {
    setFilters(prev => ({ ...prev, category }))
  }

  //función para cambiar otros filtros (precio)
  const setOtherFilters = (newFilters) => {
    setFilters(newFilters)
  }

  return { filterProducts, setFilters: setOtherFilters, setCategory, currentCategory: filters.category}
}


function App() {

  //Hook para manejo de temas
  const { theme, toggleTheme } = useTheme()

  //Hook para manejo del carrito
  const { cart, addToCart, removeFromCart, clearCart, getTotalItems } = useCart()

  //Hook para manejo de la wishlist
  const { 
    wishlist, 
    toggleWishlist, 
    removeFromWishlist, 
    clearWishlist, 
    isInWishlist, 
    getTotalWishlistItems 
  } = useWishlist()

  //Hook para manejo del buscador
  const { searchTerm, setSearchTerm, searchProducts, getSuggestions, clearSearch } = useSearch()

  //Hook para manejo de paneles (carrito y wishlist)
  const {
    openCart,
    openWishlist,
    closeAllPanels,
    isCartOpen,
    isWishlistOpen
  } = usePanelManager()

  //Inicializo los productos
  const[products]= useState(initialProducts)

  const {filterProducts, setFilters, setCategory, currentCategory} = useFilters()

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

  //Función para verificar si un producto está en el carrito
  const isProductInCart = (productId) => {
    return cart.some(item => item.id === productId)
  }

  //muestro los datos
  return (
    <>
    <ThemeToggle theme={theme} onToggle={toggleTheme} />
    <CategoryFilter 
      selectedCategory={currentCategory}
      onChange={setCategory}
    />
    <CompactSearchBox 
      searchTerm={searchTerm}
      onSearchChange={handleSearchChange}
      suggestions={searchSuggestions}
      onSuggestionClick={handleSuggestionClick}
      onClear={handleClearSearch}
      placeholder="Buscar..."
    />
    <Wishlist 
      wishlist={wishlist}
      removeFromWishlist={removeFromWishlist}
      clearWishlist={clearWishlist}
      totalItems={getTotalWishlistItems()}
      addToCart={addToCart}
      isInCart={isProductInCart}
      isOpen={isWishlistOpen}
      onToggle={openWishlist}
      onClose={closeAllPanels}
    />
    <Header changeFilters={setFilters} />
    <HeroSection />
    <Cart 
      cart={cart}
      addToCart={addToCart}
      removeFromCart={removeFromCart}
      clearCart={clearCart}
      totalItems={getTotalItems()}
      isOpen={isCartOpen}
      onToggle={openCart}
      onClose={closeAllPanels}
    />
    <ProductsSection searchTerm={searchTerm}>
      <Products 
        products={processedProducts}
        addToCart={addToCart}
        searchTerm={searchTerm}
        toggleWishlist={toggleWishlist}
        isInWishlist={isInWishlist}
      />
    </ProductsSection>
    </>
  )
}

export default App
