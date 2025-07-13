import React, { useContext, useEffect, useState } from 'react'
import "./PlaceHolder.css"
import { useNavigate } from 'react-router-dom';

import { StoreContext } from '../Context/StoreContext'
import axios from 'axios';

// import "../Cart/Cart.css"

const PlaceHolder = () => {
  const { getCartItemsTotal, token, foodList, url, cartItems } = useContext(StoreContext)
  const navigate = useNavigate();
  const [data, setData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: ""
  });
  const onChangeHandeler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData(data => ({ ...data, [name]: value }))
  }
  const submitOrder = async (e) => {
    e.preventDefault();
    let OrderedItems = [];

    foodList.map((item) => {
      if (cartItems[item._id] > 0) {
        let itemInfo = item;
        console.log(itemInfo)
        itemInfo["quantity"] = cartItems[item._id];
        OrderedItems.push(itemInfo);
      }
    })
    let orderedData = {
      address: data,
      items: OrderedItems,
      amount: getCartItemsTotal() + 2,
    };
    try {
      let response = await axios.post(url + "/api/order/placeOrder", orderedData, { headers: { token } });
      console.log(response);
      if (response.data.success) {
        const { session_url } = response.data;
        window.location.replace(session_url);
      }
    } catch (error) {
      console.error("Error placing order:", error);
    }

  }
  useEffect(() => {
    if (!token){
      navigate("/cart")
    }
    else if(getCartItemsTotal() === 0){
      navigate("/cart")
    }

  }, [data])

  return (
    <form className='placeorder' onSubmit={submitOrder} >
      <div className="placeorderleft">
        <p className='title'>Delivery Information</p>
        <div className='multifields'>
          <input required type="text" placeholder='First name' name='firstname' onChange={onChangeHandeler} value={data.firstname} />
          <input required type="text" placeholder='Last name' name='lastname' onChange={onChangeHandeler} value={data.lastname} />
        </div>

        <input required type="email" placeholder='Email' name='email' onChange={onChangeHandeler} value={data.email} />
        <input required type="text" placeholder='Street' name='street' onChange={onChangeHandeler} value={data.street} />
        <div className="multifields">
          <input required type="text" placeholder='City' name='city' onChange={onChangeHandeler} value={data.city} />
          <input required type="text" placeholder='State' name='state' onChange={onChangeHandeler} value={
            data.state
          } />
        </div>
        <div className="multifields">
          <input required type="text" placeholder='Zipcode' name='zipcode' onChange={onChangeHandeler} value={data.zipcode} />
          <input required type="text" placeholder='Country' name='country' onChange={onChangeHandeler} value={data.country} />
        </div>

        <input required type="text" placeholder='Phone' name='phone' onChange={onChangeHandeler} value={data.phone} />

      </div>
      <div className="placeorderright">
        <div className="cart-checkout-main">
          <h2 style={{ marginBottom: "20px" }}>Cart Total</h2>
          <div className="cart-item-details">
            <p>Subtotal</p>
            <p>${getCartItemsTotal()}</p>

          </div>
          <hr />
          <div className="cart-item-details">
            <p>Delivery Fee</p>
            <p>2</p>

          </div>
          <hr />
          <div className="cart-item-details">
            <b>Total</b>
            <b>${getCartItemsTotal() + 2}</b>
            {/* <hr /> */}
          </div>
          <button type='submit' >PROCEED TO PAYMENT</button>

        </div>

      </div>
    </form>
  )
}

export default PlaceHolder
