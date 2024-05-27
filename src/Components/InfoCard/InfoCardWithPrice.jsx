import {Link} from "react-router-dom";
import React, {useEffect, useState} from "react";
import "./InfoCardWithPrice.css";


const InfoCardWithPrice = ({props, basePath}) => {
    const [imageData, setImageData] = useState([]);
    const apiUrl = "http://127.0.0.1:8000";
    useEffect(() => {
        const fetchImageData = async () => {
            try {
                const imageDataArray = [];
                for (const item of props) {
                    if (item.images.length > 0) {
                        const url = apiUrl + item.images[0]['@id'];
                        const response = await fetch(url);
                        if (!response.ok) {
                            throw new Error(`Failed to fetch image data for ${item.name}`);
                        }
                        const imageData = await response.json();
                        imageDataArray.push(imageData);
                    } else {
                        // Handle case where there are no images for the item
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
                        {imageData[index] && ( // Ensure image data exists for the current item
                            <div className="card text-white d-flex flex-column">
                                <Link to={`/${basePath}/${item.id}`}>
                                    <img
                                        className="card-img-top"
                                        src={apiUrl + imageData[index].contentUrl} // Use the corresponding image from imageDataArray
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
