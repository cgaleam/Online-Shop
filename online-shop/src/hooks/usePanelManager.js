import { useState, useEffect } from 'react'

// Hook para manejar la apertura y cierre de paneles (carrito y wishlist)
export function usePanelManager() {
  const [openPanel, setOpenPanel] = useState(null) // 'cart', 'wishlist', null

  const openCart = () => {
    setOpenPanel(openPanel === 'cart' ? null : 'cart')
  }

  const openWishlist = () => {
    setOpenPanel(openPanel === 'wishlist' ? null : 'wishlist')
  }

  const closeAllPanels = () => {
    setOpenPanel(null)
  }

  const isCartOpen = openPanel === 'cart'
  const isWishlistOpen = openPanel === 'wishlist'

  // Cerrar paneles con la tecla Escape
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === 'Escape' && openPanel) {
        closeAllPanels()
      }
    }

    document.addEventListener('keydown', handleEscape)
    return () => {
      document.removeEventListener('keydown', handleEscape)
    }
  }, [openPanel])

  return {
    openPanel,
    openCart,
    openWishlist,
    closeAllPanels,
    isCartOpen,
    isWishlistOpen
  }
}
