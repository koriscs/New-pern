import React from 'react'
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Navbar } from 'react-bootstrap';
import './Navigation.css';

export default function Navigation() {
    const { isAuth } = useSelector(state=> state.auth);
    const { itemCount } = useSelector(state=> state.cart);
  return (
    <Navbar className='navbar navbar-light bg-light'>
    <div className='container'>
      <div>
        <NavLink to='/'>
          <span className='navbar-brand mb-0 '>Shop</span>
        </NavLink>
        <NavLink to='/cart' >
          <span className='navbar-brand' >Cart {itemCount}</span>
        </NavLink>
      </div>

      {isAuth ? (
        <div>
          <NavLink to='/account' className='mx-3'>
            <span className='navbar-brand'>Account</span>
          </NavLink>
        </div>
      ) : (
        <div>
          <NavLink to='/login'>
            <span className='navbar-brand'>Login</span>
          </NavLink>

          <NavLink to='/register' className='mx-3'>
            <span className='navbar-brand'>Register</span>
          </NavLink>
        </div>
      )}
    </div>
  </Navbar>
  )
}
