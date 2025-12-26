import { Filters } from "./Filters.jsx"
import './FiltersSection.css'

export function FiltersSection({ changeFilters }) {
    return (
        <section className="filters-section">
            <div className="filters-container">
                <h3 className="filters-title">Refina tu búsqueda</h3>
                <p className="filters-subtitle">Ajusta el precio para encontrar la mejor oferta</p>
                <Filters onChange={changeFilters}/>
            </div>
        </section>
    )
}
