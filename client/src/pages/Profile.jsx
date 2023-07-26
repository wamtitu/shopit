import { useSelector } from "react-redux"
import '../styles/profile.css'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { useState, useEffect } from "react";
import axios from "axios";


function Profile() {
    const user = useSelector((state)=>state.user?.currentUser)
    const id = useSelector((state)=>state.user?.currentUser.id)
    const [orders, setOrders] = useState([]);

    const fetchOrders = async()=>{
      const response = await axios.get(`http://localhost:5000/orders/${id}`)
      setOrders(response.data)
    }

    useEffect(()=>{
      fetchOrders()
    }, [id])
  return (
    <>
       <div className="profile">
        <div className="prof-img">
            <img src="/images/av.avif" alt="" />
        </div>
        <div className="details">
            <h3><span>username:</span> {user.name}</h3>
            <h3><span>email:</span> {user.email}</h3>
            <h3><span>phone:</span> {user.phone}</h3>
            </div>
        </div>
        <h1>{user.name} orders</h1>
        <div className="orders">
            <TableContainer component={Paper}>
          <Table >
            <TableHead style={{background:'red'}}>
              <TableRow >
                <TableCell>name</TableCell>
                <TableCell>phone</TableCell>
                <TableCell>orderID</TableCell>
                <TableCell>productName</TableCell>
                <TableCell>quantity</TableCell>
                <TableCell>date</TableCell>
                <TableCell>total</TableCell>
                <TableCell>adress</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders.map((order, index) => (
                <TableRow key={index}>
                  <TableCell>{order.name}</TableCell>
                  <TableCell>{order.phone}</TableCell>
                  <TableCell>{order.orderID}</TableCell>
                  <TableCell>{order.productName}</TableCell>
                  <TableCell>{order.quantity}</TableCell>
                  <TableCell>{order.orderDate}</TableCell>
                  <TableCell>{order.totalAmount}</TableCell>
                  <TableCell>{order.shippingAddress}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        </div>
    </>
  )
}

export default Profile