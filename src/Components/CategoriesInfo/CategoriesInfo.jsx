import React from 'react';
import "./CategoriesInfo.css"
import InfoCard from "../InfoCard/InfoCard";

const CategoriesInfo = ({categories}) => {


    return (
        <div className="row justify-content-around py-5">
            <h1 className="text-center pb-3">VENANT DES HAUTES TERRES D'ÉCOSSE</h1>
            <br/>
            <h1 className="text-center pb-3">NOS MEUBLES SONT IMMORTELS</h1>
             <InfoCard props={categories} basePath="categories" />
        </div>
    );
}

export default CategoriesInfo;
