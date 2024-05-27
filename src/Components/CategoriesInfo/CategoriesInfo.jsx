import React, { useEffect, useState } from 'react';
import "./CategoriesInfo.css"
import InfoCard from "../InfoCard/InfoCard";

const CategoriesInfo = () => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("http://127.0.0.1:8000/api/categories", {
                    //headers: {
                    //    Authorization: `Bearer ${token}`
                    //}
                });
                if (!response.ok) {
                    throw new Error("Failed to fetch categories");
                }
                const data = await response.json();
                setCategories(data["hydra:member"]);
            } catch (error) {
                console.error("Error fetching categories:", error.message);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="row justify-content-around py-5">
            <h1 className="text-center pb-3">VENANT DES HAUTES TERRES D'ÉCOSSENOS</h1>
            <br/>
            <h1 className="text-center pb-3">MEUBLES SONT IMMORTELS</h1>
             <InfoCard props={categories} basePath="categories" />
        </div>
    );
}

export default CategoriesInfo;
