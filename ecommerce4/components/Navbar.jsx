import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { UserButton } from "@clerk/nextjs";
import { AiOutlineShopping, AiOutlineUser, AiOutlineUserAdd } from 'react-icons/ai'

import { Cart } from './';
import { useStateContext} from '../context/StateContext';

import {
  getKindeServerSession,
  RegisterLink,
  LoginLink,
  LogoutLink,
} from "@kinde-oss/kinde-auth-nextjs/server"




const Navbar = () => {
  const { showCart, setShowCart, totalQuantities, userState } = useStateContext();


  

  return (
    <div className="navbar-container">
      <p className="logo">
        <Link href="/">mm NFTS yes</Link>
      </p>

      
      {!isAuthenticated() ? (
                    <>
                        <LoginLink className="bg-black text-white px-4 py-2 rounded">Sign in</LoginLink>
                        <RegisterLink className="bg-black text-white px-4 py-2 rounded">Sign up</RegisterLink>
                    </>
                ) : (
                    <div className="flex gap-4 font-normal">
                        {user?.picture ? (
                            <Image
                                className="rounded-full"
                                src={user?.picture}
                                width={55}
                                height={55}
                                alt="user profile avatar"
                            />
                        ) : (
                            <div className="bg-black text-white rounded-full p-4">
                                {user?.given_name?.[0]}
                                {user?.family_name?.[0]}
                            </div>
                        )}
                        <div>
                            <p className="text-2xl">
                                {user?.given_name} {user?.family_name}
                            </p>

                            <LogoutLink className="text-black">Log out</LogoutLink>
                        </div>
                    </div>
                )}
      

      <button type="button" className="cart-icon" onClick={() => setShowCart(true)}>
        <AiOutlineShopping />
        <span className="cart-item-qty">{totalQuantities}</span>
      </button>

      {showCart && <Cart />}
    </div>
  )
}

export default Navbar