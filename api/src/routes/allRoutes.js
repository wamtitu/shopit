import {register, login} from '../controllers/authController.js'
import { addProduct,getProducts, getProductsByBrand, getProductsByCategory, getProductsByID } from '../controllers/productcontroller.js'
import { stripeCheckout, webhookHandler } from '../controllers/stripeController.js'
import express from 'express';


export const routes = (app)=>{
    app.route('/auth/register').post(register)
    app.route('/auth/login').post(login)
    app.route('/admin/product').post(addProduct)
    app.route('/products').get(getProducts)
    app.route('/products/category/:categoryName').get(getProductsByCategory)
    app.route('/products/brand/:brandName').get(getProductsByBrand)
    app.route('/products/:id').get(getProductsByID)
    app.route('/create-checkout-session').post(stripeCheckout)
    app.route('/webhook').post( express.raw({ type: 'application/json' }), webhookHandler)


}