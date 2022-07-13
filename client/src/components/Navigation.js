import React from 'react'
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Cart from '../img/blue-cart.png'
import './Navigation.css';

export default function Navigation() {
    const { isAuth } = useSelector(state=> state.auth);
    const { itemCount } = useSelector(state=> state.cart);
  return (
    <nav className='navbar navbar-light bg-light'>
    <div className='container'>
      <div>
        <NavLink to='/' className='text-decoration-none'>
          <span className='navbar-item mx-3 '>Shop</span>
        </NavLink>
        <NavLink to='/cart'className='text-decoration-none cart-container' >
          <img src={Cart} width='20' height='20' />
          <span className='navbar-item mx-3 cart' >({itemCount})</span>
        </NavLink>
      </div>

      {isAuth ? (
        <div>
          <NavLink to='/account' className='mx-3 text-decoration-none'>
            <span className='navbar-item'>Account</span>
          </NavLink>
        </div>
      ) : (
        <div>
          <NavLink to='/login' className=' mx-3 text-decoration-none'>
            <span className='navbar-item'>Login</span>
          </NavLink>

          <NavLink to='/register' className=' mx-3 text-decoration-none'>
            <span className='navbar-item' id='navbar-item'>Register</span>
          </NavLink>
        </div>
      )}
    </div>
  </nav>
  )
}
