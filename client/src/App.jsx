import './App.css'
import 'react-toastify/dist/ReactToastify.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './pages/Home'
import Product from './pages/Product';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import NotFound from './pages/NotFound'
import AddProduct from './admin/AddProduct';
import Cart from './pages/Cart';
import Login from './pages/Login'
import Register from './pages/Register'
import Profile from './pages/Profile';


import {ToastContainer} from 'react-toastify'
import CheckoutSuccess from './components/CheckoutSuccess';
import Women from './pages/Women';
import Men from './pages/Mens';
import Unisex from './pages/unisex';
import Admin from './pages/Admin';
import EditProduct from './admin/EditProduct';

function App() {

  return (
    <BrowserRouter>
      <ToastContainer/>
      <Navbar/>
        <Routes>
        <Route path='/' element = {<Home/>}></Route>
        <Route path='/product/:id' element = {<Product/>}></Route>
        <Route path='/cart' element = {<Cart/>}></Route>
        <Route path='/checkout-success' element = {<CheckoutSuccess/>}></Route>
        <Route path='/categories/womens' element = {<Women/>}></Route>
        <Route path='/categories/mens' element = {<Men/>}></Route>
        <Route path='/categories/unisex' element = {<Unisex/>}></Route>
        <Route path='/admin/add-product' element = {<AddProduct/>}></Route>
        <Route path='/login' element = {<Login/>}></Route>
        <Route path='/register' element = {<Register/>}></Route>
        <Route path='/profile' element = {<Profile/>}></Route>
        <Route path='/admin' element = {<Admin/>}></Route>
        <Route path='/admin/edit-product/:id' element = {<EditProduct/>}></Route>

        <Route path='*' element = {<NotFound/>}></Route>
        </Routes>
      <Footer/>
    </BrowserRouter>
  )
}

export default App
