import React from 'react'
import {assets} from "../../assets/assets.js"
import "./Navbar.css"
const Navbar = () => {
  return (
    <div className='navbar'>
        <img src={assets.logo} className='logo' alt="Logo" />
        <img src={assets.profile_image} alt="Profile Image" className='profile' />
    </div>
  )
}

export default Navbar;
