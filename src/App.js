import './App.css';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import AllCategories from "./Pages/AllCategories/AllCategories";
import Home from "./Pages/Home";
import Materials from "./Pages/Materials";
import AllProducts from "./Pages/AllProducts";
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
import SignUp from "./Pages/SignUp";


const App = () => {
    return (
        <BrowserRouter>
            <CartProvider>
            <Header/>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/categories" element={<AllCategories />}/>
                <Route path="/categories/:categoryName" element={<ProductsOfCategory />} />
                <Route path="/materials" element={<Materials/>}/>
                <Route path="/products" element={<AllProducts/>}/>
                <Route path="/cart" element={<Cart/>}/>
                <Route path="/search" element={<Search/>}/>
                <Route path="/CGU" element={<CGU/>}/>
                <Route path="/legal_notice" element={<LegalNotice/>}/>
                <Route path="/contact" element={<Contact/>}/>
                <Route path="/products/:name" element={<Product/>}/>
                <Route path="/search_filters" element={<SearchFilters/>}/>
                <Route path="/sign_up" element={<SignUp/>}/>
            </Routes>
            <Footer />
            </CartProvider>
        </BrowserRouter>
    );
}

export default App;
