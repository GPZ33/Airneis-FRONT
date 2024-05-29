import logo from "../Assets/logo.png";
import {Link} from "react-router-dom";
import React, {useContext, useEffect, useState} from "react";
import "./Header.css";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import SearchIcon from '@mui/icons-material/Search';
import {useCart} from "../../Context/CartContext";


const Header = ({isAuthenticated, setIsAuthenticated}) => {
    const { cart } = useCart();
    const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0)
    const [collapsedMenu, setCollapsedMenu] = useState(true);

    const handleToggleCollapse = () => {
        setCollapsedMenu(!collapsedMenu);
    };

    const handleLogout = () => {
        setIsAuthenticated(false);
        localStorage.removeItem("token");
        localStorage.removeItem("isAuthenticated");
    };
    useEffect(() => {
        const storedAuthStatus = localStorage.getItem("isAuthenticated");
        if (storedAuthStatus) {
            setIsAuthenticated(true);
        }
    }, []);
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
                            aria-label="Toggle navigation" onClick={handleToggleCollapse}>
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className={`collapse navbar-collapse ${collapsedMenu ? "" : "show"}`} id="navbarNavAltMarkup">
                        <div className="navbar-nav ml-auto">
                            {isAuthenticated ? (
                                <>
                                    <Link className="nav-link" to="/user_settings">Mes paramètres</Link>
                                    <Link className="nav-link" to="/orders">Mes commandes</Link>
                                    <Link className="nav-link" to="/CGU">CGU</Link>
                                    <Link className="nav-link" to="/legal">Mentions légales</Link>
                                    <Link className="nav-link" to="/contact">Contact</Link>
                                    <Link className="nav-link" to="/about">A propos d'AIRNEIS</Link>
                                    <button className="nav-link" onClick={handleLogout}>Se déconnecter</button>
                                </>
                            ) : (
                                <>
                                    <Link className="nav-link" to="/log_in">Se connecter</Link>
                                    <Link className="nav-link" to="/sign_up">S'inscrire</Link>
                                    <Link className="nav-link" to="/CGU">CGU</Link>
                                    <Link className="nav-link" to="/legal">Mentions légales</Link>
                                    <Link className="nav-link" to="/contact">Contact</Link>
                                    <Link className="nav-link" to="/about">A propos d'AIRNEIS</Link>
                                </>
                            )}
                        </div>
                    </div>
                </div>

            </div>
        </nav>


    );
};

export default Header;