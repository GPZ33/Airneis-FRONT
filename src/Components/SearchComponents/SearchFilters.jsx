import "./SearchFilters.css";
import {useEffect, useRef, useState} from "react";

const SearchFilters = ({parsePrice, setSearchResults, products, toggleFilters, initialFilters, appliedFilters, setAppliedFilters } ) => {
    const [materials, setMaterials] = useState([]);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        // Fetch materials
        fetch("http://127.0.0.1:8000/api/materials")
            .then((response) => response.json())
            .then((data) => setMaterials(data["hydra:member"]))
            .catch((error) => console.error("Error fetching materials:", error));

        // Fetch categories
        fetch("http://127.0.0.1:8000/api/categories")
            .then((response) => response.json())
            .then((data) => setCategories(data["hydra:member"]))
            .catch((error) => console.error("Error fetching categories:", error));
    }, []);

    const resetFilters = () => {
        setAppliedFilters(initialFilters);
        toggleFilters();
        setSearchResults(products)
    };

    const submitFilters = (event) => {
        event.preventDefault();
        const selectedMaterials = Array.from(event.target.elements['material'].selectedOptions)
            .map(option => option.value);

        const categories = Array.from(event.target.elements['category'].options)
            .filter(option => option.selected)
            .map(option => option.value);

        const inStock = event.target.elements['inStock'].checked;
        const minPrice = parsePrice(event.target.elements['minPrice'].value);
        const maxPrice = parsePrice(event.target.elements['maxPrice'].value);


        setAppliedFilters(prevFilters => ({
            ...prevFilters,
            materials: selectedMaterials.map((material) => ({name: material})),
            categories: categories.map((category) => ({name: category})),
            inStock,
            minPrice,
            maxPrice
        }));


        toggleFilters();
    }

    const handleCategoryChange = (e) => {
        const selectedOptions = Array.from(e.target.selectedOptions).map(option => option.value);
        setAppliedFilters(prevFilters => ({
            ...prevFilters,
            categories: selectedOptions.map((category) => ({name: category}))
        }));
    };

    const handleMaterialChange = (e) => {
        const selectedOptions = Array.from(e.target.selectedOptions).map(option => option.value);
        setAppliedFilters(prevFilters => ({
            ...prevFilters,
            materials: selectedOptions.map((material) => ({name: material}))
        }));
    };

    const handleStockChange = (e) => {
        setAppliedFilters(prevFilters => ({
            ...prevFilters,
            inStock: !prevFilters.inStock
        }));
    };

    return (
        <div className="filter">
            <div className="card ">
                <div className="card-body ">
                    <form onSubmit={submitFilters}>
                        <div className="form-group ">
                            <label className="text-black" htmlFor="minPrice">Price minimum</label>
                            <input type="number" className="form-control" id="minPrice" defaultValue={appliedFilters.minPrice} />
                        </div>
                        <br/>
                        <div className="form-group">
                            <label className="text-black" htmlFor="maxPrice" defaultValue={appliedFilters.maxPrice || ""} >Price maximum</label>
                            <input type="number" className="form-control" id="maxPrice" defaultValue={appliedFilters.maxPrice} />
                        </div>
                        <br/>
                        <div className="form-group">
                            <label className="text-black" htmlFor="materials">Materials</label>
                            <select className="form-select" name="material" id="material" multiple value={appliedFilters.materials?.map(material => material.name)} onChange={handleMaterialChange}>
                                {materials ? (
                                    materials.map((material) => (
                                        <option key={material.id} value={material.id}>{material.name}</option>
                                    ))
                                ) : (<p>Materials are loading...</p>)}
                            </select>
                        </div>
                        <br/>
                        <div className="form-group">
                            <label className="text-black" htmlFor="categories">Categories</label>
                            <select className="form-select" name="category" id="category" value={appliedFilters.categories?.map(category => category.name)} onChange={handleCategoryChange}>
                                {categories ? (
                                    categories.map((category) => (
                                        <option key={category.id} value={category.id}>{category.name}</option>
                                    ))
                                ) : (
                                    <p>Categories are loading...</p>
                                )}
                            </select>
                        </div>
                        <br/>
                        <div className="form-check">
                            <input type="checkbox" className="form-check-input" id="inStock" name="inStock" checked={appliedFilters.inStock} onChange={handleStockChange}/>
                            <label id="inStock" htmlFor="inStock" className="form-check-label text-black" >In stock</label>
                        </div>

                        <div className="form-group">
                            <button type="submit" className="btn btn-block search-filter-button">Apply filters</button>
                            <button type="reset" className="btn btn-block search-filter-button" onClick={resetFilters}>Reset</button>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    )
}

export default SearchFilters;