//Componente frontend para mostrar la lista de productos y la interación con ellos.
import {products as initialProducts} from "./mocks/products.json"
import { Products } from "./Components/Products.jsx"
import { useState } from "react"
import { Header } from "./Components/Header.jsx"


function useFilters (){   //hub que se encarga de los filtros
  //inicializo los filtros
  const[filters, setFilters] = useState({
    category: 'all',
    minPrice: 0
  })

  //funcion para filtrar los productos
  const filterProducts= (products) => {
    return products.filter(product => {
      return (product.price>= filters.minPrice && 
        (filters.category === 'all' || product.category === filters.category))
    })
  }

  return { filterProducts, setFilters}
}


function App() {

  //Inicializo los productos
  const[products]= useState(initialProducts)

  const {filterProducts, setFilters} = useFilters()

  //aplico los filtros a los productos
  const filteredProducts= filterProducts(products)  

  //muestro los datos
  return (
    <>
    <Header changeFilters={setFilters}/>
    <Products products={filteredProducts}/>
    </>
  )
}

export default App
