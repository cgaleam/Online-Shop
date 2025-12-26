//Vista de filtros de precio
import { useState } from "react"
import './Filters.css'

export function Filters({onChange}) {   
    const [minPrice, setMinPrice] = useState(0)

    const handleChangeMinPrice = (event) => {   
        setMinPrice(event.target.value)
        onChange(prevState => ({...prevState, minPrice: event.target.value}))   
    }

    return(
        <section className="filters">
            <div>
                <label htmlFor="price">Precio mínimo</label>
                <input 
                    type="range" 
                    id="price" 
                    min="0" 
                    max="1000" 
                    step="10" 
                    onChange={handleChangeMinPrice}
                    value={minPrice}
                />
                <span>${minPrice}</span>
            </div>
        </section>
    )
}