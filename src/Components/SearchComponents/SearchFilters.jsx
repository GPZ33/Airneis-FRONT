import "./SearchFilters.css";
import {useEffect, useRef, useState} from "react";
import livingroom from "../Assets/living_room_furniture.jpg";
import bedroom from "../Assets/bedroom_furniture.jpg";
import kids from "../Assets/kids_furniture.jpg";
import dining from "../Assets/dining_furniture.jpg";
import office from "../Assets/home_office_furniture.jpg";

const SearchFilters = ({applyFilters, appliedFilters, setAppliedFilters } ) => {
    const minPriceRef = useRef(null);
    const maxPriceRef = useRef(null);
    // Ensure appliedFilters is initialized
    if (!appliedFilters) {
        appliedFilters = {
            materials: [],
            categories: []
        };
    }

    useEffect(() => {
        // Load applied filters from local storage
        const storedFilters = localStorage.getItem("appliedFilters");
        if (storedFilters) {
            setAppliedFilters(JSON.parse(storedFilters));
        }
    }, []);


    const handleReset = () => {
        minPriceRef.current.value = 0;
        maxPriceRef.current.value = 0;
        // Add to reset others if needed
    };

    const handleCheckboxChange = (e) => {
        const { name, value, checked } = e.target;
        setAppliedFilters(prevFilters => {
            const updatedFilters = { ...prevFilters };
            if (checked) {
                updatedFilters[name] = [...(prevFilters[name] || []), value];
            } else {
                updatedFilters[name] = (prevFilters[name] || []).filter(item => item !== value);
            }
            return updatedFilters;
        });
    };

   const handleApplyFilters = () => {
        applyFilters();
        // Save the latest state to local storage
        localStorage.setItem("appliedFilters", JSON.stringify(appliedFilters));
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


  return (
      <div className="filter">
          <div className="card">
              <div className="card-body">
                  <form>
                      <div className="form-group">
                          <label htmlFor="minPrice" ref={minPriceRef} defaultValue={appliedFilters.minPrice || ""} >Price minimum</label>
                          <input type="number" className="form-control" id="minPrice"/>
                      </div>
                      <br/>
                      <div className="form-group">
                          <label htmlFor="maxPrice" ref={maxPriceRef} defaultValue={appliedFilters.maxPrice || ""} >Price maximum</label>
                          <input type="number" className="form-control" id="maxPrice"/>
                      </div>
                      <br/>
                      <div className="form-group">
                          <label htmlFor="materials">Materials</label>
                          {materials ? (
                              materials.map(material =>(
                                  <div key={material.id} className="form-check">
                                      <input
                                          type="checkbox"
                                          className="form-check-input"
                                          id={material.name}
                                          name="material"
                                          value={material.name}
                                          onChange={handleCheckboxChange}
                                      />
                                      <label htmlFor={material.name} className="form-check-label">{material.name}</label>
                                  </div>
                              ))
                          ):(<p>Materials are loading...</p>)}
                      </div>
                      <br/>
                      <div className="form-group">
                          <label htmlFor="categories">Categories</label>
                          {categories ? (
                              categories.map(category => (
                                  <div key={category.id} className="form-check">
                                      <input
                                          type="checkbox"
                                          className="form-check-input"
                                          id={category.name}
                                          name="category"
                                          value={category.name}
                                          onChange={handleCheckboxChange}
                                      />
                                      <label htmlFor="{category.name}" className="form-check-label">{category.name}</label>
                                  </div>
                              ))
                          ) : (
                              <p>Categories are loading...</p>
                          )}
                      </div>
                      <br/>
                      <div className="form-check">
                          <input type="checkbox" className="form-check-input" id="inStock" name="inStock"/>
                          <label htmlFor="inStock" className="form-check-label">In stock</label>
                      </div>

                      <div className="form-group">
                          <button type="button" className="btn btn-block" onClick={applyFilters}>Apply filters</button>
                          <button type="reset" className="btn btn-block" onClick={handleReset}>Reset</button>
                      </div>

                  </form>
              </div>
          </div>
      </div>
  )
}

export default SearchFilters;