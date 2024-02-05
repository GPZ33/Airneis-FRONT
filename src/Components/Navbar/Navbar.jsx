import React from "react";
import "./Navbar.css";
import logo from '../Assets/logo.png';
import cart_logo from '../Assets/cart_logo.png';

const Navbar = () => {
    return (
        <div className="navbar">
            <div className="nav-logo">
                <img src={logo} alt="logo" />
                <p>AIRNEIS</p>
            </div>
            <ul className="nav-menu">
                <li>Categories<hr/></li>
                <li>Materials</li>
                <li>All products</li>
                <li>Highlights</li>
            </ul>
            <div className="nav-login-cart">
                <button>Login</button>
                <img src={cart_logo} alt="cart_logo" />
            </div>
        </div>
    );
};

export default Navbar;