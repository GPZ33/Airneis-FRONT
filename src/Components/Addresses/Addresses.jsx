import React, {useState} from "react";
import {userApiService} from "../../service/userApiService";


const Addresses = ({addresses, setAddresses}) => {
    const token = localStorage.getItem("token");
    const [selectedAddress, setSelectedAddress] = useState(null);
    const [showAddAddressForm, setShowAddAddressForm] = useState(false);
    const [newAddress, setNewAddress] = useState({
        name: "",
        adress: "",
        region: "",
        city: "",
        zipCode: "",
        country: "",
    });

    const handleAddressSelection = (e) => {
        e.preventDefault();
        if (selectedAddress) {
            const id = selectedAddress.id;
            localStorage.setItem("addressId", id);
            alert("Vous pouvez continuez au paiement");
        }
    };

    const handleAddressChoice = (e) => {
        const selectedAddressId = parseInt(e.target.value);
        if (selectedAddressId === -1) {
            setShowAddAddressForm(true);
            setSelectedAddress(null);
        } else {
            setShowAddAddressForm(false);
            const address = addresses.find((addr) => addr.id === selectedAddressId);
            setSelectedAddress(address);
        }
    };

    const handleNewAddressInputChange = (e) => {
        const { name, value } = e.target;
        setNewAddress((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleAddAddressSubmit = async (e) => {
        e.preventDefault();
        console.log("handleAddAddressSubmit started");
        try {
            const response = await userApiService.addAddress(token, newAddress);
            console.log("Response from addAddress:", response);
            if (response.status === 201) {
            setNewAddress({
                name: "",
                adress: "",
                region: "",
                city: "",
                zipCode: "",
                country: "",
            });}
            const result = await userApiService.getUserAddresses(token);
            setAddresses(result["hydra:member"]);
        } catch (error) {
            console.error("Error adding new address:", error);
        }
    };


    return (
    <div className="row-md-6 mb-3">
        <div className="bg-secondary-soft px-4 py-3 rounded ">

            <div className="col-md-6">
                <label className="form-label text-black" htmlFor="address">Choisissez ou ajouter une adresse</label>
                <select className="form-control" id="address"
                        onChange={handleAddressChoice}>
                    <option></option>
                    <option value={-1}>Ajouter une nouvelle adresse</option>
                    {addresses?.map((address) => (
                        <option key={address.id} value={address.id}>{address.name}</option>
                    ))}
                </select>
            </div>

            {/* Show address details form */}
            {selectedAddress && (
                <div className="col-md-12 mt-3 text-black">
                    <p>Rue: {selectedAddress.adress}</p>
                    <p>Région: {selectedAddress.region}</p>
                    <p>Ville: {selectedAddress.city}</p>
                    <p>Code postale: {selectedAddress.zipCode}</p>
                    <p>Pays: {selectedAddress.country}</p>
                    <button className="cart-button btn btn-primary btn-md" type="button" onClick={handleAddressSelection}>Valider
                    </button>
                </div>

            )}

            {/* Add new address form */}
            {showAddAddressForm && (
                <form onSubmit={handleAddAddressSubmit} className="col-md-12 mt-3">
                    <div className="row">
                        <div className="col-md-6">
                            <label className="form-label">Nom</label>
                            <input
                                type="text"
                                className="form-control"
                                name="name"
                                value={newAddress.name}
                                onChange={handleNewAddressInputChange}
                            />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Rue</label>
                            <input
                                type="text"
                                className="form-control"
                                name="adress"
                                value={newAddress.adress}
                                onChange={handleNewAddressInputChange}
                            />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Région</label>
                            <input
                                type="text"
                                className="form-control"
                                name="region"
                                value={newAddress.region}
                                onChange={handleNewAddressInputChange}
                            />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Ville</label>
                            <input
                                type="text"
                                className="form-control"
                                name="city"
                                value={newAddress.city}
                                onChange={handleNewAddressInputChange}
                            />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Code Postale</label>
                            <input
                                type="text"
                                className="form-control"
                                name="zipCode"
                                value={newAddress.zipCode}
                                onChange={handleNewAddressInputChange}
                            />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Pays</label>
                            <input
                                type="text"
                                className="form-control"
                                name="country"
                                value={newAddress.country}
                                onChange={handleNewAddressInputChange}
                            />
                        </div>
                        <div className="gap-3 d-md-flex justify-content-md-end text-center pt-4">
                            <button type="submit" className="cart-button btn btn-primary btn-md">Ajouter
                            </button>
                        </div>
                    </div>
                </form>
            )}
        </div>
    </div>
    )
};

export default Addresses;