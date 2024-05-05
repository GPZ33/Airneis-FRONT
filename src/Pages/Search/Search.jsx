import "./Search.css";
import SearchFilters from "../../Components/SearchComponents/SearchFilters";
import {useCallback, useEffect, useState} from "react";
import sofa from "../../Components/Assets/products/sofa.jpg";
import chair from "../../Components/Assets/products/chair.jpg";
import lamp from "../../Components/Assets/products/lamp.jpg";
import jounalTable from "../../Components/Assets/products/journal table.jpg";
import buffet from "../../Components/Assets/products/buffet.jpg";
import office from "../../Components/Assets/products/office.jpeg";
import bed from "../../Components/Assets/products/bed.jpg";
import bar from "../../Components/Assets/products/bar.jpg";
import armoire from "../../Components/Assets/products/armoire.jpg";
import InfoCardWithPrice from "../../Components/InfoCard/InfoCardWithPrice";

const Search = () => {
    const products = [
        {id: "1", name: "Sofa", img: [sofa, sofa, sofa], description: "Description of the product", category: "Living room", price: 25, stock: true, materials: [
                "wood", "metal", "leather", "cherry wood"
            ]},
        {id: "2", name: "Chair", img: [chair,chair,chair], description: "Description of the product", category: "Living room", price: 25, stock: true, materials: [
                "wood", "metal", "leather", "cherry wood"
            ]},
        {id: "3", name: "Lamp", img: [lamp,lamp,lamp], description: "Description of the product", category: "Bedroom", price: 25, stock: true, materials: [
                "wood", "metal", "leather", "cherry wood"
            ]},
        {id: "4", name: "Journal Table", img: [jounalTable,jounalTable,jounalTable], description: "Description of the product", category: "Bedroom", price: 25, stock: false, materials: [
                "wood", "metal", "leather", "cherry wood"
            ]},
        {id: "5", name: "Sofa", img: [sofa, sofa, sofa], description: "Description of the product", category: "Kids room", price: 25, stock: false, materials: [
                "wood", "metal", "leather", "cherry wood"
            ]},
        {id: "6", name: "Chair", img: [chair,chair,chair], description: "Description of the product", category: "Dining room", price: 25, stock: true, materials: [
                "wood", "metal", "leather", "cherry wood"
            ]},
        {id: "7", name: "Lamp", img: [lamp,lamp,lamp], description: "Description of the product", category: "Kids room", price: 25, stock: false, materials: [
                "wood", "metal", "leather", "cherry wood"
            ]},
        {id: "8", name: "Journal Table", img: [jounalTable,jounalTable,jounalTable], description: "Description of the product", category: "Office", price: 25, stock: true, materials: [
                "wood", "metal", "leather", "cherry wood"
            ]},
        {id: "9", name: "Buffet", img: [buffet,buffet,buffet], description: "Description of the product", category: "Living room", price: 465, stock: true, materials: [
                "wood", "metal", "leather", "cherry wood"
            ]},
        {id: "10", name: "Office table", img: [office,office,office], description: "Description of the product", category: "Office", price: 277, stock: true, materials: [
                "wood", "metal", "leather", "cherry wood"
            ]},
        {id: "11", name: "Bed", img: [bed,bed,bed], description: "Description of the product", category: "Bedroom", price: 755, stock: true, materials: [
                "wood", "metal", "leather", "cherry wood"
            ]},
        {id: "12", name: "Bar", img: [bar,bar,bar], description: "Description of the product", category: "Living room", price: 250, stock: true, materials: [
                "wood", "metal", "leather", "cherry wood"
            ]},
        {id: "13", name: "Armoire", img: [armoire,armoire,armoire], description: "Description of the product", category: "Bedroom", price: 205, stock: true, materials: [
                "wood", "metal", "leather", "cherry wood"
            ]}
    ]
    const initialFilters = {
        minPrice: "",
        maxPrice: "",
        materials: [],
        categories: [],
        inStock: false
    };



    const [showFilters, setShowFilters] = useState(false);
    const [searchResults, setSearchResults] = useState(products);
    const [searchError, setSearchError] = useState(null);
    const [appliedFilters, setAppliedFilters] = useState(initialFilters); // State to store applied filters

    const parsePrice = (price) => {
        const parsed = parseFloat(price);
        return isNaN(parsed) ? null : parsed;
    };

    const toggleFilters = useCallback(() => {
        setShowFilters((prev) => !prev);
    }, []);

    const filterProducts = useCallback(() => {


        const searchText = document.getElementById("searchInput").value.toLowerCase();

        // Filter by text in the search bar
        let filteredResults = products.filter(product =>
            product.name.toLowerCase().includes(searchText) ||
            product.description.toLowerCase().includes(searchText)
        );

        // Filter by min price
        if (appliedFilters.minPrice !== "") {
            const minPrice = parsePrice(appliedFilters.minPrice);
            if (minPrice !== null) {
                filteredResults = filteredResults.filter((product) => product.price >= minPrice);
            }
        }

        // Filter by max price
        if (appliedFilters.maxPrice !== "") {
            const maxPrice = parsePrice(appliedFilters.maxPrice);
            if (maxPrice !== null) {
                filteredResults = filteredResults.filter((product) => product.price <= maxPrice);
            }
        }

        // Filter by materials
        if (appliedFilters.materials.length > 0) {
            filteredResults = filteredResults.filter(product =>
                appliedFilters.materials.some(material => product.materials.includes(material.name))
            );
        }

        // Filter by categories
        if (appliedFilters.categories.length > 0) {
            filteredResults = filteredResults.filter(product =>
                appliedFilters.categories.some(category => product.category === category.name)
            );
        }

        // Filter by in-stock
        if (appliedFilters.inStock) {
            filteredResults = filteredResults.filter(product => product.stock === true);
        }

        setSearchResults(filteredResults);
        setSearchError(null);
    }, [products, appliedFilters])


    // Function to handle search and apply filters buttons click
    const handleSearch = () => {

        filterProducts();
    }


    useEffect(() => {

        filterProducts();
    }, [filterProducts])



    return (
        <div className="search-page">
            <div >
                <div className="main-search-input-wrap">
                    <div className="main-search-input fl-wrap">
                        <div className="main-search-input-item">
                            <input type="text" id="searchInput" placeholder="Search Products..."/>
                        </div>
                        <button className="main-search-button" type="submit" onClick={handleSearch}>Search</button>
                        <button className="main-filter-button" type="button" onClick={toggleFilters}>Filter</button>
                    </div>
                </div>

            </div>
            {showFilters && <SearchFilters parsePrice={parsePrice} setSearchResults={setSearchResults} products={products} toggleFilters={toggleFilters} initialFilters={initialFilters} appliedFilters={appliedFilters} setAppliedFilters={setAppliedFilters}/>}
            {searchError && <p>{searchError}</p>}
            {searchResults && searchResults.length > 0 && (
                <div>
                    <InfoCardWithPrice props={searchResults}/>
                </div>

            )}
        </div>
    );
}

export default Search;