import React, {useEffect, useState} from "react";
import "./Delivery.css";
import {Link} from "react-router-dom";
import {userApiService} from "../../service/userApiService";
import {apiService} from "../../service/apiService";
import Addresses from "../Addresses/Addresses";



const Delivery = ({onContinueToPayment}) => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const token = localStorage.getItem("token");
    const addressId = localStorage.getItem("addressId");
    const [addresses, setAddresses] = useState([]);
    const userId = localStorage.getItem("userId");


    const calculateTotal = () =>
        cart.reduce((total, item) => total + item.price * item.quantity, 0);

    //get user's addresses
    useEffect(() => {
        userApiService.getUserAddresses(token).then(result => {
            setAddresses(result["hydra:member"]);
        })
    }, []);

    const handleContinueToPayment = async () => {
        try {
            apiService.getOrderProducts(token).then(result => {
                const userOrderProducts = result["hydra:member"];
                console.log(userOrderProducts);
                const newOrderProducts = userOrderProducts.filter(orderProduct => !orderProduct.idOrder);
                console.log(newOrderProducts);

                apiService.addOrder(token,{
                        idUser: "/api/users/" + userId,
                        idAdress: "/api/adresses/" + addressId,
                        state: "en cours de paiement",
                        date: new Date().toISOString().split('T')[0],
                        orderProducts: newOrderProducts.map((orderProduct) => `/api/order_products/${orderProduct.id}`)
                    })
                localStorage.setItem("cart", JSON.stringify([]));
            })
        } catch (error) {
            console.error("Error creating order:", error);
        }
    };

    return (
        <div className="container delivery-page py-5">
            <div className="card mb-4">

                <div className="row">
                    <div className="col-md-4 order-md-2 mb-4">
                        <h4 className="d-flex justify-content-between align-items-center mb-3 card-header py-3">
                            <span className="text-muted">Votre panier</span>
                        </h4>
                        <div className="card-body d-flex ">
                            <ul className="list-group mb-3 sticky-top card-body d-flex justify-content-center">
                                {cart.map((item, index) => (
                                    <li key={index}
                                        className="list-group-item d-flex justify-content-between lh-condensed">
                                        <div>
                                            <h6 className="my-0">{item.name} - {item.quantity}</h6>
                                            <small className="text-muted">{item.details}</small>
                                        </div>
                                        <div>
                                            <span className="text-muted">{item.price * item.quantity}€</span>
                                        </div>
                                    </li>
                                ))}
                                <li className="list-group-item d-flex justify-content-between lh-condensed">
                                    <div>
                                        <p className="text-muted">TVA</p>
                                        <strong className="text-muted">{(calculateTotal() * 0.2).toFixed(2)}€</strong>
                                    </div>
                                    <div>
                                        <p>Total</p>
                                        <strong>{calculateTotal()}€</strong>
                                    </div>


                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-md-8 order-md-1">
                        <h4 className="mb-3 card-header py-3">Adresse de livraison</h4>
                        <section className="needs-validation card-body " noValidate>
                            <div className="row">
                                <div className="row-md-6 mb-3">
                                    <label htmlFor="name">Prénom et nom</label>
                                    <input type="text" className="form-control" id="name"
                                           required/>
                                    <div className="invalid-feedback">Un prénom et nom valides sont requis.</div>
                                </div>
                            </div>

                            <Addresses addresses={addresses} setAddresses={setAddresses}/>

                            <hr className="mb-4"/>
                            <div className="custom-control custom-checkbox">
                                <input type="checkbox" className="custom-control-input" id="same-address"/>
                                <label className="custom-control-label" htmlFor="same-address">L'adresse de livraison
                                    est la
                                    même que mon adresse de facturation</label>
                            </div>

                            <Link to="/checkout">
                                <button type="submit"
                                        className="btn btn-primary btn-lg btn-block cart-button"
                                        onClick={() => {
                                            handleContinueToPayment();
                                            onContinueToPayment();
                                        }}>Continuer au paiement
                                </button>
                            </Link>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Delivery;