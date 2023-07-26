import {register, login, getAllUsers, deleteUser, updateUser} from '../controllers/authController.js'
import { getBrands } from '../controllers/brandController.js';
import { getCategory } from '../controllers/categoryController.js';
import { getOrderByID, getOrders } from '../controllers/ordersController.js';
import { addProduct,deleteProduct,getProducts, getProductsByBrand, getProductsByCategory, getProductsByID, getTopDeals, updateProduct } from '../controllers/productcontroller.js'
import { stripeCheckout, webhookHandler } from '../controllers/stripeController.js'
import express from 'express';


export const routes = (app)=>{
    //users routes
    app.route('/auth/register').post(register)
    app.route('/auth/login').post(login)
    app.route('/users').get(getAllUsers)
    app.route('/users/delete/:id').delete(deleteUser)
    app.route('/users/editprofile/:id').put(updateUser)
    app.route('/admin/product').post(addProduct)
    //product routes
    app.route('/products').get(getProducts)
    app.route('/products/delete/:id').delete(deleteProduct)
    app.route('/products/update/:id').put(updateProduct)
    app.route('/products/category/:categoryName').get(getProductsByCategory)
    app.route('/products/brand/:brandName').get(getProductsByBrand)
    app.route('/products/:id').get(getProductsByID)
    app.route('/topdeals').get(getTopDeals)
    //brands
    app.route('/brands').get(getBrands)

    //categories
    app.route('/category').get(getCategory)
    

    //orders routes
    app.route('/orders/:id').get(getOrderByID)
    app.route('/orders').get(getOrders)

    //stripe routes
    app.route('/create-checkout-session').post(stripeCheckout)
    app.route('/webhook').post( express.raw({ type: 'application/json' }), webhookHandler)
}