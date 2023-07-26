import '../styles/navbar.css'
import {PiShoppingCartSimpleBold} from 'react-icons/pi'
import {RxAvatar} from 'react-icons/rx'
import {Link, useNavigate} from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'



function Navbar() {

   const {cartItems} = useSelector((state)=>state.cart)
  //  console.log(useSelector((state)=>state.user.currentUser))
   const user = useSelector((state)=>state.user?.currentUser?.token)
   const admin =useSelector((state)=>state.user?.currentUser?.admin)


  //  console.log (user)
   

  
 
  return (
    <div className='nav'>
        <div className="logo">
            <img src="/images/SHOPIT.png" alt="logo here"/>
        </div>
        {user && user !== null ? ( admin === true ?(
             <>
             <div className="search">
                <input type="text"/>
                <button>search</button>
            </div>
        <ul>
            <Link to = '/'>home</Link>
            <Link to = '/categories/womens'>womens</Link>
            <Link to = '/categories/mens'>mens</Link>
            <Link to = '/categories/unisex'>unisex</Link>
            <Link style={{borderLeft:'1px solid black', marginLeft:'10px'}} to = '/admin'>admin</Link>
        </ul>
        
        
        <div className="cart">
          <Link to={'/cart'}><PiShoppingCartSimpleBold style={{height:'40px', width:'40px', color:'black'}}/></Link>
          <span>{cartItems.length}</span>
        </div>
        <div className="user">
          <Link to={'/profile'}><RxAvatar style={{width:'60px',color:'black', height:'60px'}}/></Link></div>
          </>
        ):(
          <>
              <div className="search">
                 <input type="text"/>
                 <button>search</button>
             </div>
         <ul>
             <Link to = '/'>home</Link>
             <Link to = '/categories/womens'>womens</Link>
             <Link to = '/categories/mens'>mens</Link>
             <Link to = '/categories/unisex'>unisex</Link>
         </ul>
         
         
         <div className="cart">
           <Link to={'/cart'}><PiShoppingCartSimpleBold style={{height:'40px', width:'40px', color:'black'}}/></Link>
           <span>{cartItems.length}</span>
         </div>
         <div className="user">
           <Link to={'/profile'}><RxAvatar style={{width:'60px',color:'black', height:'60px'}}/></Link></div>
           </>
        )
         
      ) :(
      <div>
      <Link style={{textDecoration:'none', color:'black', padding:'20px'}} to = '/register'>register</Link>
       <Link style={{textDecoration:'none', color:'black', padding:'20px'}} to = '/login'>login</Link>
     </div>
      )
      }
            
    </div>
  )
}

export default Navbar