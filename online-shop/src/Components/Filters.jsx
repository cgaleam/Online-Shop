//Vista de filtros
import { useState } from "react"
import './Filters.css'

export function Filters({onChange}) {   //estado para ver el valor del input

    const [minPrice, setMinPrice] = useState(0) //estado para ver el valor del input

    const handleChangeMinPrice = (event) => {   //para ver el valor del input de price
        setMinPrice(event.target.value)
        onChange(prevState => ({...prevState, minPrice: event.target.value}))   
    }

    const handleChangeCategory = (event) => {   
        onChange(prevState => ({...prevState, category: event.target.value}))
    }

    return(
        <section className="filters">
            <div>
                <label htmlFor="category">Category</label>
                <select id="category" onChange={handleChangeCategory}>
                    <option value="all">Todas</option>
                    <option value="laptops">Portatiles</option>
                    <option value="smartphones">Moviles</option>
                </select>
            
            </div>

            <div>
                <label htmlFor="price">Price</label>
                <input type="range" id="price" min="0" max="1000" step="10" onChange={handleChangeMinPrice}/>
                
                <span>${minPrice}</span>
            </div>

        </section>
    )
}