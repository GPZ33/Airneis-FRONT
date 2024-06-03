import React, { useEffect, useState } from 'react';
import { useCart } from '../../Context/CartContext';
import './Cart.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import {Link} from "react-router-dom";
import {userApiService} from "../../service/userApiService";
import {orderApiService} from "../../service/orderApiService";
import {imageApiService} from "../../service/imageApiService";


const Cart = ({isAuthenticated}) => {
    const { cart, incrementQuantity, decrementQuantity, removeFromCart } = useCart();
    const [imageData, setImageData] = useState([]);
    const apiUrl = "http://127.0.0.1:8000";
    const token = localStorage.getItem('token');
    const [userData, setUserData] = useState({
        id: 0
    });

    //get user details
    useEffect( () => {
        if (isAuthenticated) {
            userApiService.getUsers(token).then(result => {
                setUserData({
                    id: result["hydra:member"][0].id
                });
                localStorage.setItem("userId", result["hydra:member"][0].id);
            })
        }

    }, [token, isAuthenticated]);

    //get images
    useEffect( () => {
        const fetchImages = async () => {
            try {
                const images = await Promise.all(cart.map(
                    async (product) => await imageApiService.getImageDetails(product.images[0]['@id'])));
                setImageData(images);
            } catch (error) {
                console.error('Error fetching image details:', error.message);
            }
        };
        if (cart) {
            fetchImages();
        }
    }, [cart]);


    const calculateTotalPrice = () =>
        cart.reduce((total, item) => total + item.price * item.quantity, 0);

    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

    const handleOrder = async () => {
        try {
            for (const item of cart) {
                orderApiService.addOrderProducts(token, {
                    idProduct: "/api/products/" + item.id,
                    quantity: item.quantity,
                    idUser: "/api/users/" + userData.id
                })
            }
        } catch (error) {
            console.error('Error placing order:', error);
        }
    };




    return (
        <>
            {cart.length > 0 ? (
                    <section className="h-100 gradient-custom">
                        <div className="container py-5">
                            <div className="row d-flex justify-content-center my-4">
                                <div className="col-md-8">
                                    <div className="card mb-4">
                                        <div className="card-header py-3">
                                            <h5 className="mb-0">Panier - {totalItems} produits</h5>
                                        </div>

                                        <div className="card-body">
                                            {imageData.length > 0 ? (
                                                <>
                                                    <div className="row">
                                                        {cart.map((item, index) => (
                                                            <>
                                                                {/* Image */}
                                                                <div className="col-lg-3 col-md-12 mb-4 mb-lg-0">

                                                                    <div
                                                                        className="bg-image hover-overlay hover-zoom ripple rounded"
                                                                        data-mdb-ripple-color="light">
                                                                        <img
                                                                            src={apiUrl + imageData[index].contentUrl}
                                                                            className="w-100" alt={item.name}
                                                                        />
                                                                    </div>
                                                                </div>

                                                                {/* Data */}
                                                                <div className="col-lg-5 col-md-6 mb-4 mb-lg-0">
                                                                    <p><strong>{item.name}</strong></p>
                                                                    <p>Description: {item.description}</p>
                                                                    <button type="button"
                                                                            className="cart-button btn btn-primary btn-sm me-1 mb-2"
                                                                            title="Remove item"
                                                                            onClick={() => decrementQuantity(item.id)}>
                                                                        <FontAwesomeIcon icon={faTrash}/></button>
                                                                </div>

                                                                {/* Quantity */}
                                                                <div className="col-lg-4 col-md-6 mb-4 mb-lg-0">
                                                                    <div className="d-flex mb-4"
                                                                         style={{maxWidth: "300px"}}>
                                                                        <button
                                                                            className="cart-button btn btn-primary px-3 me-2"
                                                                            onClick={() => decrementQuantity(item.id)}>
                                                                            <FontAwesomeIcon icon={faMinus}/>
                                                                        </button>
                                                                        <div className="form-outline">
                                                                            <input id="form1" min="0" name="quantity"
                                                                                   value={item.quantity}
                                                                                   type="number"
                                                                                   className="form-control"/>
                                                                            <label className="form-label"
                                                                                   htmlFor="form1">Quantity</label>
                                                                        </div>
                                                                        <button
                                                                            className="cart-button btn btn-primary px-3 ms-2"
                                                                            onClick={() => incrementQuantity(item.id)}>
                                                                            <FontAwesomeIcon icon={faPlus}/>
                                                                        </button>
                                                                    </div>
                                                                    {/* Price */}
                                                                    <p className="text-start text-md-center">
                                                                        <strong>Prix: ${(item.price * item.quantity).toFixed(2)}</strong>
                                                                    </p>
                                                                    <p className="text-start text-md-center">
                                                                        TVA: ${(item.price * item.quantity * 0.2).toFixed(2)}
                                                                    </p>
                                                                </div>

                                                                <hr className="my-4"/>
                                                            </>
                                                        ))}
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
                                        <div className="card-header py-3">
                                            <h5 className="mb-0">Total</h5>
                                        </div>
                                        <div className="card-body">
                                            <ul className="list-group list-group-flush">
                                                <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 mb-3">
                                                    <div>
                                                        <strong>Montant total</strong>
                                                    </div>
                                                    <span><strong>${(calculateTotalPrice().toFixed(2))}</strong></span>
                                                </li>
                                                <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 mb-3">
                                                    <div>
                                                        <strong>TVA</strong>
                                                    </div>
                                                    <span>${(calculateTotalPrice() * 0.2).toFixed(2)}</span>
                                                </li>
                                            </ul>
                                            {isAuthenticated ? (
                                                <Link to="/checkout">
                                                    <button type="button"
                                                            className="cart-button btn btn-primary btn-lg btn-block"
                                                            disabled={cart.length === 0}
                                                            onClick={handleOrder}
                                                    >
                                                        Continuer au livraison
                                                    </button>
                                                </Link>
                                            ) : (
                                                <Link to="/log_in">
                                                    <button type="button"
                                                            className="cart-button btn btn-primary btn-lg btn-block"
                                                            disabled={cart.length === 0}
                                                    >
                                                        Connectez-vous pour continuez
                                                    </button>
                                                </Link>
                                            )}

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
            ) : (
                <section className="h-100 gradient-custom">
                    <div className="container py-5">
                        <div className="row d-flex justify-content-center my-4">
                            <div className="col-md-8">
                                <div className="card mb-4">
                                    <div className="card-header py-3">
                                    <h5 className="mb-0 text-center">Votre panier est vide</h5>
                                    </div>
                                    <div className="card-body d-flex justify-content-center">
                                    <Link to="/">
                                        <button type="button"
                                                className="cart-button btn btn-primary btn-lg btn-block "
                                                >Reveneir à l'accueil
                                        </button>
                                    </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            )
            }
        </>
    );
};

export default Cart;
