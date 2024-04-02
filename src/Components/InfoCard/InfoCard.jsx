import React from 'react';
import "./InfoCard.css"
import {Link} from "react-router-dom";


const InfoCard = ({props, basePath}) => {
    return (
        <>
            {props ? (
                Array.isArray(props) ? (
                    props.map((item, index) => (
                        <div key={index} className="col-md-3 mb-4">
                            <div className="card text-white h-50 d-flex flex-column">
                                <Link to={`/${basePath}/${item.name}`}>
                                    <img className="card-img" src={item.img[0]} alt={item.name}
                                         style={{objectFit: 'cover', height: '200px'}}/>
                                    <div className="card-img-overlay w-100 top-100">
                                        <h5 className="card-title ">{item.name}</h5>
                                    </div>
                                </Link>
                            </div>
                        </div>
                    ))
                ) : (
                    <div>
                        <div className="card text-white h-50 d-flex flex-column">
                                <img className="card-img" src={props.img[0]} alt={props.name}
                                     style={{ objectFit: "cover", height: "300px", width: "100%" }}/>
                                <div className="card-img-overlay w-100 top-100">
                                    <h5 className="card-title text-center display-4">{props.name}</h5>
                                </div>
                        </div>
                    </div>
                )
            ) : (
                <p>The products are loading</p>
            )}
        < />
    );
}


export default InfoCard;