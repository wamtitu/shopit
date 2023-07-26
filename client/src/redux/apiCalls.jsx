import {createProductFailure, createProductSuccess, createProductStart, getProductFailure, getProductSuccess, getProductStart,
getProductByIdFailure, getProductByIdSuccess, getProductByIdStart, getProductByIdCategoryMens} from './productSlice';
import {    loginStart,loginFailure,loginSuccess,logout} from './userSlice'
import axios from 'axios';

    export const loginUser = async(dispatch, user)=>{
        console.log(user,dispatch);
    dispatch(loginStart());
        try{
      const {data}=await axios.post(`http://localhost:5000/auth/login`, user);
    dispatch(loginSuccess(data));
        }catch(err){
    console.log(err)
    dispatch(loginFailure());
        }
    }
export const logOutuser = async(dispatch)=>{
    console.log(dispatch);
dispatch(logout())
}

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

// export const getMensProducts = async (dispatch)=>{
//     try {
//        const response =  await axios.get("http://localhost:5000/products/category/mens")
//         dispatch(getProductByIdCategoryMens(response.data))
//     } catch (error) {
//         console.log(error)
//     }
// }
  