import React from 'react';
import "./Highlanders.css"
import sofa from "../Assets/products/sofa.jpg";
import chair from "../Assets/products/chair.jpg";
import lamp from "../Assets/products/lamp.jpg";
import jounalTable from "../Assets/products/journal table.jpg";
import armoire from "../Assets/products/armoire.jpg";
import bar from "../Assets/products/bar.jpg";
import bed from "../Assets/products/bed.jpg";
import buffet from "../Assets/products/buffet.jpg";
import office from "../Assets/products/office.jpeg";
import InfoCard from "../InfoCard/InfoCard";

const highlanders = [
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

const Highlanders = () => {
    return (
        <div className="row justify-content-around">
            <h1 className="text-center pb-3">Les Highlanders du moment 🔥</h1>
            <InfoCard props={highlanders} basePath="products"/>
        </div>
    )
}


export default Highlanders;
