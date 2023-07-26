import axios from 'axios'
import { useSelector } from 'react-redux'


function CheckOut({cartItems}) {
    const user = useSelector((state)=>state.user?.currentUser?.id)
    const handleCheckout = ()=>{
        axios.post('http://localhost:5000/create-checkout-session', {
            userID: user,
            cartItems
        }).then((res)=>{
            if(res.data.url){
                window.location.href = res.data.url
                localStorage.removeItem('cartItems');
                console.log('cleared')
            }
        }).catch((error=>{
            console.log(error)
        }))
    }
  return (
    <>
    <button onClick={()=>handleCheckout()}>
        Checkout
    </button>
    </>
  )
}

export default CheckOut