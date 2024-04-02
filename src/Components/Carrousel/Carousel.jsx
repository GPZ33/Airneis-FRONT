import React from "react";
import { Carousel } from "react-bootstrap";
import "./Carousel.css";

const CarouselHome = ({props, largerHeight}) => {

    return (
        <Carousel className="carousel" style={{ height: largerHeight ? "400px" : "300px"}}>
            {props.map((item, index) => {
                return (
                    <Carousel.Item key={index}>
                        <div className="d-flex justify-content-center">
                            <img
                                className="img-fluid"
                                src={item}
                                alt={`carousel-img ${index}`}
                                style={{ objectFit: "cover", height: largerHeight ? "400px" : "300px", width: "100%" }}
                            />
                        </div>
                        {/*<Carousel.Caption>*/}
                        {/*    <h3>{item.name}</h3>*/}
                        {/*</Carousel.Caption>*/}
                    </Carousel.Item>
                )
            })}
        </Carousel>
    );
};

export default CarouselHome;
