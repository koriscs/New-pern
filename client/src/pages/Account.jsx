import React from 'react';
import Layout from '../components/Layout';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { fetchAccountInfo , onLogout} from '../api/auth';
import { unauthenticateUser } from '../redux/slices/authSlice';
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';

export default function Account() {

  const dispatch = useDispatch()
  const [loading, setLoading] = useState(true)
  /*
  const [userId, setUserId] = useState('');
  const [userEmail, setUserEmail] = useState('');
*/
  const [userinfo, setUserinfo] = useState({});
  const logout = async () => {
    try {
      await onLogout()

      dispatch(unauthenticateUser())
    } catch (error) {
      console.log(error.response)
    }
  }

  const accountInfo = async () => {
    try {
      const { data } = await fetchAccountInfo()
      
      setUserinfo(data);
      setLoading(false)
      
    } catch (error) {
      logout()
    }
  }

  useEffect(() => {
    accountInfo()
  })

  return  loading ? (
     <Layout>
      <h1>Loading...</h1>
    </Layout>
  ) : (
    <div>
      <Layout>
        <h1>Account</h1>
        <h2>{`${userinfo.id} , ${userinfo.email}`}</h2>

        <Link to='/account/address' ><Button>Give Address information</Button></Link>
        <button onClick={() => logout()} className='btn btn-primary'>
          Logout
        </button>
      </Layout>
    </div>
  )
}
