
import '../styles/card.css'
import { Link} from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/cartSlice';

function ProductCard({item}) {
  const dispatch = useDispatch();

  const handleAddToCart = ()=>{
    dispatch(addToCart(item))
  }
  return (
    <div className='card'>
      <Link style={{textDecoration:'none',color:'black'}} to={`/product/${item.productID}`} key={item.productID}>
      <div className="image">
            <img src={item.images}alt="image here"/>
        </div>
        <div className='properties'>
          <h2>{item.name}</h2>
          <p>{item.description}</p>
          <h3>Kshs {item.price}</h3>
        </div>        
      </Link>
      <button onClick={handleAddToCart}>add to cart</button>
        
    </div>
  )
}

export default ProductCard