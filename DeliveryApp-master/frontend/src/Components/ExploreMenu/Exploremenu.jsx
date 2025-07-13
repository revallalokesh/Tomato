import React from 'react'
import "./Exploremenu.css"
import { menu_list } from '../../assets/assets'
const Exploremenu = ({category,setCategory}) => {
  return (
    <div className='explore-menu' id='explore-menu'>
        <h1>Explore our Menu</h1>
        <p className='explore-menu-text'>Choose from a diverse menu featuring  a delectable array of dishes crafted with the finest ingrediants and culinary expertise.Our misson is to satisfy your 
        craving and elevate you dining expereince, one delicious meal at a time.</p>
        <div className='explore-menu-list'>
{menu_list.map((item,index)=>{
    return <div onClick={()=>setCategory(prev => prev===item.menu_name?"All":item.menu_name)} key={index} className='explore-menu-item'>
        <img className={category===item.menu_name?"active":""} src={item.menu_image} />
        <p>{item.menu_name}</p>
        </div>

})}
        </div>
        <hr />
      
    </div>
  )
}

export default Exploremenu
