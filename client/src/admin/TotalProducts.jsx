import { useState, useEffect } from "react"
import axios from "axios"

function TotalProducts() {
    const [products, setProducts] = useState([]);
    const getProducts = async()=>{
      try {
        const res = await axios.get('http://localhost:5000/products')
        setProducts(res.data)
      } catch (error) {
        console.log(error)
      }
    }
    useEffect(()=>{
        getProducts()
    },[])
  return (
    <div>
        <h2>produsts</h2>
        <h3>TotalProducts: {products.length} </h3>
    </div>
  )
}

export default TotalProducts