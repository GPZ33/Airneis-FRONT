import React, {useEffect, useState} from 'react';
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
import {apiService} from "../../service/apiService";
import product from "../../Pages/Product";


const Highlanders = () => {
    const [highlanders, setHighlanders] = useState(null);

    useEffect(() => {
        apiService.getHighlanders().then(result => {
            const highlanders = result["hydra:member"].filter(product => product.highlander);
            setHighlanders(highlanders);
        })
    }, []);

    return (
        <div className="row justify-content-around">
            <h1 className="text-center pb-3">Les Highlanders du moment 🔥</h1>
            <InfoCard props={highlanders} basePath="products"/>
        </div>
    )
}


export default Highlanders;
