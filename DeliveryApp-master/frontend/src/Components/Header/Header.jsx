import React from 'react'
import "./Header.css"


const Header = () => {
  return (
    <div className='header-top'>
      <div className='header-contents'>
        <h1>Order Your favourite food here</h1>
        <p>Choose from a diverse menu featuring  a delectable array of dishes crafted with the finest ingrediants and culinary expertise.Our misson is to satisfy your
          craving and elevate you dining expereince, one delicious meal at a time.</p>
        <a className='viewmenu' href='/#explore-menu'>View Menu</a>
      </div>
    </div>
  )
}

export default Header
