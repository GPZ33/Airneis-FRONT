import React, {useState} from "react";
import logo from "../../Components/Assets/logo.png";
import "./SignUp.css";

const SignUp = () => {
    const [formData, setFormData] = useState({
        name: "",
        last_name: "",
        email: "",
        plainPassword: "",
        confirmPassword: "",
        phoneNumber: "",
        birthday: "",
        agreeToTerms: false,
      });

    const [error, setError] = useState(null);

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
          ...formData,
          [name]: type === "checkbox" ? checked : value,
        });
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.plainPassword !== formData.confirmPassword) {
          setError("Passwords do not match");
          return;
        }

        try {
            const response = await fetch("http://127.0.0.1:8000/api/users", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                email: formData.email,
                plainPassword: formData.plainPassword,
                name: formData.name,
                last_name: formData.last_name,
                phoneNumber: formData.phoneNumber, 
                birthday: new Date(formData.birthday).toISOString(), // Convert to ISO 8601
              }),
            });
      
            if (!response.ok) {
              throw new Error("Failed to submit the form");
            }
      
            const result = await response.json();
            // TODO: Handle success, maybe redirect or show a success message
            console.log("User registered:", result);
          } catch (err) {
            setError("Error occurred during sign-up. Please try again.");
            console.error("Sign-up error:", err);
          }
        };


        return (
            <section style={{ backgroundColor: "#eee" }}>
              <div className="card-body p-md-5">
                <div className="row justify-content-center">
                  <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                    <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign up</p>
        
                    <form className="mx-1 mx-md-4" onSubmit={handleSubmit}>
                      {/* Name Input */}
                      <div className="d-flex flex-row align-items-center mb-4">
                        <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                        <div className="form-outline flex-fill mb-0">
                          <input
                            type="text"
                            id="name"
                            name="name"
                            className="form-control"
                            value={formData.name}
                            onChange={handleInputChange}
                            required
                          />
                          <label className="form-label" htmlFor="name">Your Name</label>
                        </div>
                      </div>

                    {/* Last name Input */}
                      <div className="d-flex flex-row align-items-center mb-4">
                        <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                        <div className="form-outline flex-fill mb-0">
                          <input
                            type="text"
                            id="last_name"
                            name="last_name"
                            className="form-control"
                            value={formData.last_name}
                            onChange={handleInputChange}
                            required
                          />
                          <label className="form-label" htmlFor="last_name">Your Last Name</label>
                        </div>
                      </div>
        
                      {/* Email Input */}
                      <div className="d-flex flex-row align-items-center mb-4">
                        <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                        <div className="form-outline flex-fill mb-0">
                          <input
                            type="email"
                            id="email"
                            name="email"
                            className="form-control"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                          />
                          <label className="form-label" htmlFor="email">Your Email</label>
                        </div>
                      </div>
        
                      {/* Phone Number Input */}
              <div className="d-flex flex-row align-items-center mb-4">
                <i className="fas fa-phone fa-lg me-3 fa-fw"></i>
                <div className="form-outline flex-fill mb-0">
                  <input
                    type="text"
                    id="phoneNumber"
                    name="phoneNumber"
                    className="form-control"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    required
                  />
                  <label className="form-label" htmlFor="phoneNumber">Your Phone Number</label>
                </div>
              </div>

              {/* Birthday Input */}
              <div className="d-flex flex-row align-items-center mb-4">
                <i className="fas fa-birthday-cake fa-lg me-3 fa-fw"></i>
                <div className="form-outline flex-fill mb-0">
                  <input
                    type="date"
                    id="birthday"
                    name="birthday"
                    className="form-control"
                    value={formData.birthday}
                    onChange={handleInputChange}
                    required
                  />
                  <label className="form-label" htmlFor="birthday">Your Birthday</label>
                </div>
              </div>

              {/* Password Input */}
              <div className="d-flex flex-row align-items-center mb-4">
                <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                <div className="form-outline flex-fill mb-0">
                  <input
                    type="password"
                    id="plainPassword"
                    name="plainPassword"
                    className="form-control"
                    value={formData.plainPassword}
                    onChange={handleInputChange}
                    required
                  />
                  <label className="form-label" htmlFor="plainPassword">Password</label>
                </div>
              </div>

              {/* Confirm Password Input */}
              <div className="d-flex flex-row align-items-center mb-4">
                <i className="fas fa-key fa-lg me-3 fa-fw"></i>
                <div className="form-outline flex-fill mb-0">
                  <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    className="form-control"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    required
                  />
                  <label className="form-label" htmlFor="confirmPassword">Repeat Your Password</label>
                </div>
              </div>

              {/* Terms of Service Agreement */}
              <div className="form-check d-flex justify-content-center mb-5">
                <input
                  className="form-check-input me-2"
                  type="checkbox"
                  id="agreeToTerms"
                  name="agreeToTerms"
                  checked={formData.agreeToTerms}
                  onChange={handleInputChange}
                  required
                />
                <label className="form-check-label" htmlFor="agreeToTerms">
                  I agree with all statements in <a href="/CGU">Terms of service</a>
                </label>
              </div>

              {/* Error Message */}
              {error && <div className="text-danger">{error}</div>}

              {/* Submit Button */}
              <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                <button type="submit" className="btn btn-primary btn-lg">Register</button>
              </div>
            </form>
          </div>
        
                  <div className="col-md-10 col-lg-6 col-xl-5 order-1 order-lg-2 text-center">
                    <img src={logo} className="img-fluid" alt="logo" />
                    <h1>AIRNEIS</h1>
                  </div>
                </div>
              </div>
            </section>
          );
        };
        

export default SignUp;