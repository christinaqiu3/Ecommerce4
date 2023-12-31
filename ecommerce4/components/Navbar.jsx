import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { UserButton } from "@clerk/nextjs";
import { AiOutlineShopping, AiOutlineUser, AiOutlineUserAdd } from 'react-icons/ai'

import { Cart } from './';
import { useStateContext} from '../context/StateContext';







const Navbar = () => {
  const { showCart, setShowCart, totalQuantities, userState } = useStateContext();


  

  return (
    <div className="navbar-container">
      <p className="logo">
        <Link href="/">mm NFTS yes</Link>
      </p>

      
      <p className="logo">
        {userState? (
            <Link href="/profile"><AiOutlineUser /></Link>
          ) : (
            <Link href="/login"><AiOutlineUserAdd /></Link>)}
      </p>
      

      <button type="button" className="cart-icon" onClick={() => setShowCart(true)}>
        <AiOutlineShopping />
        <span className="cart-item-qty">{totalQuantities}</span>
      </button>

      {showCart && <Cart />}
    </div>
  )
}

export default Navbar