
import '../styles/card.css'
import { Link} from 'react-router-dom'

function ProductCard({item}) {

 
  return (
    <div className='card'>
        <div className="image">
            <img src={item.images }alt="image here"/>
        </div>
        <div className='properties'>
          <h2>{item.name}</h2>
          <p>{item.description}</p>
          <h3>Kshs {item.price}</h3>
        </div>        
        <button ><Link to={`/product/${item.productID}`} key={item.productID}>add to cart</Link></button>
    </div>
  )
}

export default ProductCard