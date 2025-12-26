import { useState, useMemo } from 'react'

export function useSearch() {
  const [searchTerm, setSearchTerm] = useState('')

  // Función para buscar productos
  const searchProducts = (products, term) => {
    if (!term.trim()) {
      return products
    }

    const searchTermLower = term.toLowerCase().trim()
    
    return products.filter(product => {
      // Buscar en múltiples campos
      const titleMatch = product.title.toLowerCase().includes(searchTermLower)
      const descriptionMatch = product.description?.toLowerCase().includes(searchTermLower)
      const brandMatch = product.brand?.toLowerCase().includes(searchTermLower)
      const categoryMatch = product.category?.toLowerCase().includes(searchTermLower)
      
      return titleMatch || descriptionMatch || brandMatch || categoryMatch
    })
  }

  // Función para obtener sugerencias de búsqueda
  const getSuggestions = (products, term) => {
    if (!term.trim() || term.length < 2) {
      return []
    }

    const searchTermLower = term.toLowerCase().trim()
    const suggestions = new Set()

    products.forEach(product => {
      // Agregar títulos que coincidan
      if (product.title.toLowerCase().includes(searchTermLower)) {
        suggestions.add(product.title)
      }
      
      // Agregar marcas que coincidan
      if (product.brand?.toLowerCase().includes(searchTermLower)) {
        suggestions.add(product.brand)
      }
      
      // Agregar categorías que coincidan
      if (product.category?.toLowerCase().includes(searchTermLower)) {
        suggestions.add(product.category)
      }
    })

    return Array.from(suggestions).slice(0, 5) // Limitar a 5 sugerencias
  }

  const clearSearch = () => {
    setSearchTerm('')
  }

  return {
    searchTerm,
    setSearchTerm,
    searchProducts,
    getSuggestions,
    clearSearch
  }
}
