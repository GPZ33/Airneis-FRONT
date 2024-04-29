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
        {name: "Living room", img: [livingroom], description: "Create the perfect gathering space with our living room furniture. From plush sofas to stylish coffee tables, our collection offers comfort and elegance for every occasion."},
        {name: "Bedroom", img: [bedroom], description: "Transform your bedroom into a serene sanctuary with our bedroom furniture. From cozy beds to functional storage solutions, our pieces combine comfort and functionality for a restful retreat."},
        {name: "Kids room", img: [kids], description: "Foster creativity and playfulness in your child's room with our kids' furniture. From vibrant beds to versatile storage options, our collection creates a space where imaginations soar and memories are made."},
        {name: "Dining room", img: [dining], description: "Elevate your dining experience with our dining room furniture. From elegant tables to comfortable chairs, our collection offers style and functionality for memorable meals and gatherings."},
        {name: "Office", img: [office], description: "Maximize productivity and comfort in your workspace with our office furniture. From ergonomic chairs to spacious desks, our collection provides the tools you need to succeed in style."}
    ];

    const products = [
        {id: "1", name: "Classic Sofa", img: [sofa, sofa, sofa], description: "Classic comfort meets modern style with our classic sofa. Crafted with premium materials and timeless design, this sofa is the perfect centerpiece for any living room.", category: "Living room", price: 350, stock: true, materials: [
                "wood", "metal", "leather", "cherry wood"
            ]},
        {id: "2", name: "Elegant Chair", img: [chair,chair,chair], description: "Elevate your seating experience with our elegant chair. Whether for lounging or entertaining, this chair combines sophistication and comfort effortlessly.", category: "Living room", price: 180, stock: true, materials: [
                "wood", "metal", "leather", "cherry wood"
            ]},
        {id: "3", name: "Modern Lamp", img: [lamp,lamp,lamp], description: "Illuminate your space with our modern lamp. Sleek design and adjustable brightness make it a perfect addition to any bedroom.", category: "Bedroom", price: 60, stock: true, materials: [
                "wood", "metal", "leather", "cherry wood"
            ]},
        {id: "4", name: "Vintage Journal Table", img: [jounalTable,jounalTable,jounalTable], description: "Add a touch of nostalgia to your bedroom with our vintage journal table. Perfect for writing and storing memories.", category: "Bedroom", price: 200, stock: false, materials: [
                "wood", "metal", "leather", "cherry wood"
            ]},
        {id: "5", name: "Kids Sofa", img: [sofa, sofa, sofa], description: "Make playtime extra cozy with our kids' sofa. Soft and durable, it's ideal for any kids' room.", category: "Kids room", price: 120, stock: false, materials: [
                "wood", "metal", "leather", "cherry wood"
            ]},
        {id: "6", name: "Dining Chair Set", img: [chair,chair,chair], description: "Complete your dining room with our dining chair set. Stylish and sturdy, it's perfect for family gatherings.", category: "Dining room", price: 280, stock: true, materials: [
                "wood", "metal", "leather", "cherry wood"
            ]},
        {id: "7", name: "Kids Room Lamp", img: [lamp,lamp,lamp], description: "Brighten up your child's room with our playful lamp. Fun designs make bedtime more enjoyable.", category: "Kids room", price: 40, stock: false, materials: [
                "wood", "metal", "leather", "cherry wood"
            ]},
        {id: "8", name: "Office Journal Table", img: [jounalTable,jounalTable,jounalTable], description: "Stay organized with our office journal table. Ample storage for all your work essentials.", category: "Office", price: 180, stock: true, materials: [
                "wood", "metal", "leather", "cherry wood"
            ]},
        {id: "9", name: "Luxurious Buffet", img: [buffet,buffet,buffet], description: "Entertain in style with our luxurious buffet. Elegant design meets practical storage.", category: "Living room", price: 800, stock: true, materials: [
                "wood", "metal", "leather", "cherry wood"
            ]},
        {id: "10", name: "Executive Office Table", img: [office,office,office], description: "Upgrade your workspace with our executive office table. Sleek and functional for maximum productivity.", category: "Office", price: 400, stock: true, materials: [
                "wood", "metal", "leather", "cherry wood"
            ]},
        {id: "11", name: "Master Bedroom Bed", img: [bed,bed,bed], description: "Indulge in luxury with our master bedroom bed. Plush comfort for a restful night's sleep.", category: "Bedroom", price: 1200, stock: true, materials: [
                "wood", "metal", "leather", "cherry wood"
            ]},
        {id: "12", name: "Home Bar Set", img: [bar,bar,bar], description: "Bring the bar home with our stylish bar set. Perfect for entertaining guests in your living room.", category: "Living room", price: 550, stock: true, materials: [
                "wood", "metal", "leather", "cherry wood"
            ]},
        {id: "13", name: "Chic Armoire", img: [armoire,armoire,armoire], description: "Organize your bedroom in style with our chic armoire. Featuring ample storage and a timeless design, this armoire adds both functionality and elegance to your personal sanctuary.", category: "Bedroom", price: 350, stock: true, materials: [
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
    }, [categories, categoryName])
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
    }, [category, products])


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