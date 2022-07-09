import React from 'react'
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function Navigation() {
    const { isAuth } = useSelector(state=> state.auth)

  return (
    <nav className='navbar navbar-light bg-light'>
    <div className='container'>
      <div>
        <NavLink to='/'>
          <span className='navbar-brand mb-0 h1'>Home</span>
        </NavLink>
        <NavLink to='/cart' >
          <span>Cart</span>
        </NavLink>
      </div>

      {isAuth ? (
        <div>
          <NavLink to='/account' className='mx-3'>
            <span>Account</span>
          </NavLink>
        </div>
      ) : (
        <div>
          <NavLink to='/login'>
            <span>Login</span>
          </NavLink>

          <NavLink to='/register' className='mx-3'>
            <span>Register</span>
          </NavLink>
        </div>
      )}
    </div>
  </nav>
  )
}
