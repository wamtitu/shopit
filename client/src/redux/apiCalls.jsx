import {createProductFailure, createProductSuccess, createProductStart, getProductFailure, getProductSuccess, getProductStart,
getProductByIdFailure, getProductByIdSuccess, getProductByIdStart} from './productSlice';
import axios from 'axios';


export const addProduct = async (dispatch, productData)=>{
    dispatch(createProductStart())
    try{
        await axios.post('http://localhost:5000/admin/product', productData) 
        dispatch(createProductSuccess(productData))
    }catch(error){
        dispatch(createProductFailure())
        console.log(error)
    }
}

export const getProducts = async (dispatch)=>{
    dispatch(getProductStart());
    try {
       const response =  await axios.get("http://localhost:5000/products")
        dispatch(getProductSuccess(response.data))
    } catch (error) {
        dispatch(getProductFailure())
        console.log(error)
    }
}

  