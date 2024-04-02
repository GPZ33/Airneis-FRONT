import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import sofa from "../Assets/products/sofa.jpg";
import chair from "../Assets/products/chair.jpg";
import lamp from "../Assets/products/lamp.jpg";
import journalTable from "../Assets/products/journal table.jpg";
import CarouselHome from "../Carrousel/Carousel";
import "./ProductDetails.css";
import SimilarProducts from "../SimilarProducts/SimilarProducts";
import InfoCard from "../InfoCard/InfoCard";
import jounalTable from "../Assets/products/journal table.jpg";
import buffet from "../Assets/products/buffet.jpg";
import office from "../Assets/products/office.jpeg";
import bed from "../Assets/products/bed.jpg";
import bar from "../Assets/products/bar.jpg";
import armoire from "../Assets/products/armoire.jpg";


const ProductDetails = () => {

    let {name} = useParams();

    const [product, setProduct] = useState(null);

    const products = [
        {id: "1", name: "Sofa", img: [sofa, sofa, sofa], description: "Description of the product", category: "Living room", price: 25, stock: true, materials: [
                "wood", "metal", "leather", "cherry wood"
            ]},
        {id: "2", name: "Chair", img: [chair,chair,chair], description: "Description of the product", category: "Living room", price: 25, stock: true, materials: [
                "wood", "metal", "leather", "cherry wood"
            ]},
        {id: "3", name: "Lamp", img: [lamp,lamp,lamp], description: "Description of the product", category: "Bedroom", price: 25, stock: true, materials: [
                "wood", "metal", "leather", "cherry wood"
            ]},
        {id: "4", name: "Journal Table", img: [jounalTable,jounalTable,jounalTable], description: "Description of the product", category: "Bedroom", price: 25, stock: false, materials: [
                "wood", "metal", "leather", "cherry wood"
            ]},
        {id: "5", name: "Sofa", img: [sofa, sofa, sofa], description: "Description of the product", category: "Kids room", price: 25, stock: false, materials: [
                "wood", "metal", "leather", "cherry wood"
            ]},
        {id: "6", name: "Chair", img: [chair,chair,chair], description: "Description of the product", category: "Dining room", price: 25, stock: true, materials: [
                "wood", "metal", "leather", "cherry wood"
            ]},
        {id: "7", name: "Lamp", img: [lamp,lamp,lamp], description: "Description of the product", category: "Kids room", price: 25, stock: false, materials: [
                "wood", "metal", "leather", "cherry wood"
            ]},
        {id: "8", name: "Journal Table", img: [jounalTable,jounalTable,jounalTable], description: "Description of the product", category: "Office", price: 25, stock: true, materials: [
                "wood", "metal", "leather", "cherry wood"
            ]},
        {id: "9", name: "Buffet", img: [buffet,buffet,buffet], description: "Description of the product", category: "Living room", price: 465, stock: true, materials: [
                "wood", "metal", "leather", "cherry wood"
            ]},
        {id: "10", name: "Office table", img: [office,office,office], description: "Description of the product", category: "Office", price: 277, stock: true, materials: [
                "wood", "metal", "leather", "cherry wood"
            ]},
        {id: "11", name: "Bed", img: [bed,bed,bed], description: "Description of the product", category: "Bedroom", price: 755, stock: true, materials: [
                "wood", "metal", "leather", "cherry wood"
            ]},
        {id: "12", name: "Bar", img: [bar,bar,bar], description: "Description of the product", category: "Living room", price: 250, stock: true, materials: [
                "wood", "metal", "leather", "cherry wood"
            ]},
        {id: "13", name: "Armoire", img: [armoire,armoire,armoire], description: "Description of the product", category: "Bedroom", price: 205, stock: true, materials: [
                "wood", "metal", "leather", "cherry wood"
            ]}
    ]

    useEffect(() => {
       // const fetchData = async () => {
            //try {
                // Simulating fetching product details from an API
                // const productsResponse = await fetch(products);
                //
                // if (!productsResponse.ok) {
                //     throw new Error('Failed to fetch product details');
                // }
                //
                // const productsResponseData = await productsResponse.json();
                // setProduct(productsResponseData);
                // In a real application, replace this with actual API call
                try {
                    const productFind = products.find(item => item.name === name);
                    if (productFind) {
                        setProduct(productFind);
                    } else {
                        throw new Error('Product not found');
                    }
                } catch (error) {
                    console.error('Error fetching product details:', error.message);
                }


       // fetchData(); // Appeler la fonction fetchData à l'intérieur de useEffect

    }, []); // Le deuxième argument de useEffect est un tableau vide pour indiquer que ce code ne doit être exécuté qu'une seule fois après le montage initial.

    return (
        <div className="product-details">
            {product ? (
                <>
                <div>
                    <article>
                        <div className="photo">
                            <CarouselHome props={product.img} largerHeight={true}/>
                        </div>
                        <div className="description">
                            <div className="details">
                                <h2>{product.name}</h2>
                                <h1>{product.price}$</h1>
                                <h4>{product.description}</h4>
                            </div>
                            <div>
                                <p className="pt-3">Category: {product.category}</p>
                                <p>Materials: {product.materials.join(', ')}</p>
                            </div>
                            {product.stock ? (
                                <button className="to-cart">Add to Cart</button>
                            ) : (
                                <button className="out-of-stock">Out of stock</button>
                            )}
                        </div>
                    </article>
                </div>
                <div className="row justify-content-around">
                    <h1 className="text-center pb-3">Similar products</h1>
                    <SimilarProducts category={product.category}/>
                </div>
                </>
            ) : (
                <p>The product is loading</p>
            )}

        </div>
    );
};

export default ProductDetails;