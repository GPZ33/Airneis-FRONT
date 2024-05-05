import logo from "../Assets/logo.png";
import {Link} from "react-router-dom";
import React, {useContext, useState} from "react";
import "./Header.css";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import SearchIcon from '@mui/icons-material/Search';
import {useCart} from "../../Context/CartContext";


const Header = () => {
    const { cart } = useCart(); // Access the cart from the context
    // Calculate the total quantity of items in the cart
    const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0)

    return (
        <nav className="navbar navbar-light bg-light">
            <div className="container-fluid">
                <div className="align-content-start d-flex justify-content-center align-items-center">
                    <img className="menu-image p-1" src={logo} alt="logo"/>
                    <a className="navbar-brand" href="/">ÀIRNEIS</a>
                </div>

                <div className="align-content-end d-flex">
                    <Link className="flex-end px-1" to="/search"><SearchIcon
                        sx={{color: "#151D53", fontSize: 40}}/></Link>
                    <Link className="flex-end px-1" to="/cart">
                        <ShoppingCartIcon sx={{color: "#151D53", fontSize: 40}}/>
                        {totalQuantity > 0 && (
                            <span className="cart-count">{totalQuantity}</span>
                        )}
                    </Link>
                    <button className="navbar-toggler" type="button" data-toggle="collapse"
                            data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false"
                            aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                        <div className="navbar-nav ml-auto">
                            <Link className="nav-link" to="/login">Log in</Link>
                            <Link className="nav-link" to="/sign_up">Sign up</Link>
                            <Link className="nav-link" aria-current="page" to="/categories">Categories</Link>
                            <Link className="nav-link" to="/materials">Materials</Link>
                            <Link className="nav-link" to="/all_products">All products</Link>
                            <Link className="nav-link" to="/highlights">Highlights</Link>
                        </div>
                    </div>
                </div>

            </div>
        </nav>


    );
};

export default Header;