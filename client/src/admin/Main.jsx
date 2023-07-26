import DashboardAdmin from "./DashboardAdmin"
import Users from "./Users"
import ProductAdmin from './ProductsAdmin'
import Orders from "./OrdersAdmin"
import { Context } from "../context/mainContext"
import { useContext } from "react"

function Main() {
   const {main} = useContext(Context)
  return (
    <div className="main">
      <h1>Welcome back admin</h1>
      {
        main == 'dashboard' ? (
          <div className="dashboard">
            <DashboardAdmin/>
          </div>
        ): main == 'orders' ? (
          <div className="orders">
            <Orders/>
          </div>
        ):main == 'products' ? (
          <div className="products">
            <ProductAdmin/>
          </div>
        ):main == 'users' ? (
          <div className="users">
            <Users/>
          </div>
        ):main == 'analytics' ? (
          <div className="analytics">
            <Analytics/>
          </div>
        ): null
      }
    </div>
  )
}

export default Main