import React, {useEffect, useState} from 'react';
import "./Highlanders.css"
import InfoCard from "../InfoCard/InfoCard";
import {productApiService} from "../../service/productApiService";


const Highlanders = () => {
    const [highlanders, setHighlanders] = useState(null);

    useEffect(() => {
        productApiService.getAllProducts().then(result => {
            const highlanders = result.filter(product => product.highlander);
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
