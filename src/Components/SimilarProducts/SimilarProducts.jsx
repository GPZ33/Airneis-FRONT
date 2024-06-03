import React, {useEffect, useState} from 'react';
import InfoCardWithPrice from "../InfoCard/InfoCardWithPrice";
import {categoryApiService} from "../../service/categoryApiService";
import {productApiService} from "../../service/productApiService";


const SimilarProducts = ({idCategoryOfProduct}) => {
    const [categoryOfProduct, setCategoryOfProduct] = useState(null);
    const [productsOfCategory, setProductsOfCategory] = useState([]);

    //get category by id
    useEffect(() => {
        categoryApiService.getCategoryById(idCategoryOfProduct).then(result => {
            setCategoryOfProduct(result);
        })
    }, [idCategoryOfProduct]);

    //get products od category
    useEffect(() => {
        if (categoryOfProduct) {
            const fetchProductsOfCategory = async () => {
                try {
                    const productsResponse = await Promise.all(categoryOfProduct.products.map(
                        async (product) => await productApiService.getProductById(product['@id'])));
                    productsResponse.sort((a, b) => {
                        if (!a.stock) return 1;
                        if (a.stock) return 0;
                        return 0;
                    });
                    setProductsOfCategory(productsResponse.slice(0, 6));
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
