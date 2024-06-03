import React, { useState } from "react";
import { useNavigate } from "react-router-dom";


const LogIn = ({setIsAuthenticated}) => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://127.0.0.1:8000/auth", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            });
            if (response.ok) {
                setIsAuthenticated(true);
            } else {
                setIsAuthenticated(false);
            }
            const data = await response.json();
            localStorage.setItem("token", data.token);
            localStorage.setItem("isAuthenticated", true)
            navigate("/");
        } catch (error) {
            console.error("Login error:", error);
        }
    };



    return (
        <div className="col-md-6 col-lg-5 order-lg-1 container justify-content-center align-items-center vh-100">
            <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Se connecter</p>
            <form onSubmit={handleSubmit}>
                <div className="form-outline mb-4">
                    <input
                        type="email"
                        id="form2Example1"
                        className="form-control"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                    />
                    <label className="form-label" htmlFor="form2Example1">Email</label>
                </div>
                <div className="form-outline mb-4">
                    <input
                        type="password"
                        id="form2Example2"
                        className="form-control"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        required
                    />
                    <label className="form-label" htmlFor="form2Example2">Mot de passe</label>
                </div>
                <button type="submit" className="btn btn-primary btn-block mb-4">Se connecter</button>
                <div className="text-center">
                    <p>Vous n'avez pas de compte? <a href="/sign_up">S'inscrire</a></p>
                </div>
            </form>
        </div>
    );
};

export default LogIn;
