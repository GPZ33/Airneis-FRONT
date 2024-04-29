import './App.css';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import AllCategories from "./Pages/AllCategories/AllCategories";
import Home from "./Pages/Home";
import Materials from "./Pages/Materials";
import AllProducts from "./Pages/AllProducts";
import Cart from "./Pages/Cart";
import Search from "./Pages/Search/Search";
import Footer from "./Components/Footer/Footer";
import Header from "./Components/Header/Header";
import ProductsOfCategory from "./Pages/ProductsOfCategory/ProductsOfCategory";
import CGU from "./Pages/Footer/TermsAndConditions"
import LegalNotice from "./Pages/Footer/LegalNotice";
import Contact from "./Pages/Footer/Contact";
import Product from "./Pages/Product";
import SearchFilters from "./Components/SearchComponents/SearchFilters";


const App = () => {
    return (
        <BrowserRouter>
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
                <Route path="/searchFilters" element={<SearchFilters/>}/>
            </Routes>
            <Footer />
        </BrowserRouter>

    );
}

export default App;
