import React, { useEffect, useState } from 'react'
import "./List.css"
import axios from "axios";
import { toast } from 'react-toastify';
const List = ({url}) => {
  const [list, setList] = useState([]);

  useEffect(() => {
    fetchList()
  }, [])
  const removeFood = async (foodId)=>{
   const response = await axios.post(`${url}/api/food/remove`,{id:foodId});
   await fetchList()

   if(response.data.success){
    toast.success(response.data.message)
   }
   else{
    toast.error(response.data.message)
   }
  }
  const fetchList = async () => {
    const response = await axios.get(`${url}/api/food/list`);
    console.log(response.data)
    if (response.data.success) {
      setList(response.data.data)
    }
    else {
      toast.error("Error while fetching the items")
    }
  }
  return (
    <div className='list add col'>
      <p className='list-heading'>All Food Items</p>
      <div className='listintable'>
        <div className='list-table-format title'>
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>price</b>
          <b>Action</b>
        </div>{
          list.map((item, index) => {
            console.log(item)
            return (
              <div key={index} className='list-table-format content'>
                <img src={`${url}/images/${item.image}`} alt="ImagePart" />
                <p>{item.name}</p>
                <p>{item.category}</p>
                <p>{item.price}</p>
                <p className='cursur' onClick={()=>removeFood(item._id)}>X</p>
              </div>

            )
          })
        }

      </div>

    </div>
  )
}

export default List
