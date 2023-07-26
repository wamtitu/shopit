import {useState, useEffect} from 'react'
import axios from 'axios'
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import {CiEdit} from 'react-icons/ci'
import {RiDeleteBin5Line} from 'react-icons/ri'
import {Link} from 'react-router-dom'

import '../styles/users.css'


function Users() {
    const [users, setUsers] = useState([])


    const getUsers = async()=>{
      try {
        const res = await axios.get('http://localhost:5000/users')
        setUsers(res.data)
      } catch (error) {
        console.log(error)
      }

    }

    useEffect(()=>{
        getUsers()
    }, [])

    const handleEditClick= ()=>{
      console.log("edited")
    }
     const handleDeleteClick = async (userID)=>{
      await axios.delete(`http://localhost:5000/users/delete/ ${userID}`)
      setUsers(users.filter((user) => user.userID !== userID));
      console.log(userID ,"deleted successfully")
     }

    const columns = [
      { field: 'userID', headerName: 'ID', width: 100, checkboxSelection: true},
      { field: 'name', headerName: 'Name', width: 120 },
      { field: 'email', headerName: 'Email', width: 150 },
      { field: 'phone', headerName: 'Phone', width: 120 },
      { field: 'isAdmin', headerName: 'IsAdmin', width: 120 },
      { field: 'actions', headerName: 'Actions', width: 120, 
        renderCell: (params)=>{
          return(
            <div className="actions">
               <Link to = "/">
               <CiEdit
            className="edit-icon"
            onClick={() => handleEditClick(params.getValue('userID'))}
          /></Link>
          <RiDeleteBin5Line
            className="delete-icon"
            onClick={() => handleDeleteClick(params.row.userID)}
          />
            </div>
          )
        } }
      // Add more columns as needed
    ];
   


  return (
    <div style={{ width: '100%' }}>
      <div className='user-header'>
        <h2> Current Users: {users.length}</h2>
        <button className='add-user'>Add user</button>
      </div>

      <DataGrid className= "users" rows={users} 
      columns={columns} 
      pageSize={5} 
      getRowId={(row) => row.userID}
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

export default Users