import React, { useContext, useEffect, useState } from 'react'

import "./Myorders.css"
import { StoreContext } from '../Context/StoreContext';
import axios from 'axios';
import { assets } from '../../assets/assets';
const Myorders = () => {
    const [data, setData] = useState([]);
    const { url, token } = useContext(StoreContext)
    const fetchOrders = async () => {
        const response = await axios.post(url + "/api/order/userOrders", {}, { headers: { token } })
        setData(response.data.data);
    }
    useEffect(() => {
        if (token) {
            fetchOrders();
        }
    }, [token])
    return (
        <div className='my-orders'>
            <h1>My orders </h1>
            <div className='container'>
                {
                    data.map((order, index) => {
                        return (
                            <div key={index} className='my-orders-main'>
                                <img src={assets.parcel_icon} alt="Orders Logo" />
                                <p>
                                    {order.items.map((item, index) => {
                                        if (index === order.items.length - 1) {
                                            return item.name + " x " + item.quantity
                                        }
                                        else {
                                            return item.name + " x " + item.quantity + ","
                                        }
                                    })}
                                </p>
                                <p>${order.amount}.00</p>
                                <p>Items : {order.items.length}</p>
                                <p className='status'><span>&#x25cf;</span>{order.status}</p>
                                <button className='trackOrder' onClick={fetchOrders()}>Track Order</button>

                            </div>
                        )
                    })
                }

            </div>

        </div>
    )
}

export default Myorders;
