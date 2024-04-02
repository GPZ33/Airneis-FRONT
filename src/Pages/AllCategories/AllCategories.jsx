import "./AllCategories.css"
import { Link } from 'react-router-dom';
import {useEffect, useState} from "react";
import livingroom from "../../Components/Assets/living_room_furniture.jpg";
import bedroom from "../../Components/Assets/bedroom_furniture.jpg";
import kids from "../../Components/Assets/kids_furniture.jpg";
import dining from "../../Components/Assets/dining_furniture.jpg";
import office from "../../Components/Assets/home_office_furniture.jpg";
import sofa from "../../Components/Assets/products/sofa.jpg";
import chair from "../../Components/Assets/products/chair.jpg";
import lamp from "../../Components/Assets/products/lamp.jpg";
import jounalTable from "../../Components/Assets/products/journal table.jpg";
const AllCategories = () => {
    const categories = [
        {name: "Living room", img: livingroom,
            products: [
                {name: "Sofa", img: sofa},
                {name: "Chair", img: chair},
                {name: "Lamp", img: lamp},
                {name: "Journal Table", img: jounalTable}
            ]
        },
        {name: "Bedroom", img: bedroom,
            products: [
                {name: "Sofa", img: sofa},
                {name: "Chair", img: chair},
                {name: "Lamp", img: lamp},
                {name: "Journal Table", img: jounalTable}
            ]},
        {name: "Kids room", img: kids,
            products: [
                {name: "Sofa", img: sofa},
                {name: "Chair", img: chair},
                {name: "Lamp", img: lamp},
                {name: "Journal Table", img: jounalTable}
            ]},
        {name: "Dining room", img: dining,
            products: [
                {name: "Sofa", img: sofa},
                {name: "Chair", img: chair},
                {name: "Lamp", img: lamp},
                {name: "Journal Table", img: jounalTable}
            ]},
        {name: "Office", img: office,
            products: [
                {name: "Sofa", img: sofa},
                {name: "Chair", img: chair},
                {name: "Lamp", img: lamp},
                {name: "Journal Table", img: jounalTable}
            ]}
    ]

  const [setCategories] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
        const fetchData = async () => {
            try {
                const categoriesResponse = await fetch(categories);

                if (!categoriesResponse.ok) {
                    throw new Error("Failed to fetch categories");
                }

                const categoriesResponseData = await categoriesResponse.json();
                setCategories(categoriesResponseData.categories);
            } catch (error) {
                setError(error.message);
            }
        };

        fetchData();
    }, []);

  return (
         <>
           <h2 className="title">All of our categories</h2>
           <div className="listBox">
             {categories ? (
                 categories.map((category) => {
                   return (
                       <article>
                         <Link to={`/category/${category.name}`}>
                           <img className="img-fluid img-thumbnail" src={category.img} />
                           <h3>{category.name}</h3>
                         </Link>
                       </article>
                   )
                 })) : (
                 <p>Categories are loading</p>
             )}
           </div>
         </>
  );
}

export default AllCategories;
