import React, { useContext } from 'react';
import { StoreContext } from '../Context/StoreContext';
import { useNavigate } from 'react-router-dom';
import { FiShoppingCart } from "react-icons/fi";

import "./Cart.css";

const Cart = () => {
  const { foodList, cartItems, removeFromCart, getCartItemsTotal ,url} = useContext(StoreContext);
  const navigate = useNavigate();

  if (getCartItemsTotal() <= 0) {
    return (
      <div className='cart-first'>
        <div className='empty-cart'>
          
          <FiShoppingCart className='cart-icon' />
          <h1 className='noo-cart'>Your cart is empty now</h1>
          </div>
          <button className='cart-order-btn'><a href="/#explore-menu">Order Now</a></button>
      </div>)
  }

  return (
    <div className='cart'>
      <div className="cart-items">
        <div className="cart-items-titles">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br />
        <hr />
        {foodList.map((item) => {
          if (cartItems[item._id] > 0) {
            return (
              <div key={item._id}>
                <div className='cart-items-titles cart-items-in-cart'>
                  <img src={url+"/images/"+item.image} alt="" />
                  <p>{item.name}</p>
                  <p>${item.price}</p>
                  <p>{cartItems[item._id]}</p>
                  <p>${cartItems[item._id] * item.price}</p>
                  <p className='cross' onClick={() => removeFromCart(item._id)}>X</p>
                </div>
                <hr />
              </div>
            );
          }
          return null;
        })}
      </div>
      <div className="cart-checkout">
        <div className="cart-bottom">
          <h1>Checkout</h1>
          <div className="cart-checkout-main">
            <h2 style={{ marginBottom: "20px" }}>Cart Total</h2>
            <div className="cart-item-details">
              <p>Subtotal</p>
              <p>${getCartItemsTotal()}</p>
            </div>
            <hr />
            <div className="cart-item-details">
              <p>Delivery Fee</p>
              <p>${getCartItemsTotal() > 0 ? 2 : 0}</p>
            </div>
            <hr />
            <div className="cart-item-details">
              <b>Total</b>
              <b>${getCartItemsTotal() + 2}</b>
            </div>
          </div>
          <button onClick={() => navigate("/placeorder")}>PROCEED TO CHECKOUT</button>
        </div>
        <div className="cart-promocode">
          <div>
            <p>If you have a promo code, enter it here:</p>
            <div className="promocode-input">
              <input type="text" placeholder='Promo code' />
              <button>Submit</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
