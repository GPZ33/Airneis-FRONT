import {Link} from "react-router-dom";
import React from "react";


const InfoCardWithPrice = ({props}) => {

    return (
        <div className="row justify-content-around py-5">
            {props ? (props.map((item, index) => (
                    <div key={index} className="col-md-3 mb-4">
                        <div className="card text-white h-50 d-flex flex-column">
                            <Link to={`/products/${item.name}`}>
                                <img className="card-img-top" src={item.img[0]} alt={item.name}
                                     style={{objectFit: 'cover', height: '200px'}}/>
                                {item.stock ? (
                                    <div className="card-body d-flex justify-content-between">
                                        <div>
                                            <h5 className="card-title">{item.name}</h5>
                                        </div>
                                        <div>
                                            <h6 className="card-price">{item.price}$</h6>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="card-img-overlay w-100 top-100">
                                        <h5 className="card-title text-center display-4 out-of-stock">Out of stock</h5>
                                    </div>
                                )}
                            </Link>
                        </div>
                    </div>
                ))
            ) : (
                <p>No products available</p>
            )}
        </div>
    )
}

export default InfoCardWithPrice;