import logo from "../Assets/logo.png";
import { Link, useNavigate } from "react-router-dom";
import React, { useContext, useEffect, useState } from "react";
import "./Header.css";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import SearchIcon from "@mui/icons-material/Search";
import { useCart } from "../../Context/CartContext";

const Header = ({ isAuthenticated, setIsAuthenticated, roles }) => {
  const { cart } = useCart();
  const navigate = useNavigate();
  const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);
  const [collapsedMenu, setCollapsedMenu] = useState(true);

  const handleToggleCollapse = () => {
    setCollapsedMenu(!collapsedMenu);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("token");
    localStorage.removeItem("isAuthenticated");
    setCollapsedMenu(true);
    navigate("/log_in");
  };
  useEffect(() => {
    const storedAuthStatus = localStorage.getItem("isAuthenticated");
    if (storedAuthStatus) {
      setIsAuthenticated(true);
    }
  }, []);
  return (
    <nav className="navbar" style={{borderBottom: "1px solid #ccc"}}>
      <div className="container-fluid">
        <div className="align-content-start d-flex justify-content-center align-items-center">
          <img className="menu-image p-1" src={logo} alt="logo" />
          <a className="navbar-brand text-white" href="/">
            ÀIRNEIS
          </a>
          {isAuthenticated && roles.includes("ROLE_ADMIN") && (
            <div className="admin-links">
              <Link className="nav-link" to="/backoffice/product_dashboard">
                Dashboard Produits
              </Link>
              <Link className="nav-link" to="/backoffice/category_dashboard">
                Dashboard Catégories
              </Link>
              <Link className="nav-link" to="/backoffice/material_dashboard">
                Dashboard Matériaux
              </Link>
              <Link className="nav-link" to="/backoffice/product_creation">
                Créer un produit
              </Link>
            </div>
          )}
        </div>

        <div className="align-content-end d-flex">
          <Link className="flex-end px-1" to="/search">
            <SearchIcon sx={{ color: "#FFC900", fontSize: 40 }} />
          </Link>
          <Link className="flex-end px-1" to="/cart">
            <ShoppingCartIcon sx={{ color: "#FFC900", fontSize: 40 }} />
            {totalQuantity > 0 && (
              <span className="cart-count">{totalQuantity}</span>
            )}
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNavAltMarkup"
            aria-controls="navbarNavAltMarkup"
            aria-expanded="false"
            aria-label="Toggle navigation"
            onClick={handleToggleCollapse}
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className={`collapse navbar-collapse ${
              collapsedMenu ? "" : "show"
            }`}
            id="navbarNavAltMarkup"
          >
            <div className="navbar-nav ml-auto">
              {isAuthenticated ? (
                <>
                  <Link
                    className="nav-link text-white"
                    to="/user_settings"
                    onClick={handleToggleCollapse}
                  >
                    Mes paramètres
                  </Link>
                  <Link className="nav-link text-white" to="/orders">
                    Mes commandes
                  </Link>
                  <Link className="nav-link text-white" to="/CGU">
                    CGU
                  </Link>
                  <Link className="nav-link text-white" to="/legal_notice">
                    Mentions légales
                  </Link>
                  <Link className="nav-link text-white" to="/contact">
                    Contact
                  </Link>
                  <Link className="nav-link text-white" to="/about_us">
                    A propos d'AIRNEIS
                  </Link>
                  <button className="nav-link" onClick={handleLogout}>
                    Se déconnecter
                  </button>
                </>
              ) : (
                <>
                  <Link className="nav-link" to="/log_in">
                    Se connecter
                  </Link>
                  <Link className="nav-link" to="/sign_up">
                    S'inscrire
                  </Link>
                  <Link className="nav-link" to="/CGU">
                    CGU
                  </Link>
                  <Link className="nav-link" to="/legal_notice">
                    Mentions légales
                  </Link>
                  <Link className="nav-link" to="/contact">
                    Contact
                  </Link>
                  <Link className="nav-link" to="/about_us">
                    A propos d'AIRNEIS
                  </Link>
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
