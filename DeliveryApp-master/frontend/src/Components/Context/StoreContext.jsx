import { createContext, useEffect, useState } from "react";
import axios from "axios";
import PropTypes from 'prop-types';


export const StoreContext = createContext(null);

const ContextProvider = (props) => {
    const url = import.meta.env.VITE_API_URL || "http://localhost:4000";

    const [token, setToken] = useState("");
    const [cartItems, setCartItems] = useState({});
    const [foodList, setFoodList] = useState([]);

    // Load cart and food data on mount
    useEffect(() => {
        async function loadInitData() {
            await fetchFoodList();
            if (localStorage.getItem("token")) {
                setToken(localStorage.getItem("token"));
                await loadCartData(localStorage.getItem("token"));
            }
        }
        loadInitData();
    }, []);

    const addToCart = async (id) => {
        if (!cartItems[id]) {
            setCartItems(prev => ({ ...prev, [id]: 1 }));
        }
        else {
            setCartItems(prev => ({ ...prev, [id]: prev[id] + 1 }));
        }
        if (token) {
            try {
                await axios.post(url + "/api/cart/addItem", { id }, { headers: { token } });
            }
            catch (error) {
                console.error("Error adding item to cart:", error);
            }
        }
    };

    const removeFromCart = async (id) => {
        setCartItems((prev) => ({ ...prev, [id]: prev[id] - 1 }));
        if (token) {
            try {
                await axios.post(url + "/api/cart/removeItem", { id }, { headers: { token } });
            }
            catch (error) {
                console.error("Error removing item from cart:", error);
            }
        }
    };

    const fetchFoodList = async () => {
        try {
            const response = await axios.get(url + "/api/food/list");
            if (response.data.success) {
                setFoodList(response.data.data);
            } else {
                console.error("Backend responded with an error while fetching food list:", response.data.message);
            }
        } catch (error) {
            console.error("Failed to fetch food list. Please ensure the backend server is running and accessible.", error);
        }
    };

    const loadCartData = async (token) => {
        try {
            const response = await axios.post(url + "/api/cart/getItems", {}, { headers: { token } });
            console.log(response.data.cartData);
            setCartItems(response.data.cartData);
        }
        catch (error) {
            console.error("Error loading cart data:", error);
        }
    };

    const getCartItemsTotal = () => {
        let total = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                const iteminfo = foodList.find((fitem) => fitem._id === item);
                if (iteminfo) {
                    total += iteminfo.price * cartItems[item];
                } else {
                    console.warn("Item not found in foodList for ID:", item);
                }
            }
        }
        return total;
    };

    const ContextValue = {
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        getCartItemsTotal,
        url,
        token,
        setToken,
        foodList
    };

    useEffect(() => {
        console.log("Cart Items:", cartItems);
    }, [cartItems]);

    return (
        <StoreContext.Provider value={ContextValue}>
            {props.children}
        </StoreContext.Provider>
    );
};

ContextProvider.propTypes = {
    children: PropTypes.node.isRequired
};

export default ContextProvider;
