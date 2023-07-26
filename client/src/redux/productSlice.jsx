import { createSlice } from "@reduxjs/toolkit";

const initialState= {
    products: [],
    singleProduct: [],
    isFetching: false,
    error: false
};

const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers:{
        createProductStart: (state)=>{
            state.isFetching = true;
            state.error = false;
        },
        createProductSuccess: (state, action) =>{
            state.isFetching = false;
            state.products.push(action.payload)
            state.error = false;
        },
        createProductFailure: (state)=>{
            state.isFetching = false;
            state.error = false;
        },
        getProductStart: (state)=>{
            state.isFetching = true;
            state.error = false;
        },
        getProductSuccess: (state, action) =>{
            state.isFetching = false;
            state.products = action.payload
            state.error = false;
        },
        getProductFailure: (state)=>{
            state.isFetching = false;
            state.error = false;
        },
        getProductByIdStart: (state)=>{
            state.isFetching = true;
            state.error = false;
        },
        getProductByIdSuccess: (state, action) =>{
            state.isFetching = false;
             const itemIndex = state.products.findIndex(
                (item) => item.productID === action.payload.productID
            )
            if(itemIndex)state.products = action.payload.productID;
            
            state.error = false;
        },
        getProductByIdFailure: (state)=>{
            state.isFetching = false;
            state.error = false;
        },
        getProductByIdCategoryMens: (state, action) =>{
            state.isFetching = false;
            state.products = action.payload
            state.error = false;
        },
    }
})

export const {getProductByIdCategoryMens, createProductFailure, createProductStart, createProductSuccess, getProductFailure, getProductSuccess, getProductStart,
getProductByIdFailure, getProductByIdStart, getProductByIdSuccess} = productSlice.actions;
export default productSlice.reducer;