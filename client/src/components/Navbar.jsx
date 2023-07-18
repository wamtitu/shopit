import '../styles/navbar.css'
import {PiShoppingCartSimpleBold} from 'react-icons/pi'
import {Link} from 'react-router-dom'
import { useSelector } from 'react-redux'
function Navbar() {
   const {cartItems} = useSelector((state)=>state.cart)
  return (
    <div className='nav'>
        <div className="logo">
            <img src="/images/SHOPIT.png" alt="logo here"/>
        </div>
            <div className="search">
                <input type="text" />
                <button>search</button>
            </div>
        <ul>
            <Link to = '/'>home</Link>
            <Link to = '/categories/womens'>womens</Link>
            <Link to = '/categories/mens'>mens</Link>
            <Link to = '/categories/unisex'>unisex</Link>
            <Link to = '/register'>register</Link>
            <Link to = '/login'>login</Link>
        </ul>
        
        
        <div className="cart">
          <Link to={'/cart'}><PiShoppingCartSimpleBold style={{height:'40px', width:'40px', color:'black'}}/></Link>
          <span>{cartItems.length}</span>
        </div>
        <div className="user">
         <img src="/images/av.avif" alt="avater"/>
        </div>
    </div>
  )
}

export default Navbar