import './App.css';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Home from "./Pages/Home";
import Cart from "./Pages/Cart/Cart";
import Search from "./Pages/Search/Search";
import Footer from "./Components/Footer/Footer";
import Header from "./Components/Header/Header";
import ProductsOfCategory from "./Pages/ProductsOfCategory/ProductsOfCategory";
import CGU from "./Pages/Footer/TermsAndConditions"
import LegalNotice from "./Pages/Footer/LegalNotice";
import Contact from "./Pages/Footer/Contact";
import Product from "./Pages/Product";
import SearchFilters from "./Components/SearchComponents/SearchFilters";
import {CartProvider} from "./Context/CartContext";
import SignUp from "./Pages/SignUp/SignUp";
import LogIn from "./Pages/LogIn/LogIn";
import {useState} from "react";
import UserSettings from "./Pages/UserSettings/UserSettings";
import Checkout from "./Pages/Checkout/Checkout";
import Orders from "./Pages/Orders/Orders";
import Order from "./Components/Order/Order";
import ProductDashboard from './Pages/BackOffice/ProductDashboard';
import ProductCreation from './Pages/BackOffice/ProductCreation';
import CategoryDashboard from './Pages/BackOffice/CategoryDashboard';
import MaterialDashboard from './Pages/BackOffice/MaterialDashboard';
import AboutUs from "./Pages/AboutUs/AboutUs";


const App = () => {
    const [isAuthenticated, setIsAuthenticated] = useState();

    return (
        <BrowserRouter>
            <CartProvider>
            <Header isAuthenticated={isAuthenticated} setIsAuthenticated = {setIsAuthenticated} />
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/categories/:categoryId" element={<ProductsOfCategory />} />
                <Route path="/cart" element={<Cart/>}/>
                <Route path="/search" element={<Search/>}/>
                <Route path="/CGU" element={<CGU/>}/>
                <Route path="/legal_notice" element={<LegalNotice/>}/>
                <Route path="/contact" element={<Contact/>}/>
                <Route path="/products/:productId" element={<Product/>}/>
                <Route path="/search_filters" element={<SearchFilters/>}/>
                <Route path="/sign_up" element={<SignUp/>}/>
                <Route path="/log_in" element={<LogIn setIsAuthenticated = {setIsAuthenticated}/>}/>
                <Route path="/user_settings" element={<UserSettings/>}/>
                <Route path="/checkout" element={<Checkout/>}/>
                <Route path="/orders" element={<Orders/>}/>
                <Route path="/orders/:orderId" element={<Order/>}/>
                <Route path="/about_us" element={<AboutUs/>}/>
                <Route path="/backoffice" element={<ProductDashboard/>}/>
                <Route path="/backoffice/product_creation" element={<ProductCreation/>}/>
                <Route path="/backoffice/category_dashboard" element={<CategoryDashboard/>}/>
                <Route path="/backoffice/material_dashboard" element={<MaterialDashboard/>}/>
            </Routes>
            <Footer />
            </CartProvider>
        </BrowserRouter>
    );
}

export default App;
