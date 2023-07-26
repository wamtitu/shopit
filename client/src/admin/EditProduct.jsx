import {useForm} from 'react-hook-form'
import {yupResolver} from '@hookform/resolvers/yup'
import * as yup from 'yup'
import axios from 'axios'
import {useState, useEffect} from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {storage} from '../firebase'
import {ref, uploadBytes, getDownloadURL} from "firebase/storage"
// import DatePicker from 'react-datepicker';
// import 'react-datepicker/dist/react-datepicker.css';

const schema = yup.object({
    name: yup.string().required(),
    description: yup.string().required(),
    category: yup.string().required(),
     brand: yup.string().required(),
    status: yup.string().required(),
    price: yup.string().required(),
    imageurl: yup.mixed()
})

function EditProduct() {
    const navigate = useNavigate()
    const {id} = useParams();
    const [productUpdate, setProductUpdate] = useState({})

    const fetchProduct = async ()=>{
        
        const product = await axios.get(`http://127.0.0.1:5000/products/${id}`)
        setProductUpdate(...product.data)
    }

    useEffect(()=>{
        fetchProduct()
    },[id])

    const onSubmit= async (data)=>{
        const { name, description, category, brand, status, price, imageurl } = data;

        const imageFile = imageurl[0];
        const imageRef= ref(storage, `images${imageFile.name}`)  
        await uploadBytes(imageRef ,imageFile).then(()=>{
              alert('image uploaded')
            })
            
              
  
            const images = await getDownloadURL(imageRef);
            const productData = {
                name,
                description,
                category,
                brand,
                status,
                price,
                images,
              };
  
        await axios.put(`http://127.0.0.1:3000/products/update/${id}`, productData)
        console.log(productData)
        navigate(`/products/${id}`)
        
    }

    const {register, handleSubmit} = useForm({
        resolver: yupResolver(schema)
    });
    const handleChange = (e) => {
        setProductUpdate((prevState) => ({
          ...prevState,
          [e.target.name]: e.target.value,
        }));
      };

  return (
    <div className="create-event-form-container">
    <form className='product-form' onSubmit={handleSubmit(onSubmit)}>
        <h2 className='fade-in' >Edit product here</h2>
        <input placeholder="name" {...register('name')} value={productUpdate.name}  onChange={handleChange}/>
         <input placeholder="brand" {...register('brand')} value={productUpdate.brandName}  onChange={handleChange}/>
         <input type='category' placeholder='category'{...register('category')}value={productUpdate.categoryName}  onChange={handleChange}/>
        <textarea placeholder="description" {...register('description')} value={productUpdate.description}  onChange={handleChange}></textarea>
        <input type='price' placeholder='price'{...register('price')} value={productUpdate.price}  onChange={handleChange}/>
        <input type='status' placeholder='status'{...register('status')} value={productUpdate.status}  onChange={handleChange}/>
        <input type='file' placeholder='images'{...register('imageurl')}   onChange={handleChange}/>
        <button type='submit'>add </button>
    </form>
</div>
  )
}

export default EditProduct;