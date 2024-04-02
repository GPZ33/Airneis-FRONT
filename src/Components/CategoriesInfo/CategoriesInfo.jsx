import React from 'react';
import bedroom from "../Assets/bedroom_furniture.jpg"
import kids from "../Assets/kids_furniture.jpg"
import dining from "../Assets/dining_furniture.jpg"
import office from "../Assets/home_office_furniture.jpg"
import livingroom from "../Assets/living_room_furniture.jpg"
import "./CategoriesInfo.css"
import InfoCard from "../InfoCard/InfoCard";

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