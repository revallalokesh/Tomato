import React, { useContext, useEffect } from 'react'
import "./VerifyOrder.css"
import { useNavigate, useSearchParams } from 'react-router-dom'
import axios from 'axios';
import { StoreContext } from '../Context/StoreContext';

const VerifyOrder = () => {
    const [searchParams, setSearchParamas] = useSearchParams();
    const { url ,token} = useContext(StoreContext)
    const success = searchParams.get("success");
    const orderId = searchParams.get("orderId");
    const navigate = useNavigate();
    const verifyOrder = async () => {
        const response = await axios.post(url + "/api/order/verify", { success, orderId },{ headers: { token } });
        if (response.data.success) {
            navigate("/my-orders")
        }
        else {
            navigate("/")
        }

    }
    useEffect(() => {
        verifyOrder()
    }, [])
    return (
        <div className='verify'>
            <div className="spinner">

            </div>


        </div>
    )
}

export default VerifyOrder
