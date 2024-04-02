import "./Search.css";
import SearchFilters from "../../Components/SearchComponents/SearchFilters";
import {useEffect, useState} from "react";
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

    const [showFilters, setShowFilters] = useState(false);
    const [searchResults, setSearchResults] = useState([]);
    const [searchError, setSearchError] = useState(null);
    const [appliedFilters, setAppliedFilters] = useState({}); // State to store applied filters

    useEffect(() => {
        // Load filters from local storage when component mounts
        const storedFilters = localStorage.getItem("appliedFilters");
        if (storedFilters) {
            setAppliedFilters(JSON.parse(storedFilters));
        }
    }, []);


    const toggleFilters = () => {
        setShowFilters(!showFilters);
    };

    // Function to filter search results based on search text
    const filterSearchResults = (searchText, products) => {
        const filteredResults = products.filter(product =>
            product.name.toLowerCase().includes(searchText.toLowerCase()) ||
            product.description.toLowerCase().includes(searchText.toLowerCase())
        );
        return filteredResults;
    };

    // Function to handle search button click
    const handleSearch = () => {
        const searchText = document.getElementById("searchInput").value.toLowerCase();
        // Check if search text is empty
        if (searchText.trim() === "") {
            setSearchError("Search text cannot be empty.");
            return;
        }

        // For demo purpose, assuming products array is available
        let filteredResults = products.filter(product =>
            product.name.toLowerCase().includes(searchText) ||
            product.description.toLowerCase().includes(searchText)
        );

        // Apply filters
        if (showFilters) {
            const minPrice = parseFloat(document.getElementById("minPrice").value);
            const maxPrice = parseFloat(document.getElementById("maxPrice").value);
            const materials = Array.from(document.querySelectorAll('input[name="material"]:checked')).map(input => input.value);
            const categories = Array.from(document.querySelectorAll('input[name="category"]:checked')).map(input => input.value);
            const inStock = document.getElementById("inStock").checked;

            // Apply price filter
            filteredResults = filteredResults.filter(product =>
                (!minPrice || product.price >= minPrice) &&
                (!maxPrice || product.price <= maxPrice)
            );

            // Apply material filter
            if (materials.length > 0) {
                filteredResults = filteredResults.filter(product =>
                    materials.some(material => product.materials.includes(material))
                );
            }

            // Apply category filter
            if (categories.length > 0) {
                filteredResults = filteredResults.filter(product =>
                    categories.includes(product.category)
                );
            }

            // Apply inStock filter
            if (inStock) {
                filteredResults = filteredResults.filter(product => product.stock);
            }
        }

        setSearchResults(filteredResults);
        setSearchError(null);
    }

    // Function to handle applying filters
    const applyFiltersHandler = () => {
        // Apply filters
        // Trigger search
        handleSearch();
        // Hide filters after applying
        setShowFilters(false);
    };

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
            {showFilters && <SearchFilters applyFilters={applyFiltersHandler} appliedFilters={appliedFilters} setAppliedFilters={setAppliedFilters}/>}
            {searchError && <p>{searchError}</p>}
            {searchResults.length > 0 && (
                <div>
                    <InfoCardWithPrice props={searchResults}/>
                </div>

            )}
        </div>
    );
}

export default Search;