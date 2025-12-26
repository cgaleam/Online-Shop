import { useState, useRef, useEffect } from 'react'
import './PriceFilter.css'

// Icono de precio/dinero
const PriceIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="12" y1="1" x2="12" y2="23"></line>
    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
  </svg>
)

// Icono de flecha hacia abajo
const ChevronDownIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="6,9 12,15 18,9"></polyline>
  </svg>
)

export function PriceFilter({ onChange }) {
  const [isOpen, setIsOpen] = useState(false)
  const [minPrice, setMinPrice] = useState(0)
  const dropdownRef = useRef(null)

  // Cerrar al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  // Cerrar con Escape
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === 'Escape' && isOpen) {
        setIsOpen(false)
      }
    }

    document.addEventListener('keydown', handleEscape)
    return () => {
      document.removeEventListener('keydown', handleEscape)
    }
  }, [isOpen])

  const handleToggle = () => {
    setIsOpen(!isOpen)
  }

  const handlePriceChange = (event) => {
    const newPrice = event.target.value
    setMinPrice(newPrice)
    onChange(prevState => ({...prevState, minPrice: newPrice}))
  }

  const resetPrice = () => {
    setMinPrice(0)
    onChange(prevState => ({...prevState, minPrice: 0}))
  }

  return (
    <div className="price-filter" ref={dropdownRef}>
      <button 
        className={`price-filter__trigger ${isOpen ? 'price-filter__trigger--open' : ''}`}
        onClick={handleToggle}
        aria-expanded={isOpen}
        aria-haspopup="true"
        aria-label="Filtrar por precio"
      >
        <PriceIcon />
        <span className="price-filter__text">
          {minPrice > 0 ? `$${minPrice}+` : 'Precio'}
        </span>
        <ChevronDownIcon />
      </button>

      <div className={`price-filter__dropdown ${isOpen ? 'price-filter__dropdown--open' : ''}`}>
        <div className="price-filter__content">
          <h4 className="price-filter__title">Precio mínimo</h4>
          
          <div className="price-filter__range">
            <input 
              type="range" 
              id="price-range" 
              min="0" 
              max="1000" 
              step="10" 
              value={minPrice}
              onChange={handlePriceChange}
              className="price-filter__slider"
            />
            <div className="price-filter__value">${minPrice}</div>
          </div>
          
          <div className="price-filter__actions">
            <button 
              onClick={resetPrice}
              className="price-filter__reset"
              type="button"
            >
              Limpiar
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
