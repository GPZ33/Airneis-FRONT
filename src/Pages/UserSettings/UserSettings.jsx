import {useEffect, useState} from "react";
import {jwtDecode} from "jwt-decode";


const UserSettings = () => {

    const [userData, setUserData] = useState({
        firstName: "",
        lastName: "",
        phoneNumber: "",
        email: ""
    });

    const token = localStorage.getItem("token");
    const decodedToken = jwtDecode(token);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await fetch(`http://127.0.0.1:8000/api/users/${decodedToken.id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                if (!response.ok) {
                    throw new Error("Failed to fetch user data");
                }
                const userData = await response.json();
                // Update state with the fetched user data
                setUserData({
                    firstName: userData.name,
                    lastName: userData.last_name,
                    phoneNumber: userData.phoneNumber,
                    email: userData.email
                });
                console.log(userData);
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };

        fetchUserData();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/users/${decodedToken.id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(userData)
            });
            if (!response.ok) {
                throw new Error("Failed to update user data");
            }
            console.log("User data updated successfully");
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
                            <div className="col-xxl-8 mb-5 mb-xxl-0">
                                <div className="bg-secondary-soft px-4 py-5 rounded">
                                    <div className="row g-3">
                                        <h4 className="mb-4 mt-0">Informations personnelles</h4>

                                        <div className="col-md-6">
                                            <label className="form-label">Prénom</label>
                                            <input type="text" className="form-control" placeholder=""
                                                   aria-label="Prénom" value={userData.firstName}/>
                                        </div>

                                        <div className="col-md-6">
                                            <label className="form-label">Nom</label>
                                            <input type="text" className="form-control" placeholder=""
                                                   aria-label="Nom" value={userData.lastName}/>
                                        </div>

                                        <div className="col-md-6">
                                            <label className="form-label">Numéro de téléphone</label>
                                            <input type="text" className="form-control" placeholder=""
                                                   aria-label="Phone number" value={userData.phoneNumber}/>
                                        </div>

                                        <div className="col-md-6">
                                            <label htmlFor="inputEmail4" className="form-label">Email</label>
                                            <input type="email" className="form-control" id="inputEmail4"
                                                   value={userData.email}/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="row mb-5 gx-5">
                            <div className="col-xxl-6 mb-5 mb-xxl-0">
                                <div className="bg-secondary-soft px-4 py-5 rounded">
                                    <div className="row g-3">
                                        <h4 className="mb-4 mt-0">Carnet d'adresses</h4>

                                        <div className="col-md-6">
                                            <label className="form-label" htmlFor="address">Livraison</label>
                                            <select className="form-control" id="address">
                                                <option></option>
                                            </select>
                                        </div>

                                        <div className="col-md-6">
                                            <label className="form-label"
                                                   htmlFor="facturation-address">Facturation</label>
                                            <select className="form-control" id="facturation-address">
                                                <option></option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="row mb-5 gx-5">
                            <div className="col-xxl-6 mb-5 mb-xxl-0">
                                <div className="bg-secondary-soft px-4 py-5 rounded">
                                    <div className="row g-3">
                                        <h4 className="mb-4 mt-0">Méthodes de paiement</h4>

                                        <div className="col-md-6">
                                            <label className="form-label" htmlFor="address">Choisissez votre méthodes de paiement</label>
                                            <select className="form-control" id="address">
                                                <option></option>
                                            </select>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>

                            <div className="gap-3 d-md-flex justify-content-md-end text-center">
                                <button type="button" className="btn btn-danger btn-lg">Delete profile</button>
                                <button type="button" className="btn btn-primary btn-lg">Update profile</button>
                            </div>
                    </form>

                </div>
            </div>
        </div>

)
};

export default UserSettings;