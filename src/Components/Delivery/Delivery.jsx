import React, {useEffect, useState} from "react";
import "./Delivery.css";
import {Link} from "react-router-dom";


const Delivery = ({ onContinueToPayment }) => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const token = localStorage.getItem("token");
    const [addresses, setAddresses] = useState([]);
    const [selectedAddress, setSelectedAddress] = useState(null);


    const calculateTotal = () =>
        cart.reduce((total, item) => total + item.price * item.quantity, 0);

    const fetchAddress = async () => {
        try {
            const response = await fetch("http://127.0.0.1:8000/api/adresses", {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (!response.ok) {
                throw new Error("Failed to fetch address data");
            }
            const addressesData = await response.json();
            setAddresses(addressesData["hydra:member"]);
            console.log(addresses);
        } catch (e) {
            console.error("Error fetching user data:", e);
        }
    }
    const handleAddressChange = (event) => {
        const selectedAddressId = parseInt(event.target.value);
        const address = addresses.find((addr) => addr.id === selectedAddressId);
        setSelectedAddress(address);
    };

    useEffect(() => {
        fetchAddress();
    }, []);

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
                                <li key={index} className="list-group-item d-flex justify-content-between lh-condensed">
                                    <div>
                                        <h6 className="my-0">{item.name} - {item.quantity}</h6>
                                        <small className="text-muted">{item.details}</small>
                                    </div>
                                    <div>
                                        <span className="text-muted">€{item.price * item.quantity}</span>
                                    </div>
                                </li>
                        ))}
                        <li className="list-group-item d-flex justify-content-between">
                            <span>Total</span>
                                <strong>€{calculateTotal()}</strong>
                        </li>
                    </ul>
                    </div>
                </div>
                <div className="col-md-8 order-md-1">
                    <h4 className="mb-3 card-header py-3">Adresse de livraison</h4>
                    <form className="needs-validation card-body " noValidate>
                        <div className="row">
                            <div className="col-md-6 mb-3">
                                <label htmlFor="name">Prénom et nom</label>
                                <input type="text" className="form-control" id="name"
                                       required/>
                                <div className="invalid-feedback">Un prénom et nom valides sont requis.</div>
                            </div>
                            <div className="col-md-6 mb-3">
                                <label htmlFor="address-name">Nom de l'adresse</label>
                                <select className="form-control" id="address-name"
                                        required onChange={handleAddressChange}>
                                    <option>Choisissez...</option>
                                    {addresses?.map((address) => (
                                        <option key={address.id} value={address.id}>{address.name}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        {selectedAddress && (
                            <>
                                <div className="mb-3">
                                    <label htmlFor="address">Adresse</label>
                                    <input type="text" className="form-control" id="address" placeholder="1234 Main St"
                                           value={selectedAddress.adress} readOnly required/>
                                </div>
                                <div className="row">
                                    <div className="col-md-5 mb-3">
                                        <label htmlFor="country">Pays</label>
                                        <input type="text" className="custom-select d-block w-100 form-control" id="country"
                                               readOnly required value={selectedAddress.country}/>
                                    </div>

                                    <div className="col-md-4 mb-3">
                                        <label htmlFor="region">Région</label>
                                        <input className="custom-select d-block w-100 form-control" id="region" required
                                        value={selectedAddress.region} readOnly/>
                                    </div>

                                    <div className="col-md-3 mb-3">
                                        <label htmlFor="zip">Code postal</label>
                                        <input type="text" className="form-control" id="zip" required readOnly
                                        value={selectedAddress.zipCode}/>
                                    </div>

                                    <div className="col-md-4 mb-3">
                                        <label htmlFor="city">Ville</label>
                                        <input className="custom-select d-block w-100 form-control" id="city" required
                                        readOnly value={selectedAddress.city}/>
                                    </div>
                                </div>
                            </>
                        )}




                        <hr className="mb-4"/>
                        <div className="custom-control custom-checkbox">
                            <input type="checkbox" className="custom-control-input" id="same-address"/>
                            <label className="custom-control-label" htmlFor="same-address">L'adresse de livraison est la
                                même que mon adresse de facturation</label>
                        </div>

                        <Link to="/checkout">
                            <button type="submit"
                                    className="btn btn-primary btn-lg btn-block cart-button"
                                    disabled={!selectedAddress}
                                    onClick={onContinueToPayment}>Continuer au paiement
                            </button>
                        </Link>
                    </form>
                </div>
            </div>
            </div>
        </div>
    )
};

export default Delivery;