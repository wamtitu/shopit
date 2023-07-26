import {useForm} from 'react-hook-form'
import {yupResolver} from '@hookform/resolvers/yup'
import * as yup from 'yup'
// import axios from 'axios'
import '../styles/addProduct.css'
import {storage} from '../firebase'
import {ref, uploadBytes, getDownloadURL} from "firebase/storage"
import { addProduct } from '../redux/apiCalls'
import {useSelector, useDispatch} from 'react-redux';

const schema = yup.object({
    name: yup.string().required(),
    description: yup.string().required(),
    category: yup.string().required(),
     brand: yup.string().required(),
    status: yup.string().required(),
    price: yup.string().required(),
    imageurl: yup.mixed()
})

function AddProduct() { 
  const dispatch = useDispatch();
    const onSubmit= async(data)=>{
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


            addProduct(dispatch, productData)
    }
    const {register, handleSubmit, formState:{errors}} = useForm({
        resolver: yupResolver(schema)

    });

  return (
    <div className="addProduct-form-container">
    <form className='product-form' onSubmit={handleSubmit(onSubmit)}>
        <h2 className='fade-in' >Add product here</h2>
        <input placeholder="name" {...register('name')} />
        {errors.name && <p>{errors.name.message}</p>}
         <input placeholder="brand" {...register('brand')}/>
        {errors.brand && <p>{errors.brand.message}</p>}
        <input type='category' placeholder='category'{...register('category')}/>
        {errors.category && <p>{errors.category.message}</p>}
        <textarea placeholder="description" {...register('description')}></textarea>
        {errors.description && <p>{errors.description.message}</p>}
        <input type='price' placeholder='price'{...register('price')}/>
        {errors.price && <p>{errors.price.message}</p>} 
        <input type='status' placeholder='status'{...register('status')}/>
        {errors.status && <p>{errors.status.message}</p>}
        <input type='file' placeholder='images'{...register('imageurl')}/>
        {errors.imageurl && <p>{errors.imageurl.message}</p>}
        <button type='submit'>add </button>
    </form>

   
</div>
  )
}

export default AddProduct