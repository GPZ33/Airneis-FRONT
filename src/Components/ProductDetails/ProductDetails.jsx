import React, {useEffect, useState} from 'react';
import { useParams } from "react-router-dom";
import CarouselSlides from "../Carrousel/Carousel";
import "./ProductDetails.css";
import SimilarProducts from "../SimilarProducts/SimilarProducts";
import {useCart} from "../../Context/CartContext";
import {productApiService} from "../../service/productApiService";
import {categoryApiService} from "../../service/categoryApiService";
import {orderApiService} from "../../service/orderApiService";
import {imageApiService} from "../../service/imageApiService";


const ProductDetails = () => {
    const { productId } = useParams();
    const [product, setProduct] = useState(null);
    const [materials, setMaterials] = useState(null);
    const [categoryOfProduct, setCategoryOfProduct] = useState(null);
    const [images, setImages] = useState([]);
    const [error, setError] = useState(null);
    const { addToCart } = useCart();

    //get product by id
    useEffect(() => {
        productApiService.getProductById("/api/products/" + productId).then(result => {
            setProduct(result);
        })
    }, [productId]);

    //get materials of the product by id
    useEffect(() => {
        const fetchMaterials = async () => {
            try {
                if (product && product.materials && product.materials.length > 0) {
                    const materialsData = await Promise.all(product.materials.map(
                        async (material) => await productApiService.getMaterialsOfProductById(material['@id'])));
                    setMaterials(materialsData);
                }
            } catch (error) {
                console.error('Error fetching material details:', error.message);
            }
        };
        if (product) {
            fetchMaterials();
        }
    }, [product]);

    //get category of product
    useEffect(() => {
        if (product && product.category && product.category.length > 0) {
            categoryApiService.getCategoryOfProduct(product.category[0]['@id'])
                .then(result => {
                    setCategoryOfProduct(result);
                })
                .catch(error => {
                    console.error('Error fetching category details:', error.message);
                });
        }
    }, [product]);

    //get images' details of the product
    useEffect(() => {
        const fetchImages = async () => {
            try {
                const imagesData = await Promise.all(product.images.map(
                    async (image) => await imageApiService.getImageDetails(image['@id'])));
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
                                            <p className="pt-3">Détails: {product.details}</p>
                                            <p className="pt-3">Category: {categoryOfProduct ? categoryOfProduct.name : 'Loading...'}</p>
                                            <p>Materials: {materials ? materials.map(material => material.name).join(', ') : 'Loading...'}</p>
                                        </div>
                                        {product.stock ? (
                                            <button className="cart-button btn btn-primary btn-lg btn-block" onClick={handleAddToCart} >Ajouter dans le panier</button>
                                        ) : (
                                            <button className="out-of-stock">Out of stock</button>
                                        )}
                                    </div>
                                </article>
                            </div>
                            <div className="row justify-content-around">
                                <h1 className="text-center pb-3">Produits similaires</h1>
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