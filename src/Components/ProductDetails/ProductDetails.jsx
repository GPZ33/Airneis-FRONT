import React, {createContext, useEffect, useState} from 'react';
import { useParams } from "react-router-dom";
import CarouselSlides from "../Carrousel/Carousel";
import "./ProductDetails.css";
import SimilarProducts from "../SimilarProducts/SimilarProducts";
import {useCart} from "../../Context/CartContext";



const ProductDetails = () => {
    let { productId } = useParams();
    const [product, setProduct] = useState(null);
    const [materials, setMaterials] = useState(null);
    const [categoryOfProduct, setCategoryOfProduct] = useState(null);
    const [images, setImages] = useState([]);
    const [error, setError] = useState(null);
    const { addToCart } = useCart();



    useEffect(() => {
        const fetchProductDetails = async () => {
            try {
                const response = await fetch(`http://127.0.0.1:8000/api/products/${productId}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch product details');
                }
                const productData = await response.json();
                setProduct(productData);
                setError(null);
            } catch (error) {
                console.error('Error fetching product details:', error.message);
                setError("An error occurred while fetching product details");
                setProduct(null);
            }
        };

        fetchProductDetails();
    }, [productId]);

    useEffect(() => {
        const fetchMaterials = async () => {
            try {
                const materialsData = await Promise.all(product.materials.map(async (material) => {
                    const response = await fetch(`http://127.0.0.1:8000${material['@id']}`);
                    if (!response.ok) {
                        throw new Error('Failed to fetch material details');
                    }
                    return response.json();
                }));
                setMaterials(materialsData);
            } catch (error) {
                console.error('Error fetching material details:', error.message);
            }
        };

        if (product) {
            fetchMaterials();
        }
    }, [product]);

    useEffect(() => {
        const fetchCategoryOfProduct = async () => {
            try {
                const response = await fetch(`http://127.0.0.1:8000${product.category[0]['@id']}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch category details');
                }
                const categoryData = await response.json();
                setCategoryOfProduct(categoryData);
            } catch (error) {
                console.error('Error fetching category details:', error.message);
            }
        };
    
        if (product && product.category && product.category.length > 0) {
            fetchCategoryOfProduct();
        }
    }, [product]);
    

    useEffect(() => {
        const fetchImages = async () => {
            try {
                const imagesData = await Promise.all(product.images.map(async (image) => {
                    const response = await fetch(`http://127.0.0.1:8000${image['@id']}`);
                    if (!response.ok) {
                        throw new Error('Failed to fetch image details');
                    }
                    return response.json();
                }));
                setImages(imagesData);
            } catch (error) {
                console.error('Error fetching image details:', error.message);
            }
        };

        if (product) {
            fetchImages();
        }
    }, [product]);

    const handleAddToCart = () => {
        addToCart(product);
        localStorage.setItem(`cart`, JSON.stringify(product));
    };

    return (
            <div className="product-details">
                {error ? (
                        <p>{error}</p> 
                    ) :
                    product ? (
                        <>
                            <div>
                                <article>
                                    <div className="photo">
                                        <CarouselSlides props={images.map(image => image.contentUrl)} largerHeight={true}/>
                                    </div>
                                    <div className="description">
                                        <div className="details">
                                            <h2>{product.name}</h2>
                                            <h1>{product.price}$</h1>
                                            <h4>{product.description}</h4>
                                        </div>
                                        <div>
                                            <p className="pt-3">Category: {categoryOfProduct ? categoryOfProduct.name : 'Loading...'}</p>
                                            <p>Materials: {materials ? materials.map(material => material.name).join(', ') : 'Loading...'}</p>
                                        </div>
                                        {product.stock ? (
                                            <button className="to-cart" onClick={handleAddToCart} >Add to Cart</button>
                                        ) : (
                                            <button className="out-of-stock">Out of stock</button>
                                        )}
                                    </div>
                                </article>
                            </div>
                            <div className="row justify-content-around">
                                <h1 className="text-center pb-3">Similar products</h1>
                                {categoryOfProduct && categoryOfProduct.id && <SimilarProducts idCategoryOfProduct={categoryOfProduct.id} />}
                            </div>
                        </>
                    ) : (
                        <p>The product is loading</p>
                    )}

            </div>
    );
};

export default ProductDetails;