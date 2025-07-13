import React, { useContext, useState } from 'react';
import "./Navbar.css";
import { assets } from "../../assets/assets";
import { Link, useNavigate } from 'react-router-dom';
import { StoreContext } from '../Context/StoreContext';
import { RxCross2 } from "react-icons/rx";
import { MdOutlineSort } from "react-icons/md";

const Navbar = ({ setShowLogin }) => {
  const [menu, setmenu] = useState("home");
  const [showMenu, setShowMenu] = useState(false);
  const { getCartItemsTotal, token, setToken } = useContext(StoreContext);
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem("token");
    setToken("")
    navigate("/");

  }
  return (
    <div className='navbar-top'>
      <Link to={"/"}>
        <img src={assets.logo} className='image-nav' />
      </Link>
      <ul >
        <Link to="/" onClick={() => setmenu("home")} className={menu === "home" ? "active" : ""}>Home</Link>
        <a href='/#explore-menu' onClick={() => setmenu("menu")} className={menu === "menu" ? "active" : ""}>Menu</a>
        <a href="/#app-download" onClick={() => setmenu("mobileapp")} className={menu === "mobileapp" ? "active" : ""}>Mobile-app</a>
        <a href='/#footer' onClick={() => setmenu("contact")} className={menu === "contact" ? "active" : ""}>Contact - Us</a>
      </ul>
      <div className='navbar-right'>
        <img src={assets.search_icon} alt="Search Icon" />
        <div className="navbar-basket">
          <Link to="/cart">
            <img src={assets.basket_icon} alt="Basket Icon" />
          </Link>
          <div className={getCartItemsTotal() === 0 ? "" : 'dot'}></div>
        </div>
        {!token ? (
          <button onClick={() => setShowLogin(true)} className='nav-signin-button'>Sign in</button>
        ) : (
          <div className='navbar-profile'>
            <img src={assets.profile_icon} alt="Profile icon" />
            <div className='navbar-dropdown2'>
              <li>
                <img src={assets.bag_icon} alt="Orders" />
                <Link to={"my-orders"}>Orders</Link>
              </li>
              <hr />
              <li>
                <img src={assets.logout_icon} alt="Logout" />
                <p onClick={logout}>Logout</p>
              </li>
            </div>
          </div>
        )}

        <MdOutlineSort className='sidebar-icon' onClick={() => setShowMenu(prev => !prev)} />
        {/* Side bar for mobile */}
        <div className={`side-bar ${showMenu ? "side-active" : ""}`}>
          <RxCross2 className='cross-icon' onClick={() => setShowMenu(false)} />
          <ul className='side-nav' >
            <Link to="/">Home</Link>
            <a href='#explore-menu ' onClick={() => setShowMenu(false)}>Menu</a>
            <a href="#app-download" onClick={() => setShowMenu(false)}>Mobile-app</a>
            <a href='#footer' onClick={() => setShowMenu(false)}>Contact - Us</a>
            <button className='side-sign' onClick={() => {
              setShowMenu(false)
              setShowLogin(true)
            }}>Sign in</button>

          </ul>

        </div>
      </div>

      {/* Mobile Sidebar */}

    </div>
  );
};

export default Navbar;
