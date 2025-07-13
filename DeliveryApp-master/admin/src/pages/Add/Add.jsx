import React, { useEffect, useState } from 'react';
import "./Add.css";
import { assets } from '../../assets/assets';
import { toast } from 'react-toastify';
import axios from "axios"

const Add = ({url}) => {
  const [image, setImage] = useState(null);
  const [data, setData] = useState({
    name: "",
    description: "",
    price: "",
    category: "Salad"
  });

  const onChangeHandeler = (eve) => {
    const name = eve.target.name;
    const value = eve.target.value;
    setData(data => ({ ...data, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("price", Number(data.price));
    formData.append("category", data.category)
    formData.append("image", image)

    const response = await axios.post(`${url}/api/food/add`, formData);
    if (response.data.message) {
      setData({
        name: "",
        description: "",
        price: "",
        category: "Salad"
      })
      setImage(false);
      toast.success(response.data.message)

    }
    else {
      toast.error(response.data.message)
    }
  };


  return (
    <div className='add'>
      <form className='col' onSubmit={handleSubmit}>
        <div className='add-upload-image col'>
          <p>Upload Image</p>
          <label htmlFor="image">
            <img src={image ? URL.createObjectURL(image) : assets.upload_area} alt="Upload Image" />
          </label>
          <input onChange={(e) => setImage(e.target.files[0])} type="file" id='image' required hidden />
        </div>
        <div className='add-product-name col'>
          <p>Product Name</p>
          <input type="text" onChange={onChangeHandeler} value={data.name} placeholder='Type here ..' name='name' />
        </div>

        <div className='add-product-descrpition col'>
          <p>Product description</p>
          <textarea name="description" onChange={onChangeHandeler} value={data.description} rows="6" placeholder="Enter your content here ..."></textarea>
        </div>
        <div className='add-product-category-price'>
          <div className='col'>
            <p>Product Category</p>
            <select name="category" onChange={onChangeHandeler} value={data.category}>
              <option value="Salad">Salad</option>
              <option value="Rolls">Rolls</option>
              <option value="Deserts">Deserts</option>
              <option value="Sandwitch">Sandwitch</option>
              <option value="Cake">Cake</option>
              <option value="Pure Veg">Pure Veg</option>
              <option value="Noodles">Noodles</option>
            </select>
          </div>

          <div className='add-price col'>
            <p>Product Price</p>
            <input type="number" onChange={onChangeHandeler} value={data.price} name="price" placeholder='$20' min="0" step="0.01" />
          </div>
        </div>
        <button type='submit' className='add-btn'>ADD</button>
      </form>
    </div>
  );
};

export default Add;
