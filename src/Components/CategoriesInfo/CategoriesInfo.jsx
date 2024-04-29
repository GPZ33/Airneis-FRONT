import React from 'react';
import bedroom from "../Assets/bedroom_furniture.jpg"
import kids from "../Assets/kids_furniture.jpg"
import dining from "../Assets/dining_furniture.jpg"
import office from "../Assets/home_office_furniture.jpg"
import livingroom from "../Assets/living_room_furniture.jpg"
import "./CategoriesInfo.css"
import InfoCard from "../InfoCard/InfoCard";

const categories = [
    {name: "Living room", img: [livingroom], description: "Create the perfect gathering space with our living room furniture. From plush sofas to stylish coffee tables, our collection offers comfort and elegance for every occasion."},
    {name: "Bedroom", img: [bedroom], description: "Transform your bedroom into a serene sanctuary with our bedroom furniture. From cozy beds to functional storage solutions, our pieces combine comfort and functionality for a restful retreat."},
    {name: "Kids room", img: [kids], description: "Foster creativity and playfulness in your child's room with our kids' furniture. From vibrant beds to versatile storage options, our collection creates a space where imaginations soar and memories are made."},
    {name: "Dining room", img: [dining], description: "Elevate your dining experience with our dining room furniture. From elegant tables to comfortable chairs, our collection offers style and functionality for memorable meals and gatherings."},
    {name: "Office", img: [office], description: "Maximize productivity and comfort in your workspace with our office furniture. From ergonomic chairs to spacious desks, our collection provides the tools you need to succeed in style."}
];

const CategoriesInfo = () => {
    return (
        <div className="row justify-content-around py-5">
            <h1 className="text-center pb-3">VENANT DES HAUTES TERRES D'ÉCOSSENOS</h1>
            <br/>
            <h1 className="text-center pb-3">MEUBLES SONT IMMORTELS</h1>
            <InfoCard props={categories} basePath="categories"/>
        </div>
    );
}


export default CategoriesInfo;