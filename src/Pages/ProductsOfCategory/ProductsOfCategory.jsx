import React, { useEffect, useState } from 'react';
import {Link, useParams} from "react-router-dom";
import "./ProductsOfCategory.css";
import InfoCard from "../../Components/InfoCard/InfoCard";
import livingroom from "../../Components/Assets/living_room_furniture.jpg";
import bedroom from "../../Components/Assets/bedroom_furniture.jpg";
import kids from "../../Components/Assets/kids_furniture.jpg";
import dining from "../../Components/Assets/dining_furniture.jpg";
import office from "../../Components/Assets/home_office_furniture.jpg";
import sofa from "../../Components/Assets/products/sofa.jpg";
import chair from "../../Components/Assets/products/chair.jpg";
import lamp from "../../Components/Assets/products/lamp.jpg";
import jounalTable from "../../Components/Assets/products/journal table.jpg";
import buffet from "../../Components/Assets/products/buffet.jpg";
import bed from "../../Components/Assets/products/bed.jpg";
import bar from "../../Components/Assets/products/bar.jpg";
import armoire from "../../Components/Assets/products/armoire.jpg";
import InfoCardWithPrice from "../../Components/InfoCard/InfoCardWithPrice";



const ProductsOfCategory = () => {
    let {categoryName} = useParams();

    const [category, setCategory] = useState(null);
    const [productsOfCategory, setProductsOfCategory] = useState(null);

    const categories = [
        {name: "Living room", img: [livingroom], description: "Description of the category"},
        {name: "Bedroom", img: [bedroom], description: "Description of the category"},
        {name: "Kids room", img: [kids], description: "Description of the category"},
        {name: "Dining room", img: [dining], description: "Description of the category"},
        {name: "Office", img: [office], description: "Description of the category"},
        {name: "Kids room", img: [kids], description: "Description of the category"},
        {name: "Dining room", img: [dining], description: "Description of the category"},
        {name: "Office", img: [office], description: "Description of the category"},
    ]
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
        {id: "7", name: "Lamp", img: [lamp,lamp,lamp], description: "Description of the product", category: "Kids room", price: 25, stock: true, materials: [
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
        try {
            const categoryFind = categories.find(category => category.name === categoryName);
            if (categoryFind) {
                setCategory(categoryFind);
            } else {
                throw new Error('Category not found');
            }
        } catch (error) {
            console.error('Error fetching category details:', error.message);
        }
    }, [categoryName])
    useEffect(() => {
        if (category) {
            const filteredProducts = products.filter(product => product.category === category.name);
            // const prioritizedProducts = filteredProducts.filter(product => product.priority);
            // const nonPrioritizedProducts = filteredProducts.filter(product => !product.priority && product.stock);
            // const outOfStockProducts = filteredProducts.filter(product => !product.stock);
            //
            // // Sort prioritized products by priority
            // prioritizedProducts.sort((a, b) => a.priority - b.priority);
            //
            // // Concatenate the three groups in the desired order
            // const sortedProducts = [...prioritizedProducts, ...nonPrioritizedProducts, ...outOfStockProducts];
            setProductsOfCategory(filteredProducts);
        }
    }, [category])


    return (
        <>
        {category ? (
            <>
                <div className="row justify-content-around">
                    <InfoCard props={category}/>
                </div>

                <h1 className="text-center pt-5">{category.description}</h1>

                <InfoCardWithPrice props={productsOfCategory} />
            </>
        ) : (
            <p>The category is loading</p>
        )}
        </>
    )
}

export default ProductsOfCategory;