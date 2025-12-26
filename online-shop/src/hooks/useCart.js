import { useState } from 'react'

export function useCart() {
  const [cart, setCart] = useState([])

  const addToCart = (product) => {
    setCart(prevCart => {
      // Verificar si el producto ya existe en el carrito
      const existingItem = prevCart.find(item => item.id === product.id)
      
      if (existingItem) {
        // Si existe, incrementar la cantidad
        return prevCart.map(item =>
          item.id === product.id 
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      } else {
        // Si no existe, agregarlo con cantidad 1
        return [...prevCart, { ...product, quantity: 1 }]
      }
    })
  }

  const removeFromCart = (productId) => {
    setCart(prevCart => {
      return prevCart.reduce((acc, item) => {
        if (item.id === productId) {
          if (item.quantity > 1) {
            // Si la cantidad es mayor a 1, decrementar
            acc.push({ ...item, quantity: item.quantity - 1 })
          }
          // Si la cantidad es 1, no agregarlo al array (lo elimina)
        } else {
          acc.push(item)
        }
        return acc
      }, [])
    })
  }

  const clearCart = () => {
    setCart([])
  }

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0)
  }

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0)
  }

  const isInCart = (productId) => {
    return cart.some(item => item.id === productId)
  }

  const getItemQuantity = (productId) => {
    const item = cart.find(item => item.id === productId)
    return item ? item.quantity : 0
  }

  return {
    cart,
    addToCart,
    removeFromCart,
    clearCart,
    getTotalItems,
    getTotalPrice,
    isInCart,
    getItemQuantity
  }
}
