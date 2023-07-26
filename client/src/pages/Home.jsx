import ProductCard from '../components/ProductCard'
import { useState, useEffect } from 'react'
import { getProducts } from '../redux/apiCalls'
import {useSelector, useDispatch} from 'react-redux'
import '../styles/home.css' 

function Home() {
  const dispatch = useDispatch();
  const [items, setItems] = useState([]);
  const products = useSelector((state) => state.products)


  useEffect(()=>{
     getProducts(dispatch)
  }, [dispatch])

 

  useEffect(()=>{
    setItems(products.products)
  },[products])


  return (
    <>
      <h1>TOP products</h1>
    <div style={{display:'grid', gridTemplateColumns:'repeat(3, 1fr)', gap:'10px', margin:'auto 5%'}}>
      {
      items&&items.map((item, index)=>(
        <ProductCard key={index} item={item} />
      ))
    }
    </div>
    </>


    
  )
}

export default Home