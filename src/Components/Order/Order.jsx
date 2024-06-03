import "./Order.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrash} from "@fortawesome/free-solid-svg-icons";
import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {orderApiService} from "../../service/orderApiService";
import {userApiService} from "../../service/userApiService";
import {imageApiService} from "../../service/imageApiService";

const Order = () => {
    const token = localStorage.getItem("token");
    const cardInfo = JSON.parse(localStorage.getItem("cardInfo"));
    const deliveryName = localStorage.getItem("deliveryName");
    const {orderId} = useParams();
    const [orderDetails, setOrderDetails] = useState(null);
    const [productImages, setProductImages] = useState([]);
    const [address, setAddress] = useState(null);
    const apiUrl = "http://127.0.0.1:8000";

    const fetchAll = async () => {
        const orderResult = await orderApiService.getOrderById(orderId, token);
        console.log(orderDetails);

        if (orderResult) {
            const imagesData = await Promise.all(orderResult.orderProducts.map(
                async (product) => await imageApiService.getImageDetails(product.idProduct.images[0])
            ));
            userApiService.getAddressById(token, orderResult.idAdress.id).then(result => {
                setOrderDetails(orderResult);
                setProductImages(imagesData);
                setAddress(result);
            })
        }
    }


//get order by id, images of products in the order and address of order
useEffect(() => {
    fetchAll()
}, []);


if (!orderDetails) {
    return <p>Loading...</p>;
}


return (
    <section className="order-page h-100 gradient-custom">
        <div className="my-5">
            <h3 className="text-center">Commande
                N°{orderDetails.id} - {orderDetails.date} - {orderDetails.state}</h3>
        </div>
        <div className="container py-3">
            <div className="row d-flex justify-content-center my-4">
                <div className="col-md-8">
                    <div className="card mb-4">

                        <div className="card-body">
                            {orderDetails.orderProducts.length > 0 ? (
                                <>
                                    <div className="row">
                                        {productImages != null ? (
                                            <>
                                                {orderDetails.orderProducts.map((product, index) => (
                                                    <>
                                                        {/* Image */}
                                                        <div className="col-lg-3 col-md-12 mb-4 mb-lg-0">

                                                            <div
                                                                className="bg-image hover-overlay hover-zoom ripple rounded"
                                                                data-mdb-ripple-color="light">
                                                                {productImages ? (
                                                                    <img
                                                                        src={apiUrl + productImages[index].contentUrl}
                                                                        className="w-100" alt={product.idProduct.id}
                                                                    />
                                                                ) : (
                                                                    <p>Loading image...</p>
                                                                )}

                                                            </div>
                                                        </div>

                                                        {/* Data */}
                                                        <div className="col-lg-5 col-md-6 mb-4 mb-lg-0">
                                                            <p><strong>{product.idProduct.name}</strong></p>
                                                            <p>{product.idProduct.details} </p>
                                                            <button type="button"
                                                                    className="cart-button btn btn-primary btn-sm me-1 mb-2"
                                                                    title="Remove item"
                                                                    onClick="">
                                                                <FontAwesomeIcon icon={faTrash}/></button>
                                                        </div>

                                                        {/* Quantity */}
                                                        <div className="col-lg-4 col-md-6 mb-4 mb-lg-0">
                                                            <p className="text-start text-md-center">{product.quantity}</p>
                                                            {/* Price */}
                                                            <p className="text-start text-md-center">
                                                                <strong>{(product.price * product.quantity).toFixed(2)} €</strong>
                                                            </p>
                                                        </div>

                                                        <hr className="my-4"/>
                                                    </>
                                                ))}
                                            </>
                                        ) : (
                                            <p>Data is loading...</p>
                                        )}

                                    </div>
                                </>
                            ) : (
                                <p>Une erreur s'est produite</p>
                            )}
                        </div>

                    </div>


                </div>
                <div className="col-md-4">
                    <div className="card mb-4">
                        <div className="py-3">
                            <h5 className="mb-0 px-2">Total</h5>
                            <hr/>
                        </div>
                        <div className="card-body">
                            <ul className="list-group list-group-flush">
                                <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 mb-3">
                                    <div>
                                        <strong>Montant total</strong>
                                    </div>
                                    <span><strong>{(orderDetails.priceTotal).toFixed(2)} €</strong></span>
                                </li>
                                <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 mb-3">
                                    <div>
                                        <p>TVA</p>
                                    </div>
                                    <span>{(orderDetails.priceTotal * 0.2).toFixed(2)} €</span>
                                </li>

                            </ul>
                        </div>

                        <div className="card-body">
                            <h5 className="mb-0">Adresse de livraison</h5>
                            <hr/>
                            <div className="card-body">
                                {address ? (
                                    <div className="border-0 px-0 mb-3">
                                        <p>{deliveryName}</p>
                                        <p>{address.adress}</p>
                                        <p>{address.zipCode} {address.ville}</p>
                                        <p>{address.country}</p>
                                    </div>
                                ) : (
                                    <p>Loading...</p>
                                )}

                            </div>
                        </div>

                        <div className="card-body">
                            <h5 className="mb-0">Méthode de paiement</h5>
                            <hr/>
                            <div className="card-body">
                                <div className="border-0 px-0 mb-3">
                                    <p>Nom : {cardInfo.cardName}</p>
                                    <p>Numéro : {`•••• •••• •••• ${cardInfo.cardNumber.slice(-4)}`}</p>
                                </div>
                            </div>
                        </div>

                        {orderDetails.state !== "expedié" && orderDetails.state !== "livré" ? (
                            <button className="btn cart-button btn-primary btn-lg btn-block mt-1">Annuler la
                                commande</button>
                        ) : (
                            <></>
                        )}

                    </div>
                </div>
            </div>
        </div>
    </section>
)
}
;

export default Order;