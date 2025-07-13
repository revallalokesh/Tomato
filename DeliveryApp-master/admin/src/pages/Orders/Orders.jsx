import React, { useEffect, useState } from 'react'
import "./Orders.css"
import axios from "axios";
import { toast } from 'react-toastify';
import { assets } from '../../assets/assets';

const Orders = ({ url }) => {

  const [orders, setOrders] = useState([]);
  const updateStatus = async (event,orderId)=>{
    const response = await axios.post(url+"/api/order/status",{orderId:orderId,status:event.target.value})
    console.log(response)
    if(response.data.success){
      await listOrders();
    }
  }
  const listOrders = async () => {
    const response = await axios.get(url + "/api/order/listOrders")
    console.log(response.data.data)
    if (response.data.success) {

      setOrders(response.data.data)
      console.log(response.data.data)

    }
    else {
      console.log("Error in listing Orders in Admin Panel")
      toast.error("Somthing Error happend !")

    }

  }
  useEffect(() => {
    listOrders()
  }, [])
  return (
    <div className='orders add'>
      <h1>Orders Page</h1>
      <div className='order-list'>
        {
          orders.map((order, index) => (
            <div key={index} className='order-item'>
              <img src={assets.parcel_icon} alt='Order Image' />
              <div className='about'>
                <p className="items">
                  {
                    order.items.map((item, index) => (
                      // Return the item name and quantity with the correct formatting
                      index === order.items.length - 1 ? (
                        item.name + " x " + item.quantity
                      ) : (
                        item.name + " x " + item.quantity + ", "
                      )
                    ))
                  }
                </p>
                <p className='name-order'>
                  {`${order.adress.firstname} ` + ` ${order.adress.lastname}`}
                </p>
                <div className="order-addresss">
                  <p>{order.adress.street + ", "}</p>
                  <p>{order.adress.city + ", " + order.adress.state + ", " + order.adress.zipcode}</p>
                </div>
                <p className='order-phone'>{order.adress.phone}</p>
              </div>
                    <p>Items : {order.items.length}</p>
                    <p>${order.amount}</p>
                    <select className='select-order' onChange={(e)=>updateStatus(e,order._id)} value={order.status}>
                      <option value="Food Processing ...">Food Processing</option>
                      <option value="Out for delivery">Out for delivery</option>
                      <option value="Delivered">Delivered</option>
                    </select>
            </div>
          ))
        }
      </div>
    </div>

  )
}

export default Orders
