import React, {useEffect, useState} from "react";
import "./SignUp.css";

const SignUp = () => {
    const [formDataToSend, setFormDataToSend] = useState({
        email: "",
        plainPassword: "",
        name: "",
        last_name: "",
        phoneNumber: 0,
        birthday: "",
        confirmPassword: "",
        agreeToTerms: false
    });

    const handleInputChangeToSend = (e) => {
        const { name, value } = e.target;
        setFormDataToSend({ ...formDataToSend, [name]: value });
        const parsedValue = name === 'phoneNumber' ? parseInt(value) : value;
        setFormDataToSend({ ...formDataToSend, [name]: parsedValue });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formDataToSend.plainPassword !== formDataToSend.confirmPassword) {
            alert("Passwords do not match");
        }
    };
    useEffect(() => {
        if (formDataToSend.agreeToTerms) {
            console.log(JSON.stringify(formDataToSend));

            fetch("http://127.0.0.1:8000/api/users", {
                method: "POST",
                headers: {
                    "Content-Type": "application/ld+json"
                },
                body: JSON.stringify(
                    {
                        email: formDataToSend.email,
                        plainPassword: formDataToSend.plainPassword,
                        name: formDataToSend.name,
                        last_name: formDataToSend.last_name,
                        phoneNumber: formDataToSend.phoneNumber,
                        birthday: formDataToSend.birthday,
                    }
                )
            })
                .then((response) => {
                    if (!response.ok) {
                        throw new Error("Failed to register user");
                    }
                    alert("User registered successfully");
                })
                .catch((error) => {
                    console.error("Error registering user:", error.message);
                    alert("An error occurred while registering user");
                });
        }
    }, [formDataToSend]);
    return (
        <section>
            <div className="card-body p-md-5">
                <div className="row justify-content-center">
                    <div className="col-md-6 col-lg-5 order-lg-1">
                        <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">S'inscrire</p>

                        <form className="mx-1 mx-md-4" onSubmit={handleSubmit}>
                            <div className="row">
                                {/* Left Side */}
                                <div className="col">
                                    {/* Name Input */}
                                    <div className="mb-4">
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            className="form-control"
                                            value={formDataToSend.name}
                                            onChange={handleInputChangeToSend}
                                            required
                                        />
                                        <label className="form-label" htmlFor="name">Rrénom</label>
                                    </div>

                                    {/* Last name Input */}
                                    <div className="mb-4">
                                        <input
                                            type="text"
                                            id="last_name"
                                            name="last_name"
                                            className="form-control"
                                            value={formDataToSend.last_name}
                                            onChange={handleInputChangeToSend}
                                            required
                                        />
                                        <label className="form-label" htmlFor="last_name">Nom</label>
                                    </div>

                                    {/* Email Input */}
                                    <div className="mb-4">
                                        <input
                                            type="text"
                                            id="email"
                                            name="email"
                                            className="form-control"
                                            value={formDataToSend.email}
                                            onChange={handleInputChangeToSend}
                                            required
                                        />
                                        <label className="form-label" htmlFor="email">Email</label>
                                    </div>

                                    {/* Phone Number Input */}
                                    <div className="mb-4">
                                        <input
                                            type="number"
                                            id="phoneNumber"
                                            name="phoneNumber"
                                            className="form-control"
                                            value={formDataToSend.phoneNumber}
                                            onChange={handleInputChangeToSend}
                                            required
                                        />
                                        <label className="form-label" htmlFor="phoneNumber">Numéro de téléphone</label>
                                    </div>
                                </div>

                                {/* Right Side */}
                                <div className="col">

                                    {/* Birthday Input */}
                                    <div className="mb-4">
                                        <input
                                            type="date"
                                            id="birthday"
                                            name="birthday"
                                            className="form-control"
                                            value={formDataToSend.birthday}
                                            onChange={handleInputChangeToSend}
                                            required
                                        />
                                        <label className="form-label" htmlFor="birthday">Date de naissence</label>
                                    </div>

                                    {/* Password Input */}
                                    <div className="mb-4">
                                        <input
                                            type="password"
                                            id="plainPassword"
                                            name="plainPassword"
                                            className="form-control"
                                            value={formDataToSend.plainPassword}
                                            onChange={handleInputChangeToSend}
                                            required
                                        />
                                        <label className="form-label" htmlFor="plainPassword">Mot de passe</label>
                                    </div>

                                    {/* Confirm Password Input */}
                                    <div className="mb-4">
                                        <input
                                            type="password"
                                            id="confirmPassword"
                                            name="confirmPassword"
                                            className="form-control"
                                            value={formDataToSend.confirmPassword}
                                            onChange={handleInputChangeToSend}
                                            required
                                        />
                                        <label className="form-label" htmlFor="confirmPassword">Répétez votre mot de passe</label>
                                    </div>

                                </div>
                                {/* Terms of Service Agreement */}
                                <div className="form-check d-flex justify-content-center mb-5">
                                    <input
                                        className="form-check-input me-2"
                                        type="checkbox"
                                        id="agreeToTerms"
                                        name="agreeToTerms"
                                        checked={formDataToSend.agreeToTerms}
                                        onChange={(e) => setFormDataToSend({ ...formDataToSend, agreeToTerms: e.target.checked })}
                                    />
                                    <label className="form-check-label" htmlFor="agreeToTerms">
                                        Je suis d'accord avec toutes les déclarations dans les <a href="/CGU">Conditions Générales d'Utilisation</a>
                                    </label>
                                </div>
                                {/* Submit Button */}
                                <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                                    <button type="submit" className="btn btn-primary btn-lg">S'inscrire</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SignUp;
