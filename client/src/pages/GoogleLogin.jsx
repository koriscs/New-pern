import React, { useEffect, useState } from 'react';
import { onGoogleLogin, fetchAccountInfo } from '../api/auth';
import { useDispatch } from 'react-redux';
import { authenticateUser } from '../redux/slices/authSlice';
import { addAccountInfo } from '../redux/slices/usersSlice';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function GoogleLogin() {
    const dispatch = useDispatch();
    const [error, setError] = useState();
    const navigate = useNavigate();

    const getUser = async () =>{
        try{
        const response = await onGoogleLogin();
        console.log("This is the response"+JSON.stringify(response));
       if (response.status === 200) {
         dispatch(authenticateUser());
         toast.success('Sucessfull login!', {
            position: "top-center",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            });
         navigate('/');
       } else {
        setError(response.message);
       }
      } catch (error) {
        console.log(error.response);
      }
      }
      const fetchUserInfo = async() =>{
        const { data } = await fetchAccountInfo();
        dispatch(addAccountInfo(data));
      }
 useEffect( () =>{
      getUser();
      fetchUserInfo();
  },[]);

  return (<div>
    {error ? <div>{error}</div>:<div>Loggen in sucessfully!</div>}
  </div>)
}
