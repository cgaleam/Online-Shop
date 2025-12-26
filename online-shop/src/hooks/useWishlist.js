import { useState } from 'react'

export function useWishlist() {
  const [wishlist, setWishlist] = useState([])

  const addToWishlist = (product) => {
    setWishlist(prevWishlist => {
      // Verificar si el producto ya existe en la wishlist
      const existingItem = prevWishlist.find(item => item.id === product.id)
      
      if (!existingItem) {
        // Si no existe, agregarlo
        return [...prevWishlist, product]
      }
      
      // Si ya existe, no hacer nada (o podrías mostrar un mensaje)
      return prevWishlist
    })
  }

  const removeFromWishlist = (productId) => {
    setWishlist(prevWishlist => 
      prevWishlist.filter(item => item.id !== productId)
    )
  }

  const toggleWishlist = (product) => {
    const isInWishlist = wishlist.some(item => item.id === product.id)
    
    if (isInWishlist) {
      removeFromWishlist(product.id)
    } else {
      addToWishlist(product)
    }
  }

  const clearWishlist = () => {
    setWishlist([])
  }

  const isInWishlist = (productId) => {
    return wishlist.some(item => item.id === productId)
  }

  const getTotalWishlistItems = () => {
    return wishlist.length
  }

  return {
    wishlist,
    addToWishlist,
    removeFromWishlist,
    toggleWishlist,
    clearWishlist,
    isInWishlist,
    getTotalWishlistItems
  }
}
