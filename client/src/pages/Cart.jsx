import {useSelector, useDispatch} from 'react-redux'
import {AiOutlineArrowLeft} from 'react-icons/ai'
import {Link} from 'react-router-dom'
import '../styles/cartitem.css'
import {MdDelete} from 'react-icons/md'
import { useEffect } from 'react'
import { addToCart, decreaseCartQuantity, getTotals, removeFromCart } from '../redux/cartSlice'
import Checkout from '../components/Checkout'
function Cart() {
  const dispatch = useDispatch();
  const cart = useSelector((state)=>state.cart);
  const handleRemoveFromCart=(item)=>{
    dispatch(removeFromCart(item))
  }
  const handleDecrease = (item) =>{
    dispatch(decreaseCartQuantity(item))
  }
  const handleIncrease = (item) =>{
    dispatch(addToCart(item))
  }
  useEffect(()=>{
    dispatch(getTotals())
  },[cart, dispatch])
  return (
    <div>
      <h2 className='heading'>My cart</h2>
      <div className="cart1">
      <div className="whole-cart">
      {
        cart.cartItems.length === 0 ? (
          <div className="empty-cart">
            <p>your cart is currently empty</p>
            <Link to={'/'}>
              <AiOutlineArrowLeft/>
              <p>go shop</p>
            </Link>
          </div>
        ):(<div className='cart-items'>
          {cart.cartItems?.map((item, index)=>(
            <div key={index} className='cart-item'>
              <div className="image-cart">
              <img src={item.images} alt={item.name} />
               <div className='del' onClick={()=>handleRemoveFromCart(item)}>
                <MdDelete/>
                <p>REMOVE</p>
               </div>
              </div>
              <div>
                <h3>{item.name}</h3>
                <p>{item.description}</p>
                <p>{item.status}</p>
              </div>
              <div className="price">
                <h2>Ksh {item.cartTotalquantity * Number(item.price)}</h2>
                <div className="quantity">
                  <button onClick={()=>handleDecrease(item)}>-</button>
                  <h4>{item.cartTotalquantity}</h4>
                  <button onClick={()=>handleIncrease(item)}>+</button>
                </div>
              </div>
            </div>
          ))}
        </div>)
      }
      </div>
      <div className="checkout">
        <h2>CART SUMMARY</h2>
        <>
          <div className="summary">
            <p>SubTotal</p>
            <h3>Ksh{cart.cartTotalAmount}</h3>
          </div>
          <p>proceed to checkout to place your order</p>
        </>
        
        <Checkout cartItems = {cart.cartItems}/>
      </div>
      </div>
      
    </div>
  )
}

export default Cart