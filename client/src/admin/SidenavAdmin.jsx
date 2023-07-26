import '../styles/sidenav.css'
import {BiSolidDashboard} from 'react-icons/bi'
import {ImUsers} from 'react-icons/im'
import {MdOutlineProductionQuantityLimits} from 'react-icons/md'
import {TbBrandGoogleAnalytics} from 'react-icons/tb'
import {FaThList} from 'react-icons/fa'
import { Context } from '../context/mainContext'
import { useContext } from 'react'

function SidenavAdmin() {
  const {dispatch} = useContext(Context);

  const handleDash = () =>{
    dispatch({type: "DASHBOARD", payload: "dashboard"})
  }
  const handleOrders = () =>{
    dispatch({type: "ORDERS", payload: "orders"})
  }
  const handleProducts = () =>{
    dispatch({type: "PRODUCTS", payload: "products"})
  }
  const handleUser = () =>{
    dispatch({type: "USERS", payload: "users"})
  }
  const handleAnlytics = () =>{
    dispatch({type: "ANALYTICS", payload: "analytics"})
  }

  return (
    <div className='sidenav'>
      <div className="dash a1" onClick={handleDash}><BiSolidDashboard/> Dashboard</div>
      <div className="orders a1" onClick={handleOrders}><MdOutlineProductionQuantityLimits/> Orders</div>
      <div className="products a1" onClick={handleProducts}><FaThList/> Products</div>
      <div className="userSide a1" onClick={handleUser}><ImUsers/> Users</div>
      {/* <div className="analytics" onClick={handleAnlytics}><TbBrandGoogleAnalytics/> Analytics</div> */}
          </div>
  )
}

export default SidenavAdmin