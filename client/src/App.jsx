import './App.css'
import 'react-toastify/dist/ReactToastify.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './pages/Home'
import Product from './pages/Product';
import Categories from './pages/Categories';
import Brands from './pages/Brands';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import NotFound from './pages/NotFound'
import AddProduct from './pages/AddProduct';
import Cart from './pages/Cart';

import {ToastContainer} from 'react-toastify'
import CheckoutSuccess from './components/CheckoutSuccess';

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
        <Route path='/categories/womens' element = {<Categories/>}></Route>
        <Route path='/categories/mens' element = {<Brands/>}></Route>
        <Route path='/categories/unisex' element = {<Brands/>}></Route>
        <Route path='/admin/items' element = {<AddProduct/>}></Route>
        <Route path='*' element = {<NotFound/>}></Route>
        </Routes>
      <Footer/>
    </BrowserRouter>
  )
}

export default App
