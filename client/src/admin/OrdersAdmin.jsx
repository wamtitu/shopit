import {useState, useEffect} from 'react'
import axios from 'axios'
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import {CiEdit} from 'react-icons/ci'
import {RiDeleteBin5Line} from 'react-icons/ri'
import {Link} from 'react-router-dom'

import '../styles/users.css'


function Orders() {
    const [orders, setOrders] = useState([])


    const getOrders = async()=>{
      try {
        const res = await axios.get('http://localhost:5000/orders')
        setOrders(res.data)
      } catch (error) {
        console.log(error)
      }
    }


    useEffect(()=>{
        getOrders()
    }, [])
    const handleEditClick= ()=>{
      console.log("edited")
    }
     const handleDeleteClick = async (orderID)=>{
      await axios.delete(`http://localhost:5000/orders/delete/ ${orderID}`)
      setOrders(orders.filter((order) => order.orderID !== orderID));
     }

    const columns = [
      { field: 'orderID', headerName: 'ID', width: 100, checkboxSelection: true},
      { field: 'name', headerName: 'Name', width: 120 },
      { field: 'email', headerName: 'Email', width: 150 },
      { field: 'phone', headerName: 'Phone', width: 120 },
      { field: 'productName', headerName: 'ProductName', width: 120 },
      { field: 'quantity', headerName: 'Quantity', width: 120 },
      { field: 'shippingAddress', headerName: 'Address', width: 120 },
      { field: 'totalAmount', headerName: 'Total', width: 120 },
      { field: 'orderDate', headerName: 'Order-Date', width: 120 },
      { field: 'actions', headerName: 'Actions', width: 120, 
        renderCell: (params)=>{
          return(
            <div className="actions">
               <Link to = "/">
               <CiEdit
            className="edit-icon"
            onClick={() => handleEditClick(params.getValue('orderID'))}
          /></Link>
          <RiDeleteBin5Line
            className="delete-icon"
            onClick={() => handleDeleteClick(params.row.orderID)}
          />
            </div>
          )
        } }
      // Add more columns as needed
    ];
   


  return (
    <div style={{ width: '100%' }}>
      <div className='user-header'>
        <h2> Current Orders: {orders.length}</h2>
      </div>

      <DataGrid className= "orders users" rows={orders} 
      columns={columns} 
      pageSize={5} 
      getRowId={(row) => row.orderID}
      checkboxSelection
      slots={{toolbar: GridToolbar}}
      slotProps={{
        toolbar: {
          showQuickFilter :true,
          quickFilterProps: {debounceMs:500}
        }
      }}
      disableColumnFilter
      disableColumnSelector
      disableDensitySelector
      disableRowSelectionOnClick/>
    </div>
  )
}

export default Orders