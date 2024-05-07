import React from 'react';
import InfoCardWithPrice from "../InfoCard/InfoCard";
import sofa from "../Assets/products/sofa.jpg";
import chair from "../Assets/products/chair.jpg";
import lamp from "../Assets/products/lamp.jpg";
import jounalTable from "../Assets/products/journal table.jpg";
import buffet from "../Assets/products/buffet.jpg";
import office from "../Assets/products/office.jpeg";
import bed from "../Assets/products/bed.jpg";
import bar from "../Assets/products/bar.jpg";
import armoire from "../Assets/products/armoire.jpg";

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


const SimilarProducts = ({category}) => {

    // Filter products based on the category
    const filteredProducts = products.filter(product => product.category === category);

    // Sort the filtered products to prioritize those in stock
    const sortedProducts = filteredProducts.sort((a, b) => {
        // If product a is in stock but product b is not, prioritize product a
        if (a.stock && !b.stock) {
            return -1;
        }
        // If product b is in stock but product a is not, prioritize product b
        else if (!a.stock && b.stock) {
            return 1;
        }
        // Otherwise, maintain the original order
        else {
            return 0;
        }
    });

    // Display only the first 6 filtered products
    const similarProducts = sortedProducts.slice(0, 6);

    return (
        <InfoCardWithPrice props={similarProducts} basePath="products" />
    );
}

export default SimilarProducts;