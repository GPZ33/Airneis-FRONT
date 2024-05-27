import "./SearchFilters.css";
import {useEffect, useRef, useState} from "react";
import livingroom from "../Assets/living_room_furniture.jpg";
import bedroom from "../Assets/bedroom_furniture.jpg";
import kids from "../Assets/kids_furniture.jpg";
import dining from "../Assets/dining_furniture.jpg";
import office from "../Assets/home_office_furniture.jpg";

const SearchFilters = ({parsePrice, setSearchResults, products, toggleFilters, initialFilters, appliedFilters, setAppliedFilters } ) => {


    const resetFilters = () => {
        setAppliedFilters(initialFilters);
        toggleFilters();
        setSearchResults(products)
    };

    const materials = [
        {id: 1, name: "wood"},
        {id: 2, name: "metal"},
        {id: 3, name: "leather"},
        {id: 4, name: "cherry-wood"}
    ];

    const categories = [
        {id: 1, name: "Living room", img: [livingroom], description: "Description of the category"},
        {id: 2, name: "Bedroom", img: [bedroom], description: "Description of the category"},
        {id: 3, name: "Kids room", img: [kids], description: "Description of the category"},
        {id: 4, name: "Dining room", img: [dining], description: "Description of the category"},
        {id: 5, name: "Office", img: [office], description: "Description of the category"},
        {id: 6, name: "Kids room", img: [kids], description: "Description of the category"},
        {id: 7, name: "Dining room", img: [dining], description: "Description of the category"},
        {id: 8, name: "Office", img: [office], description: "Description of the category"},
    ]

// Helper function to parse prices

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

        // récup les valeurs de champs
        // modifie le state avec

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

    return (
        <div className="filter">
            <div className="card">
                <div className="card-body">
                    <form onSubmit={submitFilters}>
                        <div className="form-group">
                            <label htmlFor="minPrice">Price minimum</label>
                            <input type="number" className="form-control" id="minPrice" defaultValue={appliedFilters.minPrice} />
                        </div>
                        <br/>
                        <div className="form-group">
                            <label htmlFor="maxPrice" defaultValue={appliedFilters.maxPrice || ""} >Price maximum</label>
                            <input type="number" className="form-control" id="maxPrice" defaultValue={appliedFilters.maxPrice} />
                        </div>
                        <br/>
                        <div className="form-group">
                            <label htmlFor="materials">Materials</label>
                            <select name="material" id="material" multiple defaultValue={appliedFilters.materials?.map(material => material.name)}>
                                {materials ? (
                                    materials.map((material, index) => (
                                        <option key={index} value={material.name}>{material.name}</option>
                                    ))
                                ) : (<p>Materials are loading...</p>)}
                            </select>
                        </div>
                        <br/>
                        <div className="form-group">
                            <label htmlFor="categories">Categories</label>
                            <select name="category" id="category" multiple defaultValue={appliedFilters.categories?.map(category => category.name)}>
                                {categories ? (
                                    categories.map((category, index) => (
                                        <option key={index} value={category.name}>{category.name}</option>
                                    ))
                                ) : (
                                    <p>Categories are loading...</p>
                                )}
                            </select>
                        </div>
                        <br/>
                        <div className="form-check">
                            <input type="checkbox" className="form-check-input" id="inStock" name="inStock" defaultValue={appliedFilters.inStock}/>
                            <label id="inStock" htmlFor="inStock" className="form-check-label">In stock</label>
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