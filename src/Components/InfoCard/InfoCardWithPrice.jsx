import {Link} from "react-router-dom";
import React, {useEffect, useState} from "react";
import "./InfoCardWithPrice.css";
import {imageApiService} from "../../service/imageApiService";


const InfoCardWithPrice = ({props, basePath}) => {
    const [imageData, setImageData] = useState([]);
    const apiUrl = "http://127.0.0.1:8000";

    useEffect(() => {
        const fetchImageData = async () => {
            try {
                const imageDataArray = [];
                for (const item of props) {
                    if (item.images.length > 0) {
                        const images = await imageApiService.getImageDetails(item.images[0]['@id']);
                        imageDataArray.push(apiUrl + images.contentUrl);
                    } else {
                        console.warn(`No images found for ${item.name}`);
                    }
                }
                setImageData(imageDataArray);
            } catch (error) {
                console.error('Error fetching image data:', error);
            }
        };

        fetchImageData();

    }, [props, apiUrl]);
    return (
        <div className="row justify-content-around py-5">
            {props ? (
                props.map((item, index) => (
                    <div key={index} className="col-md-3 mb-4">
                        {imageData[index] && (
                            <div className="card text-white d-flex flex-column">
                                <Link to={`/${basePath}/${item.id}`}>
                                    <img
                                        className="card-img-top"
                                        src={imageData[index]}
                                        alt={item.name}
                                        style={{objectFit: 'cover', height: '400px'}}
                                    />
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
                                            <h3 className="card-title text-center out-of-stock">Out of stock</h3>
                                        </div>
                                    )}
                                </Link>
                            </div>
                        )}
                    </div>
                ))
            ) : (
                <p>No products available</p>
            )}
        </div>
    );

}

export default InfoCardWithPrice;
