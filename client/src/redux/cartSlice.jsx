import {createSlice} from '@reduxjs/toolkit';
import {toast} from 'react-toastify'

const initialState = {
    cartItems: localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [],
    cartTotalAmount:0,
    cartTotalQuantity: 0
}

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart(state, action) {
            const itemIndex = state.cartItems.findIndex(
                (item) => item.productID === action.payload.productID
            )
            if(itemIndex>=0){
                state.cartItems[itemIndex].cartTotalquantity += 1;
                toast.info('increased product quantity', {
                    position: 'bottom-left'
                })
            }else{
                const tempProduct = {...action.payload, cartTotalquantity: 1 }
                state.cartItems.push(tempProduct)
                toast.success('added product to cart', {
                    position: 'bottom-left'
                })
            }
            localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
        },
        removeFromCart(state, action) {
            const updatedCartItems = state.cartItems.filter(
                (item) => item.productID !== action.payload.productID
                );
                state.cartItems = updatedCartItems;
                toast.error('removed product from cart', {
                    position: 'bottom-left'
                })
            localStorage.setItem('cartItems', JSON.stringify(state.cartItems))
          },
        decreaseCartQuantity(state, action){
            const itemIndex = state.cartItems.findIndex(
                (item) => item.productID === action.payload.productID
            )
            if(state.cartItems[itemIndex].cartTotalquantity > 1){
                state.cartItems[itemIndex].cartTotalquantity -=1;

                toast.error('reduced item quantity from cart', {
                    position: 'bottom-left'
                })
            }else if (state.cartItems[itemIndex].cartTotalquantity === 1){
                const updatedCartItems = state.cartItems.filter(
                    (item) => item.productID !== action.payload.productID
                    );
                    state.cartItems = updatedCartItems;
                    toast.error('removed product from cart', {
                        position: 'bottom-left'
                    })
                }
                localStorage.setItem('cartItems', JSON.stringify(state.cartItems))
        },
        getTotals(state, action){
           let {total, quantity} = state.cartItems.reduce(
                (cartTotal, cartItem)=>{
                    const {price, cartTotalquantity} = cartItem;
                    const itemTotal = Number(price) * cartTotalquantity;

                    cartTotal.total += itemTotal;
                    cartTotal.quantity += cartTotalquantity;

                    return cartTotal;
                },
                {
                    total: 0,
                    quantity: 0
                }
            );
            state.cartTotalAmount= total;
            state.cartTotalQuantity = quantity;
        }
          
    }

})
export const {addToCart, removeFromCart, decreaseCartQuantity, getTotals} = cartSlice.actions;
export default cartSlice.reducer;