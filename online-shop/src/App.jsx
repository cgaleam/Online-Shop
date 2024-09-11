//Componente frontend para mostrar la lista de productos y la interación con ellos.

import { Products } from "./Components/Products.jsx"
import { products } from "./mocks/products.json"
function App() {

  return (

    <Products products={products}/>

  )
}

export default App
