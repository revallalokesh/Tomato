import React, { useContext } from 'react'
import "./FoodItem.css"
import { assets } from '../../assets/assets'
import { StoreContext } from '../Context/StoreContext';

const FoodItem = ({ id, name, price, description, image }) => {
    const { cartItems,
        addToCart,
        removeFromCart, url } = useContext(StoreContext);

    return (
        <div className={`food_item `}>
            <div className="food_item_image">
                <img src={url + "/images/" + image} className='food_image_main' alt="Food_Item_Image" />
                {!cartItems[id] ?
                    <img src={assets.add_icon_white} className='add' onClick={() => addToCart(id)} />

                    : <div className='food_item_counter'>
                        <img src={assets.add_icon_green} alt="Add items" onClick={() => addToCart(id)} />
                        {cartItems[id]}
                        <img src={assets.remove_icon_red} alt="" onClick={() => removeFromCart(id)} />
                    </div>

                }
            </div>
            <div className="food_item_info">
                <div className="food_item_rating">
                    <p>{name}</p>
                    <img src={assets.rating_starts} />
                </div>

                <p className='food_item_desc'>{description}</p>
                <p className='food_item_price'>${price}</p>
            </div>

        </div>
    )
}

export default FoodItem;
