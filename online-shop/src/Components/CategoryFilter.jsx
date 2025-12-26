import { useState, useRef, useEffect } from 'react'
import './CategoryFilter.css'

// Icono de flecha hacia abajo
const ChevronDownIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="6,9 12,15 18,9"></polyline>
  </svg>
)

// Icono de hamburger menu (3 líneas)
const MenuIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="3" y1="6" x2="21" y2="6"></line>
    <line x1="3" y1="12" x2="21" y2="12"></line>
    <line x1="3" y1="18" x2="21" y2="18"></line>
  </svg>
)

const categories = [
  { value: 'all', label: 'Todas las categorías' },
  { value: 'smartphones', label: 'Smartphones' },
  { value: 'laptops', label: 'Laptops' }
]

export function CategoryFilter({ selectedCategory = 'all', onChange }) {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef(null)

  const selectedCategoryData = categories.find(cat => cat.value === selectedCategory)

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

  const handleSelectCategory = (category) => {
    onChange(category.value)
    setIsOpen(false)
  }

  return (
    <div className="category-filter" ref={dropdownRef}>
      <button 
        className={`category-filter__trigger ${isOpen ? 'category-filter__trigger--open' : ''}`}
        onClick={handleToggle}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-label="Filtrar por categoría"
      >
        <MenuIcon />
      </button>

      <div className={`category-filter__dropdown ${isOpen ? 'category-filter__dropdown--open' : ''}`}>
        <ul className="category-filter__list" role="listbox">
          {categories.map((category) => (
            <li key={category.value}>
              <button
                className={`category-filter__option ${
                  category.value === selectedCategory ? 'category-filter__option--selected' : ''
                }`}
                onClick={() => handleSelectCategory(category)}
                role="option"
                aria-selected={category.value === selectedCategory}
              >
                <span className="category-filter__option-emoji">{category.emoji}</span>
                <span className="category-filter__option-text">{category.label}</span>
                {category.value === selectedCategory && (
                  <span className="category-filter__check">✓</span>
                )}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
