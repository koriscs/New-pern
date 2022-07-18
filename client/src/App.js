import './App.css';
import {BrowserRouter as Router, Navigate, Route, Routes, Outlet} from 'react-router-dom';
import { useSelector } from 'react-redux';

import Home from './pages/Home';
import Account from './pages/Account';
import Register from './pages/Register';
import Login from './pages/Login';
import Product from './pages/Product';
import Cart from './pages/Cart';
import Address from './pages/Address';
import Checkout from './pages/Checkout';
import { ToastContainer } from 'react-toastify';

const PrivateRoutes = () =>{

  const { isAuth } = useSelector(state=> state.auth);

  return <>{isAuth ? <Outlet /> : <Navigate to='/login'/>}</>

}

const OpenRoutes = () =>{
  const { isAuth } = useSelector(state=> state.auth);

  return <>{!isAuth ? <Outlet /> : <Navigate to='/account'/>}</>
}

function App() {

  return (
   <Router>
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/cart' element={<Cart />} />
      <Route path='/product/:productId' element={<Product />} />

      <Route element={<PrivateRoutes />}>
        <Route path='/account' element={<Account />} />
        <Route path='/account/address' element={<Address />} />
        <Route path='/checkout' element={<Checkout />} />
      </Route>

      <Route element={<OpenRoutes />}>
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
      </Route>
      
    </Routes>
    <ToastContainer
              position="top-center"
              autoClose={2000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              />
   </Router>
  )
}

export default App;
