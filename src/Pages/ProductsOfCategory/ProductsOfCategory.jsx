import React, { useEffect, useState } from 'react';
import {Link, useParams} from "react-router-dom";
import "./ProductsOfCategory.css";
import InfoCard from "../../Components/InfoCard/InfoCard";
import InfoCardWithPrice from "../../Components/InfoCard/InfoCardWithPrice";



const ProductsOfCategory = () => {
    let { categoryId } = useParams();
    const [category, setCategory] = useState(null);
    const [productsOfCategory, setProductsOfCategory] = useState([]);
    const token = localStorage.getItem('token');


    useEffect(() => {
        const fetchCategoryDetails = async () => {
            try {
                const response = await fetch(`http://127.0.0.1:8000/api/categories/${categoryId}`, {
                });
                if (!response.ok) {
                    throw new Error('Failed to fetch category details');
                }
                const categoryData = await response.json();
                setCategory(categoryData);
            } catch (error) {
                console.error('Error fetching category details:', error.message);
            }
        };

        fetchCategoryDetails();
    }, [categoryId, token]);


    useEffect(() => {
        if (category) {
            const fetchProductsOfCategory = async () => {
                try {
                    const productsResponse = await Promise.all(category.products.map(async (product) => {
                        const response = await fetch(`http://127.0.0.1:8000${product['@id']}`);
                        if (!response.ok) {
                            throw new Error('Failed to fetch product details');
                        }
                        return response.json();
                    }));
                    setProductsOfCategory(productsResponse);
                } catch (error) {
                    console.error('Error fetching product details:', error.message);
                }
            };

            fetchProductsOfCategory();
        }
    }, [category, token]);

    return (
        <>
            {category ? (
                <>
                    <div className="row justify-content-around">
                        <InfoCard props={category} basePath="products"/>
                    </div>

                    <h1 className="text-center pt-5">{category.description}</h1>

                    <InfoCardWithPrice props={productsOfCategory} basePath="products"/>
                </>
            ) : (
                <p>The category is loading</p>
            )}
        </>
    )
}

export default ProductsOfCategory;