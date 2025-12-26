import { useState, useRef, useEffect } from 'react'
import './CompactSearchBox.css'

// Icono de búsqueda más pequeño
const SearchIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="11" cy="11" r="8"></circle>
    <path d="M21 21l-4.35-4.35"></path>
  </svg>
)

// Icono de limpiar más pequeño
const ClearIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
)

export function CompactSearchBox({ 
  searchTerm, 
  onSearchChange, 
  suggestions = [], 
  onSuggestionClick,
  onClear,
  placeholder = "Buscar..." 
}) {
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(-1)
  const [isExpanded, setIsExpanded] = useState(false)
  const inputRef = useRef(null)
  const containerRef = useRef(null)

  // Manejar teclas de navegación
  const handleKeyDown = (e) => {
    if (!showSuggestions || suggestions.length === 0) {
      if (e.key === 'Escape') {
        handleCollapse()
      }
      return
    }

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault()
        setSelectedIndex(prev => 
          prev < suggestions.length - 1 ? prev + 1 : prev
        )
        break
      case 'ArrowUp':
        e.preventDefault()
        setSelectedIndex(prev => prev > 0 ? prev - 1 : -1)
        break
      case 'Enter':
        e.preventDefault()
        if (selectedIndex >= 0) {
          handleSuggestionClick(suggestions[selectedIndex])
        }
        break
      case 'Escape':
        handleCollapse()
        break
    }
  }

  const handleInputChange = (e) => {
    const value = e.target.value
    onSearchChange(value)
    setShowSuggestions(value.length > 0 && suggestions.length > 0)
    setSelectedIndex(-1)
  }

  const handleSuggestionClick = (suggestion) => {
    onSuggestionClick(suggestion)
    setShowSuggestions(false)
    setSelectedIndex(-1)
    inputRef.current?.focus()
  }

  const handleClear = () => {
    onClear()
    setShowSuggestions(false)
    setSelectedIndex(-1)
    inputRef.current?.focus()
  }

  const handleExpand = () => {
    setIsExpanded(true)
    setTimeout(() => {
      inputRef.current?.focus()
    }, 200)
  }

  const handleCollapse = () => {
    if (!searchTerm) {
      setIsExpanded(false)
    }
    setShowSuggestions(false)
    setSelectedIndex(-1)
    inputRef.current?.blur()
  }

  // Cerrar al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        containerRef.current && 
        !containerRef.current.contains(event.target)
      ) {
        if (!searchTerm) {
          setIsExpanded(false)
        }
        setShowSuggestions(false)
        setSelectedIndex(-1)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [searchTerm])

  return (
    <div 
      ref={containerRef}
      className={`compact-search-container ${isExpanded ? 'expanded' : ''}`}
    >
      <div className="compact-search-box">
        {!isExpanded ? (
          <button 
            onClick={handleExpand}
            className="search-trigger"
            aria-label="Abrir búsqueda"
          >
            <SearchIcon />
          </button>
        ) : (
          <>
            <SearchIcon />
            <input
              ref={inputRef}
              type="text"
              value={searchTerm}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              onFocus={() => {
                if (searchTerm.length > 0 && suggestions.length > 0) {
                  setShowSuggestions(true)
                }
              }}
              onBlur={() => {
                if (!searchTerm) {
                  setTimeout(() => setIsExpanded(false), 150)
                }
              }}
              placeholder={placeholder}
              className="compact-search-input"
            />
            {searchTerm && (
              <button 
                onClick={handleClear}
                className="compact-clear-button"
                aria-label="Limpiar búsqueda"
              >
                <ClearIcon />
              </button>
            )}
          </>
        )}
      </div>

      {showSuggestions && suggestions.length > 0 && isExpanded && (
        <div className="compact-suggestions-list">
          {suggestions.map((suggestion, index) => (
            <div
              key={suggestion}
              className={`compact-suggestion-item ${index === selectedIndex ? 'selected' : ''}`}
              onClick={() => handleSuggestionClick(suggestion)}
            >
              <SearchIcon />
              <span>{suggestion}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
