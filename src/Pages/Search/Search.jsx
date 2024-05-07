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
        {id: "1", name: "Classic Sofa", img: [sofa, sofa, sofa], description: "Classic comfort meets modern style with our classic sofa. Crafted with premium materials and timeless design, this sofa is the perfect centerpiece for any living room.", category: "Living room", price: 350, stock: true, materials: [
                "wood", "metal", "leather", "cherry wood"
            ]},
        {id: "2", name: "Elegant Chair", img: [chair,chair,chair], description: "Elevate your seating experience with our elegant chair. Whether for lounging or entertaining, this chair combines sophistication and comfort effortlessly.", category: "Living room", price: 180, stock: true, materials: [
                "wood", "metal", "leather", "cherry wood"
            ]},
        {id: "3", name: "Modern Lamp", img: [lamp,lamp,lamp], description: "Illuminate your space with our modern lamp. Sleek design and adjustable brightness make it a perfect addition to any bedroom.", category: "Bedroom", price: 60, stock: true, materials: [
                "wood", "metal", "leather", "cherry wood"
            ]},
        {id: "4", name: "Vintage Journal Table", img: [jounalTable,jounalTable,jounalTable], description: "Add a touch of nostalgia to your bedroom with our vintage journal table. Perfect for writing and storing memories.", category: "Bedroom", price: 200, stock: false, materials: [
                "wood", "metal", "leather", "cherry wood"
            ]},
        {id: "5", name: "Kids Sofa", img: [sofa, sofa, sofa], description: "Make playtime extra cozy with our kids' sofa. Soft and durable, it's ideal for any kids' room.", category: "Kids room", price: 120, stock: false, materials: [
                "wood", "metal", "leather", "cherry wood"
            ]},
        {id: "6", name: "Dining Chair Set", img: [chair,chair,chair], description: "Complete your dining room with our dining chair set. Stylish and sturdy, it's perfect for family gatherings.", category: "Dining room", price: 280, stock: true, materials: [
                "wood", "metal", "leather", "cherry wood"
            ]},
        {id: "7", name: "Kids Room Lamp", img: [lamp,lamp,lamp], description: "Brighten up your child's room with our playful lamp. Fun designs make bedtime more enjoyable.", category: "Kids room", price: 40, stock: false, materials: [
                "wood", "metal", "leather", "cherry wood"
            ]},
        {id: "8", name: "Office Journal Table", img: [jounalTable,jounalTable,jounalTable], description: "Stay organized with our office journal table. Ample storage for all your work essentials.", category: "Office", price: 180, stock: true, materials: [
                "wood", "metal", "leather", "cherry wood"
            ]},
        {id: "9", name: "Luxurious Buffet", img: [buffet,buffet,buffet], description: "Entertain in style with our luxurious buffet. Elegant design meets practical storage.", category: "Living room", price: 800, stock: true, materials: [
                "wood", "metal", "leather", "cherry wood"
            ]},
        {id: "10", name: "Executive Office Table", img: [office,office,office], description: "Upgrade your workspace with our executive office table. Sleek and functional for maximum productivity.", category: "Office", price: 400, stock: true, materials: [
                "wood", "metal", "leather", "cherry wood"
            ]},
        {id: "11", name: "Master Bedroom Bed", img: [bed,bed,bed], description: "Indulge in luxury with our master bedroom bed. Plush comfort for a restful night's sleep.", category: "Bedroom", price: 1200, stock: true, materials: [
                "wood", "metal", "leather", "cherry wood"
            ]},
        {id: "12", name: "Home Bar Set", img: [bar,bar,bar], description: "Bring the bar home with our stylish bar set. Perfect for entertaining guests in your living room.", category: "Living room", price: 550, stock: true, materials: [
                "wood", "metal", "leather", "cherry wood"
            ]},
        {id: "13", name: "Chic Armoire", img: [armoire,armoire,armoire], description: "Organize your bedroom in style with our chic armoire. Featuring ample storage and a timeless design, this armoire adds both functionality and elegance to your personal sanctuary.", category: "Bedroom", price: 350, stock: true, materials: [
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