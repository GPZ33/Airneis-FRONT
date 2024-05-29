import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMinus, faPlus, faTrash} from "@fortawesome/free-solid-svg-icons";
import {Link} from "react-router-dom";
import React from "react";


const Orders = () => {
    const token = localStorage.getItem("token");


    return (
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
                                                            <a href="#!">
                                                                <div className="mask"
                                                                     style={{backgroundColor: "rgba(251, 251, 251, 0.2)"}}></div>
                                                            </a>
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
                                                            <strong>${item.price * item.quantity}</strong>
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
                                        <span><strong>${calculateTotal()}</strong></span>
                                    </li>
                                </ul>
                                <Link to="/checkout">
                                    <button type="button"
                                            className="cart-button btn btn-primary btn-lg btn-block"
                                            disabled={cart.length === 0}>Continuer au livraison
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
};

export default Orders;