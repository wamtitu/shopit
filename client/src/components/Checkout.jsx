import axios from 'axios'

function CheckOut({cartItems}) {
    const handleCheckout = ()=>{
        axios.post('http://localhost:5000/create-checkout-session', {
            cartItems
        }).then((res)=>{
            if(res.data.url){
                window.location.href = res.data.url
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