import "./Search.css";
import SearchFilters from "../../Components/SearchComponents/SearchFilters";
import {useCallback, useEffect, useState} from "react";
import InfoCardWithPrice from "../../Components/InfoCard/InfoCardWithPrice";
import materials from "../Materials";

const Search = () => {
    const initialFilters = {
        minPrice: "",
        maxPrice: "",
        materials: [],
        categories: [],
        inStock: false
    };
    const [products, setProducts] = useState([]);
    const [showFilters, setShowFilters] = useState(false);
    const [searchResults, setSearchResults] = useState(products);
    const [searchError, setSearchError] = useState(null);
    const [appliedFilters, setAppliedFilters] = useState(() => {
        const storedFilters = sessionStorage.getItem("appliedFilters");
        return storedFilters ? JSON.parse(storedFilters) : initialFilters;
    });
    const parsePrice = (price) => {
        const parsed = parseFloat(price);
        return isNaN(parsed) ? null : parsed;
    };

    const toggleFilters = useCallback(() => {
        setShowFilters((prev) => !prev);
    }, []);

    const filterProducts = useCallback(() => {
        let filteredResults = products;

        // Filter by text in the search bar
        const searchText = document.getElementById("searchInput").value.toLowerCase();
        if (searchText) {
            const filterByText = products.filter(product =>
                product.name.toLowerCase().includes(searchText) ||
                product.description.toLowerCase().includes(searchText)
            );
            if (filterByText.length > 0) {
                console.log("text",filterByText);
                filteredResults = filteredResults.filter(product =>
                    filterByText.some(filteredProduct => filteredProduct.id === product.id)
                );
            }
        }

        // Filter by min price
        if (appliedFilters.minPrice !== "") {
            const minPrice = parsePrice(appliedFilters.minPrice);
            if (!isNaN(minPrice)) {
                const filteredByMinPrice = filteredResults.filter(product => product.price >= minPrice);
                if (filteredByMinPrice.length > 0) {
                    console.log("min price",filteredByMinPrice);
                    filteredResults = filteredResults.filter(product =>
                        filteredByMinPrice.some(filteredProduct => filteredProduct.id === product.id)
                    );
                }
            }
        }
        // Filter by max price
        if (appliedFilters.maxPrice !== "") {
            const maxPrice = parsePrice(appliedFilters.maxPrice);
            if (!isNaN(maxPrice)) {
                const filterByMaxPrice = filteredResults.filter(product => product.price <= maxPrice);
                if (filterByMaxPrice.length > 0) {
                    console.log("max price",filterByMaxPrice);
                    filteredResults = filteredResults.filter(product =>
                        filterByMaxPrice.some(filteredProduct => filteredProduct.id === product.id)
                    );
                }
            }
        }

        // Filter by materials
        if (appliedFilters.materials.length > 0) {
            const filterByMaterials = filteredResults.filter(product =>
                appliedFilters.materials.every(material =>
                    product.materials.some(mat => mat.id === parseInt(material.name))
                )
            );

            if (filterByMaterials.length > 0) {
                console.log("materials",filterByMaterials);
                filteredResults = filteredResults.filter(product =>
                    filterByMaterials.some(filteredProduct => filteredProduct.id === product.id)
                );
            } else if (filterByMaterials.length === 0) {
                    setSearchResults([]);
                    setSearchError(null);
                    return;
            }
        }

        // Filter by categories
        if (appliedFilters.categories.length > 0) {
            const filterByCategory = filteredResults.filter(product =>
                appliedFilters.categories.some(category =>
                product.category[0].id === parseInt(category.name))
            );
            if (filterByCategory.length > 0) {
                console.log("category",filterByCategory);
                filteredResults = filteredResults.filter(product =>
                    filterByCategory.some(filteredProduct => filteredProduct.id === product.id)
                );
            }
        }


        // Filter by in-stock
        if (appliedFilters.inStock) {
            const filterByStock = filteredResults.filter(product => product.stock === true);
            if (filterByStock) {
                console.log("stock",filterByStock);
                filteredResults = filteredResults.filter(product =>
                    filterByStock.some(filteredProduct => filteredProduct.id === product.id)
                );
            }
        }
        setSearchResults(filteredResults);
        setSearchError(null);
        storeAppliedFilters(appliedFilters);
    }, [products, appliedFilters]);

    const handleSearch = () => {
        filterProducts();
    }

    const fetchProducts = async () => {
        try {
            const response = await fetch("http://127.0.0.1:8000/api/products");
            if (!response.ok) {
                throw new Error("Failed to fetch products");
            }
            const data = await response.json();
            setProducts(data["hydra:member"]);
            setSearchResults(data["hydra:member"]);
            setSearchError(null);
        } catch (error) {
            console.error("Error fetching products:", error);
            setSearchError("Failed to fetch products");
        }
    };

    const storeAppliedFilters = (filters) => {
        sessionStorage.setItem("appliedFilters", JSON.stringify(filters));
    };
    useEffect(() => {
        fetchProducts();
    }, []);

    useEffect(() => {
        filterProducts();
    }, [filterProducts]);



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
                    <InfoCardWithPrice props={searchResults} basePath="products"/>
                </div>

            )}
        </div>
    );
}

export default Search;