import React, {useEffect, useState} from "react";
import {userApiService} from "../../service/userApiService";
import Addresses from "../../Components/Addresses/Addresses";

const UserSettings = () => {
    const token = localStorage.getItem("token");
    const [addresses, setAddresses] = useState([]);

    const [userData, setUserData] = useState({
        id: 0,
        name: "",
        last_name: "",
        phoneNumber: "",
        email: "",
        plainPassword: ""
    });

    //get user
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                userApiService.getUsers(token).then(result => {
                    setUserData({
                        id: result["hydra:member"][0].id,
                        name: result["hydra:member"][0].name,
                        last_name: result["hydra:member"][0].last_name,
                        phoneNumber: result["hydra:member"][0].phoneNumber,
                        email: result["hydra:member"][0].email,
                        plainPassword: result["hydra:member"][0].plainPassword
                    });
                })
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };
        fetchUserData();
    }, []);

    //get user's addresses
    useEffect(() => {
        userApiService.getUserAddresses(token).then(result => {
            setAddresses(result["hydra:member"]);
        })
    }, []);

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setUserData((prevData) => ({...prevData, [name]: value}));
        const parsedValue = name === 'phoneNumber' ? parseInt(value) : value;
        setUserData((prevData) => ({...prevData, [name]: parsedValue}))
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        try {
            userApiService.updateUser(userData.id, token, userData)
        } catch (error) {
            console.error("Error updating user data:", error);
        }
    };

    return (
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <div className="my-5">
                        <h3>Mes paramètres</h3>
                        <hr/>
                    </div>

                    <form onSubmit={handleFormSubmit} className="file-upload">
                        <div className="row mb-5 gx-5">
                            {/* Contact detail */}
                            <div className="bg-secondary-soft px-4 py-5 rounded">
                                <div className="row g-3">
                                    <h4 className="mb-4 mt-0">Informations personnelles</h4>

                                    <div className="col-md-6">
                                        <label className="form-label">Prénom</label>
                                        <input
                                            type="text" className="form-control"
                                            name="name"
                                            aria-label="Prénom" value={userData.name}
                                            onChange={handleInputChange}
                                        />
                                    </div>

                                    <div className="col-md-6">
                                        <label className="form-label">Nom</label>
                                        <input type="text" className="form-control" name="last_name"
                                               aria-label="Nom" value={userData.last_name}
                                               onChange={handleInputChange}/>
                                    </div>

                                    <div className="col-md-6">
                                        <label className="form-label">Numéro de téléphone</label>
                                        <input type="text" className="form-control" name="phoneNumber"
                                               aria-label="Phone number" value={userData.phoneNumber}
                                               onChange={handleInputChange}/>
                                    </div>

                                    <div className="col-md-6">
                                        <label htmlFor="inputEmail4" className="form-label">Email</label>
                                        <input type="email" className="form-control" id="inputEmail4"
                                               name="email"
                                               value={userData.email} onChange={handleInputChange}/>
                                    </div>

                                    <div className="col-md-6">
                                        <label htmlFor="inputPassword" className="form-label">Mot de passe</label>
                                        <input type="password" className="form-control" id="inputPassword"
                                               name="plainPassword"
                                               value={userData.plainPassword} onChange={handleInputChange}/>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="gap-3 d-md-flex justify-content-md-end text-center">
                            <button type="button" className="btn btn-danger btn-lg">Delete profile</button>
                            <button type="submit" className="cart-button btn btn-primary btn-lg btn-block">Update
                                profile
                            </button>
                        </div>
                    </form>

                    <div className="row g-3 pt-lg-5">
                        <h4 className=" mt-0">Carnet d'adresses</h4>
                        <Addresses addresses={addresses} setAddresses={setAddresses}/>
                    </div>


                    <div className="row mb-5 gx-5">
                        <div className="col-xxl-6 mb-5 mb-xxl-0">
                            <div className="bg-secondary-soft px-4 py-5 rounded">
                                <div className="row g-3">
                                    <h4 className="mb-4 mt-0">Méthodes de paiement</h4>

                                    <div className="col-md-6">
                                        <label className="form-label" htmlFor="address">Choisissez votre méthodes de
                                            paiement</label>
                                        <select className="form-control" id="address">
                                            <option></option>
                                        </select>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>

    )
};

export default UserSettings;