import {config} from '../../config.js';
import Stripe from 'stripe';

const stripe = Stripe('sk_test_51NTio4KmIVPBBBZEPFzf5pHD66IFAN2Iiv6xp3SpJzw8OzFgMNot5nK0u1rHA8WSo09cNpTjaMfZFaWjzIWJXoqn00jY88NuZl')
const client = 'http://localhost:5173/'

export const stripeCheckout = async (req, res) => {
  const line_items = req.body.cartItems.map((item)=>{
    return{
      price_data:{
        currency:'kes',
        product_data: {
          name: item.name,
          images: [item.images],
          description: item.description,
          metadata: {
            id: item.productID
          }
        },
        unit_amount: item.price * 100
      },
      quantity: item.cartTotalquantity
    }
  })
    const session = await stripe.checkout.sessions.create({
     line_items,
      mode: 'payment',
      success_url: `${client}checkout-success`,
      cancel_url: `${client}cart`,
    });
  
res.send({url: session.url});
  };