import {useState, useEffect} from 'react'
import axios from 'axios'
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import {CiEdit} from 'react-icons/ci'
import {RiDeleteBin5Line} from 'react-icons/ri'
import {Link, useNavigate} from 'react-router-dom' 
import { useSelector, useDispatch } from 'react-redux';
import '../styles/productAdmin.css'
import { getProducts } from '../redux/apiCalls';


function ProductAdmin() {
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const [product, setProducts] = useState([]);
  const products = useSelector((state) => state.products)


  useEffect(()=>{
     getProducts(dispatch)
  }, [dispatch])

 

  useEffect(()=>{
    setProducts(products.products)
  },[products])

    const handleEditClick= (productID)=>{
      navigate(`/admin/edit-product/${productID}`)
      console.log(productID)
    }
     const handleDeleteClick = async (productID)=>{
      await axios.delete(`http://localhost:5000/products/delete/ ${productID}`)
      setProducts(products.filter((products) => products.productID !== productID));
      console.log(productID ,"deleted successfully")
     }

    const columns = [
      { field: 'productID', headerName: 'ID', width: 100, checkboxSelection: true},
      { field: 'images', headerName: 'Image', width: 120 ,
        renderCell: (params)=>{
            return(
                <img src={params.row.images}  alt="/images/av.avif" />
            )
        }    
    },
      { field: 'name', headerName: 'Name', width: 120 },
      { field: 'brandName', headerName: 'Brand', width: 100 },
      { field: 'categoryName', headerName: 'Category', width: 100 },
      { field: 'status', headerName: 'Status', width: 100 },
      { field: 'price', headerName: 'Price', width: 100 },
      { field: 'actions', headerName: 'Actions', width: 100, 
        renderCell: (params)=>{
          return(
            <div className="actions">
               <Link to = "/">
               <CiEdit
            className="edit-icon"
            onClick={() => handleEditClick(params.row.productID)}
          /></Link>
          <RiDeleteBin5Line
            className="delete-icon"
            onClick={() => handleDeleteClick(params.row.productID)}
          />
            </div>
          )
        } }
      // Add more columns as needed
    ];
    const handleAddProduct= () =>{
        navigate('/admin/add-product')
    }
   


  return (
    <div style={{ height:'500px', width: '100%'}}>
      <div className='user-header'>
        <h2> Current Products: {products.length}</h2>
        <button className='add-product' onClick={handleAddProduct}>Add product</button>
      </div>

      <DataGrid className= "products users" rows={product} 
      columns={columns} 
      pageSize={5} 
      getRowId={(row) => row.productID}
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

export default ProductAdmin