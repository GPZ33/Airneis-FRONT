import React from "react";
import { Carousel } from "react-bootstrap";
import "./Carousel.css";

const CarouselSlides = ({props, largerHeight}) => {

    return (
        <Carousel className="carousel" style={{ height: largerHeight ? "400px" : "300px"}}>
            {props.map((item, index) => {
                return (
                    <Carousel.Item key={index}>
                        <div className="d-flex justify-content-center">
                            <img
                                className="img-fluid"
                                src={`http://127.0.0.1:8000/${item}`}
                                alt={`carousel-img ${index}`}
                                style={{ objectFit: "cover", height: largerHeight ? "400px" : "300px", width: "100%" }}
                            />
                        </div>
                    </Carousel.Item>
                )
            })}
        </Carousel>
    );
};

export default CarouselSlides;
