import { PriceFilter } from './PriceFilter.jsx'
import './Header.css'

export function Header({ searchTerm, onSearchChange, suggestions, onSuggestionClick, onClear, onFiltersChange }) {
    return (
        <header className="main-header">
            <div className="header-content">
                <div className="brand-section">
                    <h1 className="brand-title">
                        <span className="brand-icon">🛒</span>
                        <span className="brand-text">CGA Tech Store</span>
                    </h1>
                </div>
                <div className="header-controls">
                    <div className="header-search">
                        <div className="search-box">
                            <input
                                type="text"
                                placeholder="Buscar productos..."
                                value={searchTerm}
                                onChange={(e) => onSearchChange(e.target.value)}
                                className="search-input"
                            />
                            {searchTerm && (
                                <button 
                                    onClick={onClear}
                                    className="search-clear"
                                    aria-label="Limpiar búsqueda"
                                >
                                    ✕
                                </button>
                            )}
                        </div>
                        {suggestions.length > 0 && searchTerm && (
                            <div className="search-suggestions">
                                {suggestions.map((suggestion, index) => (
                                    <button
                                        key={index}
                                        onClick={() => onSuggestionClick(suggestion)}
                                        className="suggestion-item"
                                    >
                                        {suggestion}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                    <PriceFilter onChange={onFiltersChange} />
                </div>
            </div>
        </header>
    )
}