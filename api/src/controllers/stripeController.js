import {config} from '../../config.js';
import Stripe from 'stripe';
import sql from 'mssql'
import nodeMailer from "nodemailer";

const stripe = Stripe('sk_test_51NTio4KmIVPBBBZEPFzf5pHD66IFAN2Iiv6xp3SpJzw8OzFgMNot5nK0u1rHA8WSo09cNpTjaMfZFaWjzIWJXoqn00jY88NuZl')
const client = 'http://localhost:5173/'

export const stripeCheckout = async (req, res) => {
  const customer = await stripe.customers.create({
    metadata: {
      userID : req.body.userID,
      cart: JSON.stringify(req.body.cartItems),
    }
  })
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
      payment_method_types: ["card"],
    shipping_address_collection: {
      allowed_countries: ["US", "CA", "KE"],
    },
    phone_number_collection: {
      enabled: true,
    },
     customer: customer.id,
     line_items,
      mode: 'payment',
      success_url: `${client}checkout-success`,
      cancel_url: `${client}cart`,
    });
  
res.send({url: session.url});
  };
  const createOrder = async (customer, data) => {
    try {
      const item = JSON.parse(customer.metadata.cart);
      const pool = await sql.connect(config.sql);
      console.log(data.customer_details.email)
      const order = await pool
        .request()
        .input('userID', sql.Int, customer.metadata.userID)
        .input('paymentIntent', sql.VarChar(), data.payment_intent)
        .input('productName', sql.VarChar(), item[0].name)
        .input('productID', sql.Int, item[0].productID        )
        .input('quantity', sql.Int, item[0].cartTotalquantity)
        .input('shippingAddress', sql.VarChar(), data.customer_details.address.country)
        .input('totalAmount', sql.Int, data.amount_total/100)
        .query('INSERT INTO orders (userID, productName, quantity, shippingAddress,totalAmount, paymentIntent) VALUES (@userID, @productName, @quantity, @shippingAddress, @totalAmount, @paymentIntent)');

        //mailing the order
        let transporter = nodeMailer.createTransport({
          service: "gmail",
          auth: {
            user: "wamtitujose@gmail.com",
            pass: 'truvowxubnqosevz',
          },
        });
        let mailOptions = {
          from: 'wamtitujose@gmail.com',
          to: data.customer_details.email,
          subject: "Your order has been in placed successfully!",
          html: `<h2>confirm your order</h2>
             <p>product: ${item[0].name}</p>
             <p>quantity: ${item[0].cartTotalquantity}</p>
             <p>amount: ${data.amount_total/100}</p>
             <p>shipping address: ${data.customer_details.address.country}'-' ${data.customer_details.address.city}</p>
             <img src = ${item[0].images} />
             <h3>thanks for shopping at shopit<h3>
             `,
        };
        transporter.sendMail(mailOptions, (err, data) => {
          if (err) {
            console.log("Error Occurred", err);
            // res.status(500).json({ error: "Error sending email." });
          } else {
            console.log(`Email sent to ${data.response}`);
            // res.status(201).json({ message: "order created successfully!" });
          }
        })
  
    } catch (error) {
      console.error('Error creating order:', error);
    }
  };
  //webhooks
// This is your Stripe CLI webhook secret for testing your endpoint locally.
let endpointSecret;
// endpointSecret = "whsec_113d78c5575576a5ad51e213337c7b108083c7039052f6f737ebe0689bc7cbc0";
 
export const webhookHandler = (request, response) => {
  const sig = request.headers['stripe-signature'];

  let data;
  let eventType;
  if(endpointSecret){

    let event;
  
    try {
      event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret);
      console.log('verification success')
    } catch (err) {
      response.status(400).send(`Webhook Error: ${err.message}`);
      console.log(err)
      return;
    }
  }else{
    data = request.body.data.object;
    eventType = request.body.type;
  }

  // Handle the event
   if(eventType === "checkout.session.completed"){
    stripe.customers.retrieve(data.customer).then(
      (customer)=>{
        // const item = JSON.parse(customer.metadata.cart)
        // console.log(...item)
        // console.log(item[0].name)
        createOrder(customer, data)
        console.log(data)
        console.log(customer)
      }
    ).catch(err=> console.log(err.message))
   }


  // Return a 200 response to acknowledge receipt of the event
  response.send().end();
};