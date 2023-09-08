import React, { createContext, useContext, useState, useEffect, useReducer } from 'react';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import Cookies from 'js-cookie';


const initialState = {
  userInfo: Cookies.get('userInfo') ? JSON.parse(Cookies.get('userInfo')) : null,
};

const Context = createContext();

export const StateContext = ({ children }) => {
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQuantities, setTotalQuantities] = useState(0);
  const [qty, setQty] = useState(1);
  const [state, dispatch] = useReducer(reducer, initialState);

  let foundProduct;
  let index;


  useEffect(() => {
    const storedUserInfo = Cookies.get('userInfo');
    if (storedUserInfo) {
      dispatch({ type: 'USER_LOGIN', payload: JSON.parse(storedUserInfo) });
    }
  }, []);


  const setUserState = (userData) => {
    if (userData) {
      Cookies.set('userInfo', JSON.stringify(userData));
      dispatch({ type: 'USER_LOGIN', payload: userData });
    } else {
      Cookies.remove('userInfo');
      dispatch({ type: 'USER_LOGOUT' });
    }
  };

  // Function to clear user state
  const clearUserState = () => {
    setUserState(null); 
  };

  const userLogin = async (userData) => {
    try {
      const response = await axios.post('/api/users/login', userData);
      const { data } = response;
      Cookies.set('userInfo', JSON.stringify(data));
      
      // Update the user state to indicate a successful login
      setUserState(data);
  
      return data;
    } catch (error) {
      console.error('Login error:', error);
      throw error; 
    }
  };

  const userRegister = async (userData) => {
    try {
      const response = await axios.post('/api/users/register', userData);
      const { data } = response;
      Cookies.set('userInfo', JSON.stringify(data));
      
      // No need to set userState here, it should be set elsewhere based on login status.
      
      return data;
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  }
  

  



  
  

  





  const onAdd = (product, quantity) => {
    const checkProductInCart = cartItems.find((item) => item._id === product._id);
    
    setTotalPrice((prevTotalPrice) => prevTotalPrice + product.price * quantity);
    setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + quantity);
    
    if(checkProductInCart) {
      const updatedCartItems = cartItems.map((cartProduct) => {
        if(cartProduct._id === product._id) return {
          ...cartProduct,
          quantity: cartProduct.quantity + quantity
        }
      })

      setCartItems(updatedCartItems);
    } else {
      product.quantity = quantity;
      
      setCartItems([...cartItems, { ...product }]);
    }

    toast.success(`${qty} ${product.name} added to the cart.`);
  } 

  const onRemove = (product) => {
    foundProduct = cartItems.find((item) => item._id === product._id);
    const newCartItems = cartItems.filter((item) => item._id !== product._id);

    setTotalPrice((prevTotalPrice) => prevTotalPrice -foundProduct.price * foundProduct.quantity);
    setTotalQuantities(prevTotalQuantities => prevTotalQuantities - foundProduct.quantity);
    setCartItems(newCartItems);
  }

  const toggleCartItemQuanitity = (id, value) => {
    foundProduct = cartItems.find((item) => item._id === id)
    index = cartItems.findIndex((product) => product._id === id);
    const newCartItems = cartItems.filter((item) => item._id !== id)

    if(value === 'inc') {
      setCartItems([...newCartItems, { ...foundProduct, quantity: foundProduct.quantity + 1 } ]);
      setTotalPrice((prevTotalPrice) => prevTotalPrice + foundProduct.price)
      setTotalQuantities(prevTotalQuantities => prevTotalQuantities + 1)
    } else if(value === 'dec') {
      if (foundProduct.quantity > 1) {
        setCartItems([...newCartItems, { ...foundProduct, quantity: foundProduct.quantity - 1 } ]);
        setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.price)
        setTotalQuantities(prevTotalQuantities => prevTotalQuantities - 1)
      }
    }
  }

  const incQty = () => {
    setQty((prevQty) => prevQty + 1);
  }

  const decQty = () => {
    setQty((prevQty) => {
      if(prevQty - 1 < 1) return 1;
     
      return prevQty - 1;
    });
  }

  return (
    <Context.Provider
      value={{
        showCart,
        setShowCart,
        cartItems,
        totalPrice,
        totalQuantities,
        qty,
        userState: state.userInfo,
        setUserState,
        incQty,
        decQty,
        onAdd,
        toggleCartItemQuanitity,
        onRemove,
        setCartItems,
        setTotalPrice,
        setTotalQuantities 
      }}
    >
      {children}
    </Context.Provider>
  )
}

export const useStateContext = () => useContext(Context);


function reducer(state, action) {
  switch (action.type) {
    case 'USER_LOGIN':
      return { ...state, userState: action.payload };
    case 'USER_LOGOUT':
      return { ...state, userState: null };
    default:
      return state;
  }
}

export function StoreProvider(props) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };
  return <Store.Provider value={value}>{props.children}</Store.Provider>;
}