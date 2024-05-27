import React, {useEffect, useState} from 'react';
import InfoCardWithPrice from "../InfoCard/InfoCardWithPrice";



const SimilarProducts = ({idCategoryOfProduct}) => {
    const [categoryOfProduct, setCategoryOfProduct] = useState(null);
    const [productsOfCategory, setProductsOfCategory] = useState([]);

    useEffect(() => {
        const fetchCategoryDetails = async () => {
            try {
                const response = await fetch(`http://127.0.0.1:8000/api/categories/${idCategoryOfProduct}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch category details');
                }
                const categoryData = await response.json();
                setCategoryOfProduct(categoryData);
            } catch (error) {
                console.error('Error fetching category details:', error.message);
            }
        };

        fetchCategoryDetails();
    }, [idCategoryOfProduct]);


    useEffect(() => {
        if (categoryOfProduct) {
            const fetchProductsOfCategory = async () => {
                try {
                    const productsResponse = await Promise.all(categoryOfProduct.products.map(async (product) => {
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
    }, [categoryOfProduct]);


    return (
        <InfoCardWithPrice props={productsOfCategory} basePath="products" />
    );
}

export default SimilarProducts;
