import logo from "../Assets/logo.png";
import {Link} from "react-router-dom";
import React, {useContext, useState} from "react";
import "./Header.css";
import LoginIcon from "@mui/icons-material/Login";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import SearchIcon from '@mui/icons-material/Search';
import {CartContext} from "../ProductDetails/ProductDetails";


const Header = () => {
    const {productsToCart} = useContext(CartContext);
    const cartCount = productsToCart.length;
    const [menu, setMenu] = useState(false);
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
                        {cartCount > 0 && ( // Only show the badge if there are items in the cart
                            <span className="cart-badge">{cartCount}</span>
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
                            <Link className="nav-link" to="/signup">Sign up</Link>
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