import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './Pages/Home'
import Product from './Pages/Product'
import Navbar from './Components/Navbar'
import MensCloth from './Pages/MensCloth'
import WomensCloth from './Pages/WomensCloth'
import SingalProduct from './Components/SingalProduct'
import Sighup from './Pages/Sighup'
import Login from './Pages/Login'
import CartProduct from './Pages/CartProduct'
import { Slide, ToastContainer } from "react-toastify";
import'react-toastify/dist/ReactToastify.css';
import About from './Components/About'



function App() {



  return (
    <>

      <Router>
      <ToastContainer 
        position="top-center" 
        autoClose={2000}
        transition = {Slide}
        theme="dark"    
        />
        {/* Navigation Navbar */}
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/product" element={<Product />} />
          <Route path="/product/:id" element={<SingalProduct />} />
          <Route path="/mencloths" element={<MensCloth />} />
          <Route path="/womencloths" element={<WomensCloth />} />
          <Route path="/cart" element={<CartProduct />} />
          <Route path="/signup" element={<Sighup />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      
      </Router>
    </>
  )
}

export default App
