import React, { useEffect, useState } from 'react';
import "./InfoCard.css";
import { Link } from "react-router-dom";

const InfoCard = ({ props, basePath }) => {
    const [imageData, setImageData] = useState([]);
    const [loading, setLoading] = useState(true);
    const apiUrl = "http://127.0.0.1:8000";

    useEffect(() => {
        const fetchImageData = async () => {
            try {
                const imageDataArray = [];
                if (Array.isArray(props)) {
                    const promises = props.map(async (item) => {
                        let url = "";
                        if (item["@type"] === "Product") {
                            url = apiUrl + item.images[0]['@id'];
                        } else {
                            url = apiUrl + item.image['@id'];
                        }
                        const response = await fetch(url);
                        if (!response.ok) {
                            throw new Error(`Failed to fetch image data for ${item.name}`);
                        }
                        const imageData = await response.json();
                        imageDataArray.push(imageData);
                    });
                    await Promise.all(promises);
                } else {
                    const url = apiUrl + props.image['@id'];
                    const response = await fetch(url);
                    if (!response.ok) {
                        throw new Error(`Failed to fetch image data for ${props.name}`);
                    }
                    const imageData = await response.json();
                    imageDataArray.push(imageData);
                }
                setImageData(imageDataArray);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching image data:', error);
                setLoading(false);
            }
        };

        if (props) {
            fetchImageData();
        }
    }, [props, apiUrl]);

    if (loading) {
        return <p>The products are loading</p>;
    }

    return (
        <>
            {props ? (
                Array.isArray(props) ? (
                    props.map((item, index) => (
                        <div key={index} className="col-md-3 mb-4">
                            <div className="card text-white h-50 d-flex flex-column">
                                <Link to={`/${basePath}/${item.id}`}>
                                    {imageData[index] && (
                                        <img 
                                            className="card-img" 
                                            src={apiUrl + imageData[index]?.contentUrl} 
                                            alt={item.name}
                                            style={{ objectFit: 'cover', height: '200px' }}
                                        />
                                    )}
                                    <div className="card-img-overlay w-100 top-100">
                                        <h5 className="card-title">{item.name}</h5>
                                    </div>
                                </Link>
                            </div>
                        </div>
                    ))
                ) : (
                    <div>
                        {imageData.map((imageUrl, index) => (
                            <div className="card text-white h-50 d-flex flex-column" key={index}>
                                <img
                                    className="card-img"
                                    src={apiUrl + imageUrl.contentUrl}
                                    alt={props.name}
                                    style={{ objectFit: "cover", height: "300px", width: "100%" }}
                                />
                                <div className="card-img-overlay w-100 top-100">
                                    <h5 className="card-title text-center display-4">{props.name}</h5>
                                </div>
                            </div>
                        ))}
                        {imageData.length === 0 && (
                            <p>Couldn't load images</p>
                        )}
                    </div>
                )
            ) : (
                <p>The products are loading</p>
            )}
        </>
    );
}

export default InfoCard;
