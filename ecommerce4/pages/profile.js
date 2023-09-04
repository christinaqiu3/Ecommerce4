import React, {useState} from 'react';
import NextLink from 'next/link';
import Link from 'next/link';
import { useSnackbar } from 'notistack';
import { userLogin } from '../lib/auth';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import { useStateContext } from '../context/StateContext';

export default function profile() {

  const { enqueueSnackbar } = useSnackbar();

  const [userState, setUserState, clearUserState] = useState(false);

  const router = useRouter();

  const handleLogout = () => {

    setAnchorEl(null);
    dispatch({ type: 'USER_LOGOUT' }); // Dispatch the USER_LOGOUT action to clear user state
    clearUserState();
    Cookies.remove('userInfo');
    Cookies.remove('cartItems');
    //router.push('/');
  }

  const navigateToLogin = () => { router.push('/login') }



  return (
    <div className='products-heading'>
      <h2>Profile</h2>
      <p>
      {userState ? (
        <button onClick={handleLogout}>Logout</button>
      ) : (
        <button onClick={navigateToLogin}>Login</button>
      )}
      </p>
    </div>
    
  )
}