import {Filters} from "./Filters.jsx"
import './Header.css'

export function Header({ changeFilters }) {
    return (
        <header className="main-header">
            <div className="header-content">
                <div className="brand-section">
                    <h1 className="brand-title">
                        <span className="brand-icon">🛒</span>
                        <span className="brand-text">Online Shop</span>
                    </h1>
                    <p className="brand-tagline">Tu tienda tecnológica de confianza</p>
                </div>
                <Filters onChange={changeFilters}/>
            </div>
        </header>
    )
}