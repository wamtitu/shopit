import { useSelector, useDispatch } from 'react-redux'
import { useState, useEffect } from 'react'
// import { getProductsById } from '../redux/apiCalls';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { addToCart } from '../redux/cartSlice';
import '../styles/product.css'

  function Product() {
    const dispatch = useDispatch();
    const {id} = useParams();
  const [item, setItem] = useState([]);
   const fetchById = async ()=>{
     try {
      const response = await axios.get(`http://localhost:5000/products/${id}`)
      setItem([...response.data])
     } catch (error) {
      console.log(error)
     }
   }

  useEffect(()=>{
    fetchById();
  },[id])

  const handleAddToCart= (item)=>{
    dispatch(addToCart(item))
 }
 
    return (
      <div className='product-container'>
        {
          item&& item.map((item, index)=>(
          <div key={index} className='product-by-id'>
             <div className="image-by-id">
               <img src={item.images}alt="image here"/>
            </div>
            
          <div className='properties-by-id'>
            <div>
                <h2>{item.name}</h2>
                <p>{item.description}</p>
                <p>brand: {item.brandName}</p>
                <h3>Kshs {item.price}</h3>
              </div>
            <button onClick={()=>handleAddToCart(item)}>add to cart</button>
          </div>        
          </div>
          ))
        }
      </div>
    )
  }

export default Product